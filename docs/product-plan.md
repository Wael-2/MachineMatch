# Produktplan: MachineMatch

## Produktidee

MachineMatch hilft Unternehmen und Fachleuten, gebrauchte Industriemaschinen anhand ihrer Anforderungen zu finden, technische Daten zu prüfen und geeignete Angebote direkt zu vergleichen.

## Zielgruppe und Problem

Die Zielgruppe sind gewerbliche Käufer und Fachleute, für die Maschinenangebote viele technische Merkmale enthalten. Der Vergleich dieser Angebote kostet Zeit. MachineMatch bündelt Suche, Anforderungen, Match-Erklärung, Detaildaten und Verkäuferkontakt in einem kompakten Ablauf.

## Gelieferter Projektumfang

Der aktuelle Stand ist ein lokaler Portfolio-Prototyp mit synthetischen Angebots- und Verkäuferdaten.

- **Suche:** Suchbegriff und Filter für Kategorie, Standort, Preis, Hersteller, Arbeitsstunden und Mindestbaujahr.
- **Sortierung:** unter anderem nach Match-Score, Preis, Baujahr und Arbeitsstunden.
- **Matching:** gewichtete Heuristik für Preis, Baujahr, Arbeitsstunden, Hersteller und Standort; der Score wird auf die aktiven Kriterien normiert.
- **Details:** Maschinenbild, Preis, Standort, Beschreibung, technische Spezifikationen und zugehöriger Verkäufer.
- **Vergleich:** bis zu drei Maschinen nebeneinander, inklusive Bild, Kerndaten und Match-Score; Maschinen können aus der Liste entfernt werden, indem der Vergleich geleert wird.
- **Anfrage:** Formular mit Maschinenbezug; das Backend validiert und speichert die Anfrage in MySQL.
- **Navigation und Information:** getrennte Views, About-Modal und Inquiry-Modal.


## Produktentscheidungen

- Der Detail-View wird gezielt über „View Details“ geöffnet, damit die Karten in den Suchergebnissen nicht versehentlich navigieren.
- Der Vergleich ist auf drei Maschinen begrenzt, damit die Tabelle auf üblichen Desktop-Bildschirmen lesbar bleibt.
- Die Demo verwendet synthetische Daten; sie stellt keinen echten Maschinenmarktplatz dar.
- Der Match-Score ist eine transparente Regelberechnung. Er dient als Orientierung, nicht als Garantie für Eignung.


## Abschlusskriterien für den aktuellen Prototyp

- Maschinen können gesucht, gefiltert, sortiert und in der Detailansicht geöffnet werden.
- Verkäuferinformationen werden über die Maschinen-Seller-Verknüpfung geladen.
- Bis zu drei unterschiedliche Maschinen lassen sich vergleichen und die Tabelle kann geleert werden.
- Eine gültige Anfrage wird mit der ausgewählten Maschinen-ID in MySQL gespeichert.
- Projektaufbau, lokale Einrichtung, Architektur und bekannte Grenzen sind dokumentiert.