## Deliveroo - co to?

Projekt ilustruje problematykę i wyzwania biznesowe z branży logistyczno-transportowej.

Projekt realizuje cele edukacyjne i nie ma na celu obsługiwać prawdziwych klientów z branży logistycznej. Celem jest maksymalne zbliżenie go do bycia _production-ready_, jednakże _100% production-ready_ nie zostanie prawdopodobnie osiągnięte.

Prawdopodobnie nie wszystkie elementy zostaną ukończone - Priorytetem są cele edukacyjne i implementowanie bardzo podobnych technicznie feature'ów może nie snowić dodatkowej wartości edukacyjnej.

## Quick actions

- uruchom całość: `docker compose up`
- zobacz architekturę całości - uruchom `structurizr` (port 5003 po uruchomieniu docker compose)

## Komponenty systemu (wysokopoziomowe)

- TMS - Transportation Management System
  - główna gałąź biznesowa firmy. Transportowanie drogowe towarów. Przy użyciu własnych zasobów (m.in. floty)
- WMS - Warehousing Management System
  - dodatkowa domena umożliwiająca klientom składowanie towarów. Udostępniana w ramach TMS lub samodzielnie
