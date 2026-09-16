# WoW Forever – Talentrechner

Ein einbettbarer, statischer Talentrechner für alle 9 WoW-Klassen (51 Punkte, 3 Bäume je Klasse).
Reines HTML/CSS/JS – keine Build-Schritte, kein Framework, kein Server nötig.

## Dateien

```
index.html   Seitenstruktur
style.css    Farben/Layout (dunkles Bronze-/Gold-Theme)
data.js      Talentdaten aller Klassen (Classic-Basis, Annäherung)
script.js    Rechner-Logik (Punktevergabe, Freischaltung, Build-Link, LocalStorage)
```

## Sofort auf GitHub Pages nutzen

1. Repo erstellen und diese Dateien in den Root (oder z. B. `/talents`) pushen.
2. In den Repo-Einstellungen unter **Pages** die Quelle auf den Branch/Ordner stellen.
3. Fertig – die Seite ist unter `https://<user>.github.io/<repo>/` erreichbar.

## Auf einer bestehenden Website einbetten

Per iframe:

```html
<iframe src="/pfad/zum/talentrechner/index.html"
        style="width:100%; min-height:900px; border:0;"
        loading="lazy"></iframe>
```

Oder die drei Dateien direkt in eine bestehende Seite integrieren (CSS/JS-Pfade anpassen).

## Datenbasis & Genauigkeit

Die Talente sind eine **Classic-Era-Annäherung**, keine bestätigten WoW-Forever-Daten – Blizzard hat
die finalen Forever-Bäume noch nicht veröffentlicht. Struktur (51 Punkte, 5 Punkte pro Reihe, 3 Bäume)
entspricht dem Classic-Vorbild; einzelne Talentnamen/-werte sind vereinfacht und sollten ersetzt werden,
sobald belastbare Daten vorliegen.

## Icons

Die **Klassen-Icons** (Kriegerkopf, Magierhut usw.) sind echte, offizielle Blizzard-Icons und werden
live von `wow.zamimg.com` (Wowhead-CDN) geladen – dafür ist beim Einbetten eine Internetverbindung
nötig, es liegen keine Bilddateien im Repo.

Für **einzelne Talente** ist bewusst nur eine Handvoll (die auffälligsten Fähigkeiten wie *Bluthunger*,
*Schattenform*, *Seelenruhe* …) mit einem echten Icon-Slug hinterlegt – für den Rest hätte ich ohne
Beleg pro Talent geraten und riskiert, falsche oder kaputte Bilder einzubauen. Jedes Talent in `data.js`
hat dafür schon ein optionales `icon`-Feld vorbereitet:

```js
T(6,0,1,"Vernichtender Schlag","...", "ability_warrior_savageblow")
```

Den passenden Slug findest du auf der jeweiligen Wowhead-Classic-Seite des Talents (Rechtsklick auf das
Icon → Bildadresse kopieren, den Dateinamen ohne `.jpg` übernehmen). Ohne gesetztes Icon zeigt die
Kachel einfach nur Name/Rang – nie ein kaputtes Bild.

## Eigene Farben anpassen

Alle Farben stehen als CSS-Variablen ganz oben in `style.css` (`:root { ... }`), inklusive der
Klassenfarben in `data.js` (`color` je Klasse) für die farbigen Rahmen/Akzente.

---
Inoffizielles Fan-Projekt, nicht mit Blizzard Entertainment verbunden. World of Warcraft und Blizzard
Entertainment sind Marken von Blizzard Entertainment, Inc.
