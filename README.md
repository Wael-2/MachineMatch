# MachineMatch

MachineMatch ist eine lokale Webanwendung zum Suchen, Bewerten und Vergleichen gebrauchter Industriemaschinen. Nutzer können Suchbegriffe und Anforderungen eingeben, Angebote ansehen, bis zu drei Maschinen vergleichen und eine Anfrage zu einer ausgewählten Maschine in der Datenbank speichern.

Das Projekt ist ein Portfolio-Projekt mit synthetischen Demo-Daten. Es ist für den lokalen Betrieb mit XAMPP gedacht.

## Funktionen

- Suche nach Maschinen anhand eines Suchbegriffs
- Filter für Kategorie, Standort, Preis, Hersteller, Arbeitsstunden und Baujahr
- Sortierung der Suchergebnisse
- Match-Score auf Basis ausgewählter Anforderungen
- Detailansicht mit technischen Daten und zugehörigem Verkäufer
- Vergleich von bis zu drei Maschinen; Vergleichsdaten bleiben während der Sitzung im Browser
- Anfrageformular, das Anfragen mit Maschinenbezug in MySQL speichert
- About- und Inquiry-Modals

## Technologie

- Frontend: HTML, CSS und JavaScript-Module ohne Build-Schritt
- Backend: PHP mit PDO
- Datenbank: MySQL
- Lokale Entwicklungsumgebung: XAMPP

## Lokal starten

1. Lege den Projektordner unter `C:\xampp\htdocs\MachineMatch` ab.
2. Starte Apache und MySQL im XAMPP Control Panel.
3. Importiere `database/schema.sql` über phpMyAdmin oder die MySQL-Konsole. Das Schema erstellt die Datenbank `machine_match` und die Tabellen `sellers`, `machines` und `inquiries`.
4. Trage die lokalen Zugangsdaten in `Backend/config/database.php` ein. Diese Datei ist in `.gitignore` ausgeschlossen und muss lokal vorhanden sein.
5. Füge Verkäufer- und Maschinendaten in die Datenbank ein. 
6. Öffne `http://localhost/MachineMatch/frontend/` im Browser.

Die API verwendet lokale URLs unter `http://localhost/MachineMatch/Backend/api/`. Wenn du den Projektordner oder den Hostnamen änderst, müssen diese URLs in `frontend/js/api.js` angepasst werden.

## API-Überblick

| Methode | Endpunkt | Zweck |

| GET | `/Backend/api/machines.php` | Maschinen abrufen; unterstützt unter anderem Filterparameter und `id` |
| GET | `/Backend/api/sellers.php` | Verkäufer abrufen; unterstützt `id`, `company_name` und `city` |
| POST | `/Backend/api/inquiries.php` | Anfrage als JSON mit `machine_id`, `name`, `email` und `message` speichern |

## Projektdokumentation

- [Architektur](docs/architecture.md)
- [Produktplan](docs/product-plan.md)

## Umfang und bekannte Grenzen

- Alle dargestellten Angebote und Verkäufer sind Demo-Daten.
- Der Match-Score ist eine einfache, erklärbare Heuristik und keine Empfehlung mit statistischer oder lernender Grundlage.
- Vergleichsauswahl und sonstiger Frontend-State werden nicht dauerhaft gespeichert.
- Anfragen werden in der Datenbank gespeichert; das Projekt versendet keine E-Mail an Verkäufer.
- Die Datenbank wird nicht automatisch mit Beispieldaten befüllt.
- Die Anwendung ist für lokale Entwicklung ausgelegt und nicht als produktionsbereiter Marktplatz konfiguriert.