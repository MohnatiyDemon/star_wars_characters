## Star Wars Characters (React + TS + Vite)

Мини‑приложение для просмотра персонажей Star Wars (SWAPI): список, поиск, пагинация, страница персонажа с локальным редактированием полей (сохранение в `localStorage`).

### Технологии
React 19, TypeScript, Vite, Redux Toolkit (RTK Query), React Router, MUI.

### Запуск
```bash
npm install
npm run dev
```
Открыть: http://localhost:5173

### Скрипты
`npm run dev` – разработка
`npm run build` – сборка
`npm run preview` – предпросмотр
`npm run lint` / `npm run lint:fix` – проверка / фикс

### Функционал
- Список с пагинацией
- Поиск по имени (дебаунс)
- Детальная страница
- Редактирование полей (локально)
- Сохранение изменений в `localStorage`

### Примечание
Данные из публичного API https://swapi.dev. Проект учебный.
