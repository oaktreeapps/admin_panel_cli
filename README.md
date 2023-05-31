# OaktreeApps Admin CLI

## About

This is a simple CLI application to quickly setup MERN stack admin project with Express backend & React frontend.

The CLI allows you to create screens at the frontend and corresponding routes & models at the backend with one command.

Everything is controlled in the `kitconfig` folder.

## Installation

To install the CLI application, run the following command:

```bash
npm i -g <npm-package>
```

Or the package can be run directly via npx:

```bash
npx <npm-package> [commands...]
```

## Usage

The template comes with an example kitconfig setup containing a `Students` entity in the `kitconfig/screens` folder.

Adding a screen is a 2-step process:

1. Define the screen in the `kitconfig/screens` folder creating a new file `<some-generic-name>.json`
2. run `npx <npm-package> addscreen <screen-name>`

The CLI will create files at Frontend & Backend following the instructions written in the screen file.

For removing an accidentally created screen, you can run:

```bash
npx <npm-package> removescreen <screen-name>
```

This will go ahead & remove any traces of the screen from the Frontend & Backend folders.

## Kit Config

### Folder Structure

```
  |-kitconfig
    |-index.json
    |-screens
      |-<screen-name>.json
      |-<screen-name>.json
      ...

  |-webapp
  |-backend
```
