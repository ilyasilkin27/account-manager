# Account Manager

## Описание

Форма управления учетными записями на Vue 3 + TypeScript + Pinia + Element Plus.

- Добавление, удаление, редактирование учетных записей
- Валидация полей по ТЗ
- Сохранение в localStorage
- Метки преобразуются в массив объектов
- UI на русском языке

## Запуск

```bash
bun install
bun run dev
```

## Стек
- Vue 3 + Composition API
- TypeScript
- Pinia
- Element Plus
- Bun.js (runtime)

## Структура
- `src/stores/accounts.ts` — Pinia store
- `src/components/AccountList.vue` — список аккаунтов
- `src/components/AccountItem.vue` — форма одной учетной записи

## Требования ТЗ
- Все поля и логика реализованы согласно тестовому заданию (см. описание в репозитории) 