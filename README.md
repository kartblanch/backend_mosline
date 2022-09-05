## Description

Серверная часть тестирования сотрудников.

## Установка

```bash
$ npm install
Редактирование файла .env с необходимыми параметрами
```

## Просмотр документации

```bash
<hostname>:<port>/api/docs
```

## Запуск сервера

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## FAQ
Ответы на возможные вопросы:
- Почему отношение в роли (role) и пользователи (users) many-to-many?
  > В теории может быть такое, что сотрудник или администратор имеет много ролей

- Почему для авторизации пользователя я не использую passport?
  > Было принято решение реализовать самому весь функционал