# BasicMongooseCrud

This library has been tested using [mongoose](https://www.npmjs.com/package/mongoose) version 5.11.8.

## Installation

```shell
$ npm install @ferracinitec/basic-mongoose-crud
```

## Importing

```JavaScript
import { createCommonController, createCommonRoute } from '@ferracinitec/basic-mongoose-crud'
```

## Example

This example provides a URL `<your site>/mobile` with the HTTP verbs GET (all records using `/` or `/[id]` for a specific one), POST, PUT, DELETE, COPY, and PATCH.

```JavaScript
import express from 'express'
import basicMongooseCrud from '@ferracinitec/basic-mongoose-crud'
import mobile from './mongoose-schemas/mobile.js'

// Create a public router
const publicRouter = express.Router()

// Create a controller and define a route for GET, POST, PUT, DELETE.
const mobileController = basicMongooseCrud.create(publicRouter, '/mobile', mobile)
```

or

```JavaScript
import express from 'express'
import { createCommonController, createCommonRoute } from '@ferracinitec/basic-mongoose-crud'
import mobile from './mongoose-schemas/mobile.js'

// Create a public router
const publicRouter = express.Router()

// Create a controller
const mobileController = new createCommonController(mobile)

// Define a route for GET, POST, PUT, DELETE
createCommonRoute(publicRouter, '/mobile', mobileController)
```

## Custom Controller

To create a custom controller, you should extend the CreateCommonController class and override the following methods:

- **verbGetMiddleware**: Executed after the _find_ in _verbGet_, receiving an array with mongoose models. The data can be modified and must be returned.
- **verbGetByIdMiddleware**: Same as the _verbGetMiddleware_, but executed in _verbGetById_ and receives and returns a single model.
- **preUpdateMiddleware**: Before the update in _verbPut_. Receives the ID and the parameters. Must return the parameters to update.
- **postUpdateMiddleware**: After the update in _verbPut_. Receives the updated model to execute other actions. Must return a model.
- **postInsertMiddleware**: After the insert in _verbPost_. Receives the new model to execute other actions. Must return a model.
- **verbGet**: Returns an array with the documents searched according to the provided filter.
- **verbGetById**: Returns a single model, according to the ID given in the URL.
- **verbPost**: Inserts a new model, according to the parameters in the body.
- **verbPut**: Updates a model found according to the ID given in the URL with data in the body.
- **verbDelete**: Deletes a model found according to the ID given in the URL.
- **verbCopy**: Does nothing. Needs implementation.

## Documentation

### HTTP Verb GET

A filter can be executed by passing a field in a URL.

`http://localhost/mobile?manufacturer=motorola`

Regular expressions can be used like this:

`http://localhost/mobile?manufacturer__regex=[mM]otorola`

Also JSON-specific commands:

`http://localhost/mobile?manufacture__json={"$in":["motorola","apple"]}`

To populate submodels, use `__populate`:

`http://localhost/mobile?manufacture=motorola&__populate=[{"path":"models"}]`

Use `__fields` to determine a list of fields to display, `__sort` for sorting results, and `__limit` to limit the number of results.

Passing an ID in the URL will only return one model.

### HTTP Verb POST

### HTTP Verb PUT

### HTTP Verb DELETE
