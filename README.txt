MEIN ERNÄHRUNGSTRACKER V4.1

Neu in V4.1:
- Food-101-Klassifikation durch SmolVLM-256M-Instruct ersetzt
- erkennt mehrere sichtbare Lebensmittel in einem Foto
- schätzt die Menge jedes Bestandteils in Gramm
- Name und Grammzahl vor dem Eintragen korrigierbar
- Nährwerte werden je erkanntem Bestandteil über die bestehende Suche ausgewählt
- nach dem Eintragen springt die App zurück zur Foto-Liste, damit der nächste Bestandteil verarbeitet werden kann
- Bild wird vor der Analyse lokal verkleinert und bleibt auf dem Gerät
- Vision-Modell läuft lokal über WebGPU

WICHTIG:
1. Die Foto-KI benötigt WebGPU.
2. Beim ersten Einsatz werden je nach GPU-Datentyp ungefähr 190–270 MB Modell-Dateien geladen.
3. Grammangaben aus einem einzelnen Foto sind Schätzwerte und müssen kontrolliert werden.
4. Modell-Dateien kommen von Hugging Face; Transformers.js wird von jsDelivr geladen. Das Foto wird nicht an einen KI-Inferenzdienst gesendet.
5. Tagebuch, Gewicht, Favoriten, Rezepte und eigene Lebensmittel bleiben im localStorage unter dem bestehenden Schlüssel erhalten.
6. Nährwerte aus Open Food Facts können fehlerhaft sein; Packungsangaben haben Vorrang.

Drittanbieter:
- Open Food Facts
- html5-qrcode 2.3.8
- Hugging Face Transformers.js 3.8.1
- HuggingFaceTB/SmolVLM-256M-Instruct (Apache-2.0)
