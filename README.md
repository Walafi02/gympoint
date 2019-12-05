<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Gympoint, Frontend, Mobile e Backend
</h3>

<blockquote align="center">“Mude você e todo o resto mudará naturalmente”!</blockquote>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-execução">Instalação e execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)

## 💻 Projeto

A aplicação desenvolvida neste projeto é um app gerenciador de academia, o Gympoint. Esse app tem seu backend construído em node que fornece uma api que é consumida pelo aplicações web e mobile. 

A aplicação Web por sua vez é voltada para a academia, onde funcionalidades, como: CRUDs de alunos, matrículas e planos foram implementados, além tela de ajuda aos alunos.

Já aplicação mobile é direcionada aos alunos da academia, onde os mesmo poderão realizar check ins, efetuar, listar e visualizar seus pedidos de ajuda com suas respectivas respostas.

## 🚀 Instalação e execução

Faça um clone desse repositório

  ### Backend
  1. A partir da raiz do projeto, entre na pasta rodando `cd backend`;
  2. Inicie os bancos de dados postgresql, mongodb e redis utilizando docker:
  ```bash
    $ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
    $ docker run --name mongo -p 27017:27017 -d -t mongo
    $ docker run --name redis -p 6379:6379 -d -t redis:alpine
  ```
  3. Crie um arquivo `.env` a partir do arquivo `.env.example` e preencha todas as variáveis pedidas;
  3. Rode `yarn` para instalar as dependências;
  4. Rode `yarn dev` para iniciar o servidor de desenvolvimento;

  ### Frontend
  1. A partir da raiz do projeto, entre na pasta rodando `cd frontend`;
  2. Rode `yarn` para instalar as dependências;
  3. Rode `yarn start` para iniciar o servidor de desenvolvimento;
  4. Abra `http://localhost:3000` para ver o projeto no navegador.

  ### Mobile
  1. A partir da raiz do projeto, entre na pasta rodando `cd mobile`;
  2. Rode `yarn` para instalar as dependências;
  3. Rode `yarn start` para iniciar o servidor de desenvolvimento;
  3. Rode `yarn android` para iniciar a instalação no smartphone;

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.