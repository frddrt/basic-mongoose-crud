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
# Documentation
In development... sorry.
