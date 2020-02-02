#!/bin/sh
yarn sequelize db:migrate:undo:all
yarn sequelize db:migrate
yarn sequelize db:seed:all
yarn dev
