import type { IApi } from 'umi';

export default (api: IApi) => {
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: 'https://www.geetest.com/demo/libs/gt.js',
  }));
};
