/**
 * @author Frederico Ferracini Duarte
 * @since 2022-06-01 12:24:56
 */

import { default as commonRoute } from './lib/commonRoute.js'
import { default as commonController } from './lib/commonController.js'

export const createCommonRoute = commonRoute
export const createCommonController = commonController
export const create = (router, route, model) => {
	const commonController = new createCommonController(model)
	createCommonRoute(router, route, commonController)

	return commonController
}

export default {
	create,
	createCommonRoute,
	createCommonController,
}
