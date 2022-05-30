# CL GitHub Page

This project provides a [project landing page](https://obophenotype.github.io/cl.github.io/) for the Cell Ontology.

Project is based on the [Fresh Template](https://github.com/cssninjaStudio/fresh).

## Usage

1. Install development environment and project dependencies

```sh
yarn install
```

2. To start development server

```sh
yarn dev
```

## Deployment

1. Install `gh-pages` package to yarn

```sh
yarn add gh-pages
```

2. Run given command and provide github credentials when asked.

```sh
yarn run deploy
```

This will build the project and deploy `dist` folder to the `gh-pages` branch. A build-in github action will start and page will be refreshed in a few minutes.
