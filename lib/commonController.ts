/**
 * @author Frederico Ferracini Duarte
 * @since 2022-06-01 12:29:20
 */

import { Request, Response } from "express"
import { Model } from "mongoose"

export default class CreateCommonController<T> {
	Model: Model<T>
	reservedKeys: Array<string>

	constructor (Model: Model<T>) {
		this.Model = Model

		this.reservedKeys = ['__fields', '__populate', '__sort', '__limit', '__skip', 'on']

		this.verbGetMiddleware = this.verbGetMiddleware.bind(this)
		this.verbGetByIdMiddleware = this.verbGetByIdMiddleware.bind(this)
		this.preUpdateMiddleware = this.preUpdateMiddleware.bind(this)
		this.postUpdateMiddleware = this.postUpdateMiddleware.bind(this)
		this.postInsertMiddleware = this.postInsertMiddleware.bind(this)
		this.verbGet = this.verbGet.bind(this)
		this.verbGetById = this.verbGetById.bind(this)
		this.verbPost = this.verbPost.bind(this)
		this.verbPut = this.verbPut.bind(this)
		this.verbDelete = this.verbDelete.bind(this)
		this.verbCopy = this.verbCopy.bind(this)
		this.modifiers = this.modifiers.bind(this)
		this.buildFilter = this.buildFilter.bind(this)
	}

	verbGetMiddleware(models: any): any { return models }
	verbGetByIdMiddleware(model: any): any { return model }
	preUpdateMiddleware(id: string, param: any) { return param }
	postUpdateMiddleware(updateJson: any, model: any) { return model }
	postInsertMiddleware(insertJson: any, model: any) { return model }

	modifiers(query: any) {
		return {
			fields: JSON.parse(query.__fields || '[]'),
			populate: JSON.parse(query.__populate || '[]'),
			sort: JSON.parse(query.__sort || '{}'),
			limit: Number(query.__limit || '0'),
			skip: Number(query.__skip || '0'),
		}
	}

	buildFilter(query: any) {
		const filter: any = {}

		for (const key in query) {
			if (!this.reservedKeys.includes(key)) {
				if (/__regex$/.test(key)) {
					filter[key.replace(/__regex$/, '')] = {'$regex': new RegExp(query[key].replace(/\//g, ''))}
				} else if (/__json$/.test(key)) {
					filter[key.replace(/__json$/, '')] = JSON.parse(query[key])
				} else {
					filter[key] = query[key]
				}
			}
		}

		return filter
	}

    verbGet(request: Request, response: Response) {
		const {query} = request
		const filter = this.buildFilter(query)
		const {fields, populate, sort, limit, skip} = this.modifiers(query)

        this.Model.find(filter)
		.select(fields)
		.populate(populate)
		.sort(sort)
		.limit(limit)
		.skip(skip)
		.then(models => this.verbGetMiddleware(models))
        .then(models => response.json(models))
        .catch(error => response.json({error}))
    }

	verbGetById(request: Request, response: Response) {
		const {query} = request
		const id = request.params.id
		const {fields, populate, sort, limit} = this.modifiers(query)

		this.Model.findById(id)
		.select(fields)
		.populate(populate)
		.sort(sort)
		.limit(limit)
		.then(this.verbGetByIdMiddleware)
        .then(model => response.json(model))
        .catch(error => response.json({error}))
	}

	verbPost(request: Request, response: Response) {
		const param = request.body

		this.Model.create(param)
		.then(model => this.postInsertMiddleware(param, model))
		.then(model => response.json(model))
        .catch(error => response.json({error}))
	}

	verbPut(request: Request, response: Response) {
		const id = request.params.id
		const param = request.body
		const newParam = this.preUpdateMiddleware(id, param)
		const {fields, populate} = this.modifiers(param)

		this.Model.findByIdAndUpdate(id, newParam, {new: true})
		.select(fields)
		.populate(populate)
		.then(model => this.postUpdateMiddleware(newParam, model))
		.then(model => response.json(model))
		.catch(error => response.json({error}))
	}

	verbDelete(request: Request, response: Response) {
		const id = request.params.id

		this.Model.findByIdAndDelete(id)
		.then(model => response.json(model))
		.catch(error => response.json({error}))
	}

	verbCopy(request: Request, response: Response) {
	}

	verbPatch(request: Request, response: Response) {
	}
}
