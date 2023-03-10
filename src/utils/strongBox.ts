import { message } from "antd"
import apis from "@/services/outComplaints/base"

export const setStorageBoxValue = async (params: any) => {
    const {
        values, strongKeys, cb, errCb,
    } = params;
    // 数据加密处理
    const strongRequest: any = [];
    const filterStrongKeys = strongKeys.filter((item: any) => values[item.strongKey]);
    filterStrongKeys.forEach((item: any) => {
        strongRequest.push(apis.getCiphertext({
            plaintext: values[item.strongKey],
            typeCode: item.typeCode,
        }));
    });
    const strongRequests = await Promise.all(strongRequest);
    const failedStrongRequest = strongRequests.map((item: any, index: any) => {
        item.index = index;
        return item;
    }).filter((item: any) => !item.status);

    if (failedStrongRequest.length > 0) {
        const requestErrorMsg: String[] = [];
        failedStrongRequest.forEach((item: any) => {
            requestErrorMsg.push(`${filterStrongKeys[item.index].label}数据加密，${item.message}`);
        });
        errCb();
        return message.error(requestErrorMsg.join(';'));
    }
    strongRequests.forEach((item: any, index: any) => {
        const strongKeyObject = filterStrongKeys[index];
        values[strongKeyObject.baseKey] = item.entry.encryptedText;
        values[strongKeyObject.strongKey] = item.entry.sensitiveInformationId;
    });
    return values;
};