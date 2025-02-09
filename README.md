# Projekt ZPRP

**Michał Satała**  
**Adrian Murawski**  
**Łukasz Wójcicki**

## Opis projektu

Projekt zakłada stworzenie systemu, który będzie pozwalać śledzić starty rakiet oraz umożliwiał użytkownikom komentowanie, dodawanie do ulubionych i obserwowanie tych startów.

System będzie składał się z serwera, który będzie regularnie pobierał dane z zewnętrznego API i zapisywał je do bazy danych PostgreSQL. W momencie, gdy użytkownik zgłosi zapytanie, serwer najpierw sprawdzi, czy wynik zapytania znajduje się w pamięci podręcznej (Redis). Jeśli dane będą dostępne w Redis, zostaną zwrócone natychmiast, minimalizując obciążenie bazy danych.

Interfejs graficzny zapewni użytkownikom czytelne i przejrzyste wyświetlanie danych. Użytkownicy będą mogli wchodzić w interakcje z systemem, np. dodawać starty do ulubionych czy komentować wydarzenia.

## Planowane funkcjonalności

- Użytkownicy mogą śledzić starty rakiet.
- Użytkownicy mogą zakładać konta i logować się na nie.
- Użytkownicy mogą przeglądać szczegółowe informacje o lotach, np. miejsce startu, pojazd itp.
- Użytkownicy mogą zostawiać komentarze pod lotami.
- Użytkownicy mogą dodawać loty do ulubionych.
- Użytkownicy mogą dodawać konkretne agencje kosmiczne do ulubionych, aby łatwo przeglądać starty ich rakiet.

## Harmonogram projektu

| Lp. | Tydzień                | Planowany postęp projektu                                                                                                                                          |
| --- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | 21 - 27.10.2024        | Dostarczenie design proposal, research nt. thespacedevs API                                                                                                        |
| 2   | 28.10 - 03.11.2024     | Stworzenie struktury katalogów, zdefiniowanie klas, stworzenie mockupu w Figmie, zdefiniowanie struktury bazy danych                                               |
| 3   | 4 - 10.11.2024         | Implementacja bazy danych, implementacja szkicu serwera, stworzenie pierwszego pokazowego endpointu, stworzenie strony z lotami ze zmockowaną odpowiedzią backendu |
| 4   | 11 - 17.11.2024        | Rozwój backendu, implementacja kolejnych endpointów, połączenie frontend-backend dla niektórych (najważniejszych) funkcjonalności                                  |
| 5   | 18 - 24.11.2024        | Dostarczenie “funkcjonalnego prototypu projektu”, działający backend wystawiający kilka najważniejszych endpointów, frontend wyświetlający te dane                 |
| 6   | 25.11 - 01.12.2024     | Dodawanie kolejnych endpointów, stworzenie strony do logowania i rejestracji                                                                                       |
| 7   | 2 - 8.12.2024          | Implementacja wszystkich (możliwe pojedyncze braki) endpointów, działający system cache’owania danych w Redis, stworzenie strony ze szczegółami lotu               |
| 8   | 9 - 15.12.2024         | Działające wszystkie endpointy serwera, stworzenie sekcji komentarzy na frontendzie                                                                                |
| 9   | 16 - 22.12.2024        | Dodanie statystyk użytkownika (ilość reakcji, komentarzy, obserwowanych agencji), testy wydajnościowe aplikacji                                                    |
| 10  | 23 - 29.12.2024        | Odpoczynek                                                                                                                                                         |
| 11  | 30.12.2024 - 5.01.2025 | Testowanie aplikacji z poziomu użytkownika                                                                                                                         |
| 12  | 6 - 12.01.2025         | Naprawa potencjalnych błędów, ostateczne poprawki, pierwsza próba oddania projektu                                                                                 |
| 13  | 13 - 19.01.2025        | Ewentualna poprawa projektu                                                                                                                                        |
| 14  | 20 - 27.01.2025        | Ewentualna poprawa projektu                                                                                                                                        |

## Stack technologiczny

- **Backend**: Python FastAPI
- **Frontend**: React
- **Baza danych**: PostgreSQL
- **Testy automatyczne**: Selenium
- **Narzędzie do cache'owania**: Redis
- **Testy jednostkowe**: pytest
- **Konteneryzacja**: Docker
- **Logowanie**: Sentry
- **Skrypty**: shell
- **Automatyczne budowanie / testowanie konfiguracji**: GitHub CI/CD

## Uruchomienie projektu

W celu uruchominiu projektu należy wpisać

```
./docker-compose.sh --prod
```

Aby uruchomić testy należy wpisać

```
./docker-compose.sh --test
```

a potem w katalogu blastoff_app

```
pdm run pytest
```

W katalogach frontend i blastoff_app w readme są instrukcje do uruchomienia projektów nie poprzez Dockera.

## Dokumentacja

Dokumentacja do tego projektu została napisana z użyciem MkDocs. Aby uruchomić dokumentację należy wpisać

```bash
pdm run mkdocs serve
```

## Migracje

W ramach naszego projektu używamy Alembic do zarządzania migracjami bazy danych. W momencie, gdy baza jest uruchomiona za pomocą Docker Compose, możemy wprowadzać zmiany w modelach, a następnie generować migracje oraz stosować je na działającej bazie.

1. Generowanie migracji

Po dokonaniu zmian w modelach bazy danych, należy wygenerować nową migrację. Można to zrobić za pomocą poniższego polecenia:

```bash
pdm run alembic revision --autogenerate -m "Komentarz do migracji"
```

2. Stosowanie migracji

Aby zastosować wygenerowaną migrację w działającej bazie danych, użyj poniższego polecenia:

```bash
pdm run alembic upgrade head
```

To polecenie zaktualizuje bazę danych do najnowszej wersji migracji (do "head").

## Bibliografia

- FastAPI documentation - [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- API - [thespacedevs.com/llapi](https://thespacedevs.com/llapi)
- PostgreSQL documentation - [postgresql.org/docs/](https://www.postgresql.org/docs/)
- React - [react.dev/](https://react.dev/)
- Locust documentation - [docs.locust.io/en/stable/](https://docs.locust.io/en/stable/)
