#!/bin/sh

npx sequelize-cli db:migrate
npx sequelize db:seed:all

npm run dev
