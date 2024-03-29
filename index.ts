/**
 * @author Frederico Ferracini Duarte
 * @since 2022-06-01 12:24:56
 */

import { default as commonRoute } from './lib/commonRoute.js'
import { default as CommonController } from './lib/commonController.js'
import { Router } from 'express'
import { Model } from 'mongoose'

export const createCommonRoute = commonRoute
export const CreateCommonController = CommonController
export const create = (router: Router, route: string, model: Model<any>) => {
	const commonController = new CreateCommonController(model)
	createCommonRoute(router, route, commonController)

	return commonController
}

export default {
	create,
	createCommonRoute: createCommonRoute,
	CreateCommonController: CreateCommonController,
}
