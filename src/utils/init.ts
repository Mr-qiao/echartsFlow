import { getAccess } from '@/services/common';

export const resolveAuth = async () => {
  const auth: any = {
    page: {},
    button: {},
    app: {},
    menu: {},
  };

  const loop = (data: any) => {
    if (data.type === 'BUTTON') {
      auth.button[data.code] = true;
    }
    if (data.type === 'PAGE') {
      auth.page[data.code] = true;
    }
    if (data.type === 'MENU') {
      auth.menu[data.code] = true;
    }
    if (data.type === 'APP') {
      auth.app[data.code] = true;
    }
    if (Array.isArray(data.children)) {
      data.children.forEach((i: any) => loop(i));
    }
  };

  const authRes = await getAccess();
  if (authRes?.entry) {
    loop(authRes.entry);
  }

  return auth;
};
