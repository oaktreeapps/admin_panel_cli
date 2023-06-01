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

## Environment file

### Frontend

The `.env` file in the frontend folder expects only 1 variable i.e base url of the corresponding backend server.

```python
VITE_BASE_URL = "http://localhost:3005/api"
```

### Backend

The `.env` file in the backend folder expects various variables, here's a sample `.env` file that goes with the server.

```python
REST_API_PORT=3005 #REQUIRED
MONGO_CONNECTION_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority #REQUIRED


AUTH_PRIVATE_BASE64= #REQUIRED
AUTH_PUBLIC_BASE64= #REQUIRED

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_FROM_NAME=

S3_REGION=
S3_ACCESS_KEY=
S3_ACCESS_ID=
S3_BUCKET_NAME=

STATIC_S3_REGION=
STATIC_S3_BUCKET_NAME=
```

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
