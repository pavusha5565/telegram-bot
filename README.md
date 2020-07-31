# Телеграм бот
Стартовая версия телеграм бота на основе nestjs, typeorm, telegraf ( nestjs-telegraf ). В качестве БД используется postgres.

## Installation

Установка зависимостей и копирование .env файла

```bash
$ yarn install
$ cp ./.env.example ./.env
```

Установка docker контейнера с postgres БД

```bash
$ cd ./_docker
$ docker-compose up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
