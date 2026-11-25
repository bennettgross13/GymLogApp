# 🏋️ GymLog

**Trainingsfortschritt pro Übung und Session tracken – direkt auf dem Handy, offline, ohne Konto.**

GymLog ist eine kleine Web-App (PWA), die man wie eine normale App auf den Startbildschirm legt. Alle Daten bleiben auf dem eigenen Gerät – kein Server, keine Anmeldung, keine Werbung.

👉 **App öffnen:** https://bennettgross13.github.io/gymlog/

<p>
  <img src="screenshots/training.png" width="250" alt="Training eintragen">
  <img src="screenshots/statistik.png" width="250" alt="Statistik mit Wochenziel und Kalender">
  <img src="screenshots/fortschritt.png" width="250" alt="Fortschritt pro Übung">
</p>

---

## Funktionen

### 🏋️ Training
- Training starten, Übungen hinzufügen, Sätze mit **Gewicht × Wiederholungen** (oder Sekunden bei Halteübungen) eintragen
- Zeigt bei jeder Übung, **was du letztes Mal gemacht hast** – die Felder sind schon vorausgefüllt, meist reicht ein Tipp auf „+ Satz“
- 🏆 **Rekord-Anzeige**, wenn du mehr schaffst als je zuvor
- Optionale Notiz pro Training

### 🔥 Statistik
- **Wochenziel** einstellbar (1–7× pro Woche) mit Fortschrittsbalken
- Ø Trainings pro Woche, **Wochen-Serie** und wie oft du dein Ziel erreicht hast
- Balkendiagramm der letzten 8 Wochen
- **Monatskalender** – Trainingstage grün, je mehr Sätze, desto heller
- **All-time-Übersicht**: ein Mini-Kalender pro Monat seit dem ersten Training
- Optionales **Körpergewicht-Tracking** mit Verlaufskurve

### 📈 Fortschritt
- Diagramm pro Übung mit verschiedenen Messgrößen:
  - Max. Gewicht · geschätztes 1RM · Volumen · beste Wiederholungen · Summe Wiederholungen
  - **Gesamtlast inkl. Körpergewicht** für Klimmzüge, Dips & Co.
- Körpergewichtskurve im selben Zeitraum direkt darunter

### 📅 Verlauf & ⚙️ Mehr
- Alle Trainings ansehen, bearbeiten oder löschen
- Übungen umbenennen, löschen, als Körpergewichtsübung markieren
- **Backup** als JSON exportieren/importieren, **CSV-Export** für Excel

---

## Installation aufs Handy

### Android (Chrome)
1. Den Link oben in **Chrome** öffnen
2. Menü **⋮** → **„App installieren“** bzw. **„Zum Startbildschirm hinzufügen“**
3. Fertig – GymLog startet jetzt wie eine normale App, auch ohne Internet

### iPhone (Safari)
1. Den Link in **Safari** öffnen
2. **Teilen-Symbol** → **„Zum Home-Bildschirm“**

---

## Deine Daten

- Alles wird **lokal im Browser** gespeichert (`localStorage`). Niemand sonst – auch nicht der Entwickler – sieht deine Trainings.
- Jede Person, die die App nutzt, hat ihre **eigenen, getrennten Daten**.
- ⚠️ Wenn du die Browserdaten löschst oder das Handy wechselst, sind die Daten weg. Deshalb: **Unter „Mehr“ regelmäßig ein Backup exportieren** (z. B. in Google Drive speichern). Auf einem neuen Gerät kannst du es wieder importieren.
- Die Daten gehören zur jeweiligen Web-Adresse. Wechselt die Adresse (z. B. eigene Domain), vorher Backup machen und danach importieren.

---

## Selbst hosten / eigene Kopie

Du willst eine eigene Version, die du selbst anpassen kannst?

1. Dieses Repository **forken** (oben rechts auf GitHub)
2. In deinem Fork: **Settings → Pages → Branch `main` / `(root)` → Save**
3. Nach ca. 1 Minute läuft deine Kopie unter `https://<dein-name>.github.io/gymlog/`

Es gibt keinen Build-Schritt und keine Abhängigkeiten – die Dateien werden direkt ausgeliefert.

Lokal testen:
```bash
python3 -m http.server 8000
# dann http://localhost:8000 im Browser öffnen
```

---

## Technik

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette App: HTML, CSS und JavaScript in einer Datei |
| `sw.js` | Service Worker – speichert die App im Cache, damit sie offline läuft |
| `manifest.webmanifest` | Name, Farben und Icons für die Installation als App |
| `icon-192.png`, `icon-512.png` | App-Icons |
| `screenshots/` | Bilder für diese README |

- **Reines JavaScript**, kein Framework, keine Bibliotheken
- Diagramme werden als **SVG** selbst gezeichnet
- Offline-Strategie: *stale-while-revalidate* – die App lädt sofort aus dem Cache und holt im Hintergrund die neueste Version

### Datenmodell (vereinfacht)
```js
{
  exercises:  [{ id, name, unit: 'reps' | 'sec', bw: true/false }],
  sessions:   [{ id, date: 'YYYY-MM-DD', start, note,
                 entries: [{ exId, sets: [{ w: kg, r: wdh_oder_sek }] }] }],
  active:     null,                 // laufendes Training
  bodyweight: [{ id, date, kg }],
  settings:   { weekGoal: 3 }
}
```

### Updates veröffentlichen
1. Geänderte Dateien ins Repo hochladen
2. Bei größeren Änderungen in `sw.js` die Cache-Version erhöhen (`gymlog-v2` → `gymlog-v3`)
3. Auf dem Handy die App **zweimal öffnen** – beim ersten Mal lädt das Update im Hintergrund, beim zweiten Mal ist es aktiv

---

## Ideen für später

- [ ] Pausentimer zwischen den Sätzen
- [ ] Trainingsvorlagen (z. B. Push / Pull / Beine)
- [ ] Aufwärmsätze markieren
- [ ] RPE („Wie schwer war's?“) pro Satz
- [ ] Übungs-Progressionen (z. B. Richtung Muscle-up)
- [ ] Laufen / Cardio mit Distanz und Pace

---

Gebaut von [@bennettgross13](https://github.com/bennettgross13) 💪
