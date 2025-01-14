## Migracje z Alembic

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
