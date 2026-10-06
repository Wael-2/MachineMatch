# Produktplan: MachineMatch

## Produktidee

MachineMatch zeigt, wie sich gebrauchte Industriemaschinen anhand von Anforderungen suchen, technische Daten prüfen und passende Demo-Angebote direkt vergleichen lassen.

## Zielgruppe und Problem

Das Portfolio-Projekt richtet sich konzeptionell an gewerbliche Käufer und Fachleute, für die Maschinenangebote viele technische Merkmale enthalten. Der Vergleich dieser Angebote kostet Zeit. MachineMatch bündelt Suche, Anforderungen, Match-Erklärung, Detaildaten und Verkäuferkontakt in einem kompakten Ablauf.

## Gelieferter Projektumfang

Der aktuelle Stand ist eine öffentlich erreichbare Portfolio-Demo unter [machinematch.freedev.app](https://machinematch.freedev.app). Sie verwendet ausschließlich synthetische Angebots- und Verkäuferdaten und ist kein echter Maschinenmarktplatz.

- **Suche:** Suchbegriff und Filter für Kategorie, Standort, Preis, Hersteller, Arbeitsstunden und Mindestbaujahr.
- **Sortierung:** unter anderem nach Match-Score, Preis, Baujahr und Arbeitsstunden.
- **Matching:** gewichtete Heuristik für Preis, Baujahr, Arbeitsstunden, Hersteller und Standort; der Score wird auf die aktiven Kriterien normiert.
- **Details:** Maschinenbild, Preis, Standort, Beschreibung, technische Spezifikationen und zugehöriger Demo-Verkäufer.
- **Vergleich:** bis zu drei Maschinen nebeneinander, inklusive Bild, Kerndaten und Match-Score; die Auswahl besteht nur im aktuellen Browser-Tab.
- **Anfrage:** Formular mit Maschinenbezug; das PHP-Backend validiert und speichert die Anfrage in der Live-MySQL-Datenbank. Es wird keine E-Mail an Verkäufer gesendet.
- **Navigation und Information:** getrennte Views, About-Modal und Inquiry-Modal.

## Produktentscheidungen

- Der Detail-View wird gezielt über „View Details“ geöffnet, damit die Karten in den Suchergebnissen nicht versehentlich navigieren.
- Der Vergleich stellt bis zu drei Maschinen nebeneinander dar.
- Der Match-Score ist eine transparente Regelberechnung. Er dient als Orientierung, nicht als Garantie für Eignung.
- Anfragen werden gespeichert.

## Aktueller Stand

Die öffentliche Demo ist unter `https://machinematch.freedev.app` erreichbar. Nutzer können Maschinen suchen, filtern, sortieren, Details ansehen und bis zu drei Angebote vergleichen. Verkäuferinformationen werden passend zum Angebot geladen. Anfragen werden mit der ausgewählten Maschinen-ID in der Live-MySQL-Datenbank gespeichert. Das Inquiry-Formular dient dazu, das Interesse an einem Demo-Angebot festzuhalten.
