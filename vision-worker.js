import {
  AutoProcessor,
  AutoModelForVision2Seq,
  TextStreamer,
  load_image,
} from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/+esm";

const MODEL_ID = "HuggingFaceTB/SmolVLM-256M-Instruct";
const MAX_NEW_TOKENS = 260;
const PROMPT = `Analyze only the visible food and drinks in this image. Separate distinct foods on the plate instead of naming only the whole dish. Estimate the edible amount of each visible item in grams. Include visible sauces, dressings and oils when they are clearly present, but do not invent hidden ingredients. Use simple German food names when possible. Return ONLY a valid JSON array and no markdown, no explanation. Format exactly like: [{"name":"Hähnchenbrust","grams":180,"confidence":"high"},{"name":"Reis","grams":220,"confidence":"medium"}]. confidence must be high, medium, or low. If no food is visible, return [].`;

let processor = null;
let model = null;
let loadPromise = null;
let dtypeUsed = null;

function progress(p) {
  self.postMessage({
    type: "progress",
    progress: typeof p?.progress === "number" ? p.progress : null,
    file: p?.file || p?.name || "",
    status: p?.status || "",
  });
}

async function ensureModel() {
  if (processor && model) return [processor, model];
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    if (!self.navigator?.gpu) throw new Error("WebGPU is not available in this browser");
    const adapter = await self.navigator.gpu.requestAdapter();
    if (!adapter) throw new Error("No WebGPU adapter found");
    const fp16 = adapter.features?.has("shader-f16");
    dtypeUsed = fp16 ? "q4f16" : "q4";
    processor = await AutoProcessor.from_pretrained(MODEL_ID, { progress_callback: progress });
    model = await AutoModelForVision2Seq.from_pretrained(MODEL_ID, {
      device: "webgpu",
      dtype: dtypeUsed,
      progress_callback: progress,
    });
    self.postMessage({ type: "model", dtype: dtypeUsed });
    return [processor, model];
  })();
  try { return await loadPromise; }
  catch (e) { processor = null; model = null; loadPromise = null; throw e; }
}

async function analyze(imageUrl) {
  const [proc, mdl] = await ensureModel();
  const image = await load_image(imageUrl);
  const messages = [{
    role: "user",
    content: [
      { type: "image", image: imageUrl },
      { type: "text", text: PROMPT },
    ],
  }];
  const text = proc.apply_chat_template(messages, { add_generation_prompt: true });
  const inputs = await proc(text, [image], { do_image_splitting: false });
  let generated = "";
  const streamer = new TextStreamer(proc.tokenizer, {
    skip_prompt: true,
    skip_special_tokens: true,
    callback_function: (chunk) => {
      generated += chunk;
      self.postMessage({ type: "token" });
    },
  });
  await mdl.generate({
    ...inputs,
    do_sample: false,
    repetition_penalty: 1.05,
    max_new_tokens: MAX_NEW_TOKENS,
    streamer,
  });
  return generated.trim();
}

self.addEventListener("message", async (e) => {
  if (e.data?.type !== "analyze") return;
  try {
    const text = await analyze(e.data.image);
    self.postMessage({ type: "result", text, dtype: dtypeUsed });
  } catch (err) {
    self.postMessage({ type: "error", error: err?.message || String(err) });
  }
});
