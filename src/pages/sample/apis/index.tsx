import { request } from '@umijs/max';

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
