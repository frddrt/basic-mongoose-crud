/**
 * @author Frederico Ferracini Duarte
 * @since 2022-06-01 12:25:57
 */

export default (router, route, controller) => {
	const {verbGet, verbPost, verbPostWithId, verbPut, verbDelete, verbGetById, verbCopy, verbPatch} = controller
	const routeWithId = `${route}/:id`

	if (verbGet) router.get(route, verbGet)
	if (verbGetById) router.get(routeWithId, verbGetById)
	if (verbPost) router.post(route, verbPost)
	if (verbPostWithId) router.post(routeWithId, verbPostWithId)
	if (verbPut) router.put(routeWithId, verbPut)
	if (verbDelete) router.delete(routeWithId, verbDelete)
	if (verbCopy) router.copy(route, verbCopy)
	if (verbPatch) router.patch(routeWithId, verbPatch)
}
