MEIN ERNÄHRUNGSTRACKER V4

Neu in V4:
- Fotoaufnahme / Bildauswahl im Ernährungstracker
- Lokale Lebensmittel-KI im Browser mit Transformers.js
- Food-101-Klassifikation mit bis zu 5 Vorschlägen
- Foto bleibt lokal auf dem Gerät; für die Analyse werden Modell-Dateien vom Hugging Face Hub geladen
- Ein KI-Vorschlag kann direkt an die Produktsuche übergeben werden
- Bestehende V1/V2/V3-Daten werden weiterverwendet

WICHTIG:
1. Die Foto-KI erkennt den allgemeinen Gerichtstyp, nicht zuverlässig einzelne Zutaten oder Portionsgrößen.
2. Beim ersten Einsatz wird ein quantisiertes Modell von ca. 60 MB geladen. Spätere Analysen können den Browser-Cache verwenden.
3. Nährwerte werden weiterhin über Open Food Facts bzw. manuelle Eingabe bestimmt.
4. Tagebuch, Gewicht, Favoriten und Rezepte werden lokal im Browser gespeichert.
5. Packungsangaben und selbst gewogene Mengen haben Vorrang vor Schätzungen.

Drittanbieter:
- Open Food Facts
- html5-qrcode 2.3.8 (Apache-2.0)
- Transformers.js 3.8.1
- onnx-community/swin-finetuned-food101-ONNX (Apache-2.0)
