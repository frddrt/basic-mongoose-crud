/**
 * @author Frederico Ferracini Duarte
 * @since 2022-06-01 12:24:56
 */

import { default as commonRoute } from './commonRoute.js'
import { default as commonController } from './commonController.js'

export const createCommonRoute = commonRoute
export const createCommonController = commonController

export default {
	createCommonRoute,
	createCommonController,
}
