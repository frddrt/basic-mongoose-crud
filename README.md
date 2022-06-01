# BasicMongooseCrud
This library was tested using [mongoose](https://www.npmjs.com/package/mongoose) version 5.11.8.
# Installing
```shell
$ npm install basic-mongoose-crud`
```
# Importing
```JavaScript
import { createCommonController, createCommonRoute } from 'basic-mongoose-crud'
```
# Example
That's example provide a `<your site>/mobile` url with get (all register using `/` or `/[id]`), post, put, delete, copy and path http verbs.

```JavaScript
import express from 'express'
import { createCommonController, createCommonRoute } from 'basic-mongoose-crud'
import mobile from './mongoose-schemas/mobile.js'

const mobileController = createCommonController(mobile)
const publicRouter = express.Router()

createCommonRoute(publicRouter, '/mobile', mobileController)
```
# Documentation
In development... sorry.
