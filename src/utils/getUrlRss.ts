import service from '@/services/outComplaints/base';
import { message } from 'antd';

const getUrlsRss = async (resourceIds: any) => {
    if (typeof resourceIds === 'string') {
        resourceIds = [resourceIds]
    }
    const res = await service.getBatchGetResourceUrl({ resourceIds: resourceIds, "accessTerm": "FRONT" });
    const entry = res.entry || {};
    const urlArr: any[] = []
    Object.keys(entry).forEach((key) => {
        urlArr.push(entry[key])
    })
    if (res.status) {
        return urlArr;
    } else {
        message.error('图片加载异常');
        return [];
    }
};

export default getUrlsRss;