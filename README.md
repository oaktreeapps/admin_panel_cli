# OaktreeApps Admin CLI

## About

This is a simple CLI application to quickly setup MERN stack admin project with Express backend & React frontend.

The CLI allows you to create resources at the frontend and corresponding routes & models at the backend with one command.

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

## Commands

### `scaffold [...options] project-name`

Creates a new admin project containing the following folders:

1. **kitconfig** - folder containing the `.cjs` files for configuring the project (also comes with sample files `resources/products.cjs` & `resources/students.cjs`).

2. **webapp** - React.js project containing the UI.

3. **server** - Express.js (TypeScript) project hooked up to MongoDB database.

#### Usage

```bash
npx <npm-package> scaffold admin-panel
```

```bash
npx <npm-package> scaffold --only-webapp admin-panel
```

```bash
npx <npm-package> scaffold --only-server admin-panel
```

### `addconfig resourcename`

Creates a `.cjs` config file for the resource to be added in project's kitconfig folder.

This file contains the properties & fields that the resource needs.

#### Usage

```bash
npx <npm-package> addconfig products
```

It can be edited to add fields & properties describing backend & frontend requirements.

### `add resource`

Creates UI & corresponding backend (models, routes & controllers).

#### Usage

For example, let's say we need to create backend & UI for our "posts" model.

we'll first go into the `kitconfig/resources` folder, create a file named `posts.cjs` and define properties & fields this resource needs. (refer types autocomplete & sample files for defining new fields & other properties),

And then, while we're in the admin directory, we can run the following command:

```bash
npx <npm-package> add posts
```

### `remove resource`

Removes the previously created resource in UI & corresponding backend (models, routes & controllers).

> Only removes the resource from codebase, won't remove the config file.

#### Usage

```bash
npx <npm-package> remove posts
```

### `sync`

_Adds_ all the resources defined in `kitconfig/resources` folder, without overriding any of the existing resources.

#### Usage

```bash
npx <npm-package> sync
```

## .env files

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
    |-resources
      |-resource1.cjs
      |-resource2.cjs
      ...
    |-types.d.ts

  |-webapp
  |-backend
```

The `kitconfig/resources` folder contains the `.cjs` files for configuring the project.

The `kitconfig/types.d.ts` file contains the types for the resource JS object defined in the `kitconfig/resources/resource.cjs` folder.

### `resource.cjs`

Here's a sample file that covers all of the properties & fields that can be defined in the resource config file.

```javascript
/**
 * @type {import('../types').Resource}
 */
const resource = {
  name: "Students",
  url: "/students",
  collectionName: "students",
  crudFields: [
    { name: "fullName", datatype: "String", widget: "InputText" },
    { name: "bio", datatype: "String", widget: "InputTextarea", required: false },
    { name: "password", datatype: "String", widget: "InputText", tableDisplay: false },
    { name: "rollNo", datatype: "Number", widget: "InputNumber", inline: true, unique: true },
    {
      name: "city",
      datatype: "String",
      widget: "Dropdown",
      inline: true,
      options: [
        { name: "New York", value: "NY" },
        { name: "Rome", value: "RM" },
        { name: "London", value: "LDN" },
        { name: "Istanbul", value: "IST" },
        { name: "Paris", value: "PRS" },
      ],
    },
    { name: "isPublic", widget: "InputSwitch", datatype: "Boolean" },
    {
      name: "gender",
      datatype: "String",
      widget: "RadioButton",
      options: [
        { name: "Male", value: "M" },
        { name: "Female", value: "F" },
        { name: "Other", value: "O" },
      ],
    },
  ],
};

module.exports = resource;
```

> Quicknote: The boilerplate containing `name`, `collectionName` & `url` can be generated with `addconfig resourcename` command.

For the `resource` object, the following properties are supported:

- `name` (required) - name of the resource
- `url` (required) - url of the resource where the resource data will be avaiable in the admin panel UI
- `collectionName` (required) - name of the collection in the MongoDB database
- `crudFields` (required) - the fields that the resource needs defined in an array of objects (refer below for more info)

For the `crudFields` property, the following properties are supported:

- `name` (required) - name of the field
- `datatype` (required, optional if `widget` is given) - the datatype of the field - is of type: `String`, `Number` or `Boolean`
- `widget` (required, optional if `datatype` is given) - the widget name to be used for the field - is of type: `InputText`, `InputNumber`, `InputTextarea`, `InputSwitch`, `Dropdown` or `RadioButton`
- `options` - the options for the field (for dropdown, radio button, etc.) - is of type: `[{ name: string, value: string }, ...]`
- `unique` (optional, default = false) - whether the field is unique or not - is of type: `true` or `false`
- `required` (optional, default = true) - whether the field is required or not - is of type: `true` or `false`
- `tableDisplay` (optional) - whether the field should be displayed in the table or not: is of type: `true` or `false`
- `inline` (optional, default = false) - consecutive fields marked as inline are grouped and displayed in a row in UI - is of type: `true` or `false`
