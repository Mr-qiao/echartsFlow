import {request} from '@umijs/max';

export function queryList(body: object, options: any) {
	return request('/item/item/factory/sample/demand/list', {
		method: 'POST',
		data: body,
		...(options || {
			headers: {
				'content-type': 'application/json',
			},
		}),
	});
}

export async function searchForSystem(body) {
	return request(`/usercenter-backend/employee/search`, {
		method: 'POST',
		data: { ...body, staffStatus: 1 },
	});
}
export function mark(body: object, options: any) {
	return request('/item/item/factory/sample/demand/mark', {
		method: 'POST',
		data: body,
		...(options || {
			headers: {
				'content-type': 'application/json',
			},
		}),
	});
}

export function delivery(body: object, options: any) {
	return request('/item/item/factory/sample/demand/delivery', {
		method: 'POST',
		data: body,
		...(options || {
			headers: {
				'content-type': 'application/json',
			},
		}),
	});
}
export function detail(body: object) {
	return request('/item/item/designer/sample/clothes/requirement/detail', {
		method: 'POST',
		data: body,
	});
}
