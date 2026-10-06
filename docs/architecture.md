# Architektur

## Überblick

MachineMatch ist eine öffentlich erreichbare, clientseitig gerenderte Webanwendung mit einem PHP/MySQL-Backend. Das Frontend wird ohne Bundler als HTML, CSS und JavaScript-Module ausgeliefert. JavaScript ruft die PHP-Endpunkte mit `fetch()` auf; PHP kommuniziert über PDO mit MySQL.

Im Live-Betrieb liegen die Website-Dateien im Hosting-Webroot `htdocs`. Die JavaScript-API-Basis ist `https://machinematch.freedev.app/backend/api/`.

```text
Browser
└── https://machinematch.freedev.app/
    ├── index.html              Struktur der Views und Modals
    ├── css/                    Layout und Darstellung
    ├── js/
    │   ├── main.js             Initialisierung, State-Flows und Events
    │   ├── api.js              fetch()-Funktionen für das Backend
    │   ├── state.js            gemeinsamer In-Memory-Frontend-State
    │   ├── search.js            Suchfilter und Sortierung
    │   ├── matching.js          Berechnung des Match-Scores
    │   └── render.js             Darstellung der Suchkarten
    └── backend/api/
        ├── machines.php         Maschinen lesen und filtern
        ├── sellers.php          Verkäufer lesen
        └── inquiries.php        Anfragen validieren und speichern
                 │ PDO
                 ▼
              MySQL beim Hosting
```

Die Datenbank wird nicht direkt vom Browser angesprochen. Die Anfragen an das PHP-Backend erfolgen über HTTPS. Der Inquiry-Endpunkt speichert erfolgreich in der Live-Datenbank; ein E-Mail-Versand ist nicht implementiert.

## Frontend-Verantwortlichkeiten

- `index.html` enthält Home-, Search-, Detail- und Compare-View sowie About- und Inquiry-Modals.
- `main.js` lädt beim Start Maschinen, hält die Navigation zusammen und verbindet UI-Ereignisse mit Suche, Detailansicht, Vergleich und Inquiry-Formular.
- `state.js` hält Maschinen, Filter, Suchbegriff, Sortierung, ausgewählte Maschine, Match-Ergebnisse, Verkäufer und die Vergleichsliste im Speicher des geöffneten Tabs.
- `search.js` filtert und sortiert die bereits geladenen Maschinen im Browser.
- `matching.js` berechnet einen normalisierten Prozentwert aus den aktiven Preis-, Baujahr-, Arbeitsstunden-, Hersteller- und Standortanforderungen. Ohne aktive bewertete Kriterien wird `0` zurückgegeben.
- `render.js` erzeugt die Suchkarten. Detail- und Vergleichsansichten werden in `main.js` anhand der jeweiligen DOM-Elemente befüllt.

## Typische Datenflüsse

### Suche und Match

1. `main.js` lädt die Maschinen über `api.js` und legt sie in `state.machines` ab.
2. Bei einer Suche oder Filteränderung liest `updateResults()` die Formwerte.
3. `search.js` filtert die Maschinen; `matching.js` ergänzt pro Treffer den Score.
4. `search.js` sortiert die Treffer und `render.js` aktualisiert die Karten.

### Detailansicht und Verkäufer

1. Der „View Details“-Button trägt die Maschinen-ID in `data-machine-id`.
2. `main.js` lädt den Datensatz über `machines.php` und übernimmt den Match-Score aus den berechneten Treffern.
3. `seller_id` der Maschine wird als `id` an `sellers.php` übergeben.
4. `main.js` rendert Maschine und Verkäufer und aktiviert den Detail-View.

### Maschinenvergleich

1. „Add to comparison“ fügt `state.selectedMachine` der Liste `state.comparedMachines` hinzu.
2. Doppelte Einträge werden verhindert; die Liste ist auf drei Maschinen begrenzt.
3. `renderComparison()` schreibt die Maschinenwerte in die drei vorbereiteten Tabellenspalten.
4. Die Auswahl und das Leeren des Vergleichs ändern nur den In-Memory-State; nach einem Neuladen ist die Liste leer.

### Verkäuferanfrage

1. Das Inquiry-Modal zeigt den Titel der aktuell ausgewählten Maschine.
2. Das Formular sendet `machine_id`, `name`, `email` und `message` als JSON-POST an `https://machinematch.freedev.app/backend/api/inquiries.php`.
3. PHP prüft Pflichtfelder, E-Mail-Format und Maschinen-ID und schreibt die Anfrage in `inquiries`.
4. Das Backend antwortet mit HTTP 201 bei Erfolg oder einem Fehlerstatus und JSON-Fehlerobjekt.
5. Es wird keine E-Mail an den Verkäufer gesendet.

## Datenmodell

- `sellers` enthält Verkäuferinformationen.
- `machines.seller_id` verweist auf `sellers.id` (ein Verkäufer kann mehrere Maschinen anbieten).
- `inquiries.machine_id` verweist auf `machines.id` (eine Maschine kann mehrere Anfragen erhalten).

Die Fremdschlüssel sind in `database/schema.sql` definiert. Die Lese-Endpunkte geben Ergebnisse mit `fetchAll(PDO::FETCH_ASSOC)` als JSON-Arrays zurück, auch wenn eine ID-Abfrage nur einen Datensatz liefert.

## API-Verträge

Die API-Basis im Live-Betrieb lautet `https://machinematch.freedev.app/backend/api/`.

### Maschinen

`GET /backend/api/machines.php` liefert ein JSON-Array. Der Endpunkt kann unter anderem nach `id`, `category`, `location`, `maxPrice`, `manufacturer`, `max_working_hours` und `min_year` filtern.

### Verkäufer

`GET /backend/api/sellers.php` liefert ein JSON-Array und akzeptiert `id`, `company_name` und `city` als Filter.

### Anfragen

`POST /backend/api/inquiries.php` erwartet `Content-Type: application/json` und ein Objekt mit:

```json
{
  "machine_id": 1,
  "name": "Example Name",
  "email": "name@example.com",
  "message": "I am interested in this machine."
}
```

Der Endpunkt prüft diese Angaben und legt anschließend einen Datensatz in `inquiries` an. Die Speicherung in der Live-Datenbank wurde bestätigt. Der Endpunkt verschickt keine E-Mail.

## Laufzeit, Konfiguration und Deployment

Beim Hosting liegen `index.html`, `css/`, `js/` und `backend/` im Verzeichnis `htdocs`. Das PHP-Backend und MySQL werden beim Hosting-Anbieter ausgeführt. `backend/config/database.php` stellt die PDO-Verbindung bereit; sie enthält Konfiguration, die nicht in öffentliche Dokumentation oder ein öffentliches Repository gehört.

Die Frontend-API-Aufrufe in `js/api.js` zeigen auf `https://machinematch.freedev.app/backend/api/...`. Für eine lokale Entwicklungsumgebung, beispielsweise XAMPP, kann eine lokale Projektkopie mit lokaler Datenbank verwendet werden. Dafür muss die API-Basis in `js/api.js` auf die lokale URL (zum Beispiel `http://localhost/MachineMatch/backend/api/`) geändert und `backend/config/database.php` lokal konfiguriert werden. Das ändert nicht den aktuellen Live-Bereitstellungszustand.
