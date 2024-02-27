import type, { IApi } from 'umi';

export default function (api: IApi) {
  api.addHTMLHeadScripts(() => {
    return [
      {
        type: "text/javascript",
        src: 'https://webapi.amap.com/maps?v=2.0&key=89891f300af25a591b87a190d71165a2'
      },
      {
        type: "text/javascript",
        src: 'https://webapi.amap.com/loca?v=2.0.0&key=89891f300af25a591b87a190d71165a2'
      }
    ]
  })
}