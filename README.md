# MachineMatch

MachineMatch ist eine öffentlich erreichbare Webanwendung zum Suchen, Bewerten und Vergleichen gebrauchter Industriemaschinen. Nutzer können Suchbegriffe und Anforderungen eingeben, Angebote ansehen, bis zu drei Maschinen vergleichen und eine Anfrage zu einer ausgewählten Maschine in der Datenbank speichern.

Die Live-Demo ist unter [https://machinematch.freedev.app](https://machinematch.freedev.app) erreichbar. MachineMatch ist ein Portfolio-Projekt mit synthetischen Demo-Daten, kein echter Maschinenmarktplatz.

## Funktionen

- Suche nach Maschinen anhand eines Suchbegriffs
- Filter für Kategorie, Standort, Preis, Hersteller, Arbeitsstunden und Baujahr
- Sortierung der Suchergebnisse
- Match-Score auf Basis ausgewählter Anforderungen
- Detailansicht mit technischen Daten und zugehörigem Verkäufer
- Vergleich von bis zu drei Maschinen; Vergleichsdaten bleiben während der Sitzung im Browser
- Anfrageformular, das Anfragen mit Maschinenbezug in der Live-MySQL-Datenbank speichert
- About- und Inquiry-Modals

## Technologie und Bereitstellung

- Frontend: HTML, CSS und JavaScript-Module ohne Build-Schritt
- PHP-Backend mit PDO und MySQL beim Hosting-Anbieter
- Die Website-Dateien liegen im Webroot `htdocs` (unter anderem `index.html`, `css/`, `js/` und `backend/`).
- Die JavaScript-API-Aufrufe verwenden `https://machinematch.freedev.app/backend/api/...`.
- Die Datenbank ist nicht direkt öffentlich; der Server greift über das PHP-Backend darauf zu.
- Das Inquiry-Formular wurde erfolgreich mit der Live-Datenbank getestet. Es wird keine E-Mail an Verkäufer versendet.

## Live-Demo verwenden

Öffne [https://machinematch.freedev.app](https://machinematch.freedev.app) in einem Browser. Die Anwendung lädt Maschinen- und Verkäuferdaten über die öffentliche PHP-API. Eine Anfrage kann über das Inquiry-Formular übermittelt und in der Datenbank gespeichert werden.

## Lokal entwickeln

Eine lokale Umgebung wie XAMPP ist weiterhin als Entwicklungsumgebung möglich. Die Live-Bereitstellung ist jedoch der aktuelle Bereitstellungszustand.

1. Lege eine lokale Projektkopie im Webroot ab, zum Beispiel unter `C:\xampp\htdocs\MachineMatch`.
2. Starte Apache und MySQL im XAMPP Control Panel.
3. Importiere `database/schema.sql` in eine lokale MySQL-Instanz. Das Schema erstellt die Datenbank `machine_match` und die Tabellen `sellers`, `machines` und `inquiries`.
4. Konfiguriere `backend/config/database.php` mit den lokalen Zugangsdaten. Diese Datei ist nicht für Zugangsdaten im öffentlichen Repository gedacht.
5. Füge synthetische Verkäufer- und Maschinendaten in die lokale Datenbank ein. 
6. Öffne die lokale `index.html`-Adresse im Browser, zum Beispiel `http://localhost/MachineMatch/`.

Für lokale Entwicklung muss die API-Basis in `js/api.js` von der Live-Adresse auf den lokalen Pfad `http://localhost/MachineMatch/backend/api/` umgestellt werden. Die lokale Datenbank und das Live-System sind getrennte Umgebungen.

## API

Das Frontend kommuniziert über PHP-Endpunkte mit der Datenbank. Die Maschinen werden über `machines.php` geladen und können dabei nach Angaben wie Kategorie, Standort oder Preis gefiltert werden. `sellers.php` liefert die zugehörigen Verkäuferinformationen. Das Inquiry-Formular sendet Name, E-Mail-Adresse, Nachricht und Maschinen-ID an `inquiries.php`; die Anfrage wird dort in der Datenbank gespeichert.

## Projektdokumentation

- [Architektur](docs/architecture.md)
- [Produktplan und nächster Ausbaustand](docs/product-plan.md)

## Projektumfang

- Alle dargestellten Angebote und Verkäufer sind synthetische Demo-Daten.
- Der Match-Score ist eine einfache, erklärbare Heuristik und keine Empfehlung mit statistischer oder lernender Grundlage.
- Anfragen werden in der Datenbank gespeichert; das Projekt versendet keine E-Mail an Verkäufer.
- MachineMatch ist ein Portfolio-Projekt und zeigt einen beispielhaften Ablauf für die Suche und den Vergleich gebrauchter Maschinen.
