# BasicMongooseCrud
This library was tested using [mongoose](https://www.npmjs.com/package/mongoose) version 5.11.8.
# Installing
```shell
$ npm install @ferracinitec/basic-mongoose-crud
```
# Importing
```JavaScript
import { createCommonController, createCommonRoute } from '@ferracinitec/basic-mongoose-crud'
```
# Example
That's example provide a `<your site>/mobile` url with get (all register using `/` or `/[id]`), post, put, delete, copy and path http verbs.

```JavaScript
import express from 'express'
import basicMongooseCrud from '@ferracinitec/basic-mongoose-crud'
import mobile from './mongoose-schemas/mobile.js'

// Create a public router
const publicRouter = express.Router()

// Create a controller and define a route for get, post, put, delete.
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

// Define a route for get, post, put, delete
createCommonRoute(publicRouter, '/mobile', mobileController)
```
# Custom Controller
To do a custom controller you can extends createCommonController and overrides the following methods:
- **verbGetMiddleware** => Executed after the _find_ in _verbGet_, receiving an array with mongoose models. The data can be modified and must have returned.
- **verbGetByIdMiddleware** => Same the _verbGetMiddleware_, but executed in _verbGetById_ and receive and return a single model.
- **postUpdateMiddleware** => After the update in _verbPut_. Receive the model updated, for execute another actions. Must have return a model.
- **postInsertMiddleware** => After the insert in _verbPost_. Receive the new model, for execute another actions. Must have return a model.
- **verbGet** => Return an array with models finded, according to the given filter.
- **verbGetById** => Return a single model, according ID given in url.
- **verbPost** => Insert a new model, according parameters in body.
- **verbPut** => Update a model finded according ID given in url with data in body.
- **verbDelete** => Delete a model finded according ID given in url.
- **verbCopy** => Do nothing. Needs implementation.

# Documentation
## Http verb GET
A filter can be executed, passing a field in a url.  
`http://localhost/mobile?manufacturer=motorola`

Regex expressions can be made like.  
`http://localhost/mobile?manufacturer__regex=[mM]otorola`

Also JSON especifcs commands.  
`http://localhost/mobile?manufacture__json={"$in":["motorola","apple"]}`

To populate submodels use `__populate`.  
`http://localhost/mobile?manufacture=motorola&__populate=[{"path":"models"}]`

Use `__fields` to determine a list of fields to display, `__sort` to sorting results and `__limit` to limit a number of results

Passing an id in the url will only return 1 model.

## Http verb POST

## Http verb PUT

## Http verb DELETE
