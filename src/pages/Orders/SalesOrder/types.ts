interface SystemInfoVO {
    jstOrderNumber?: string;
    payAmount?: string;
    deliveryFactory?: string;
    orderStatus?: string;
    problemTypes?: string;
}
interface PlatformInfoVO {
    ksOrderNumber?: string;
    anchorNickname?: string;
    shopName?: string;
    source?: string;
    platformStatus?: string;
}
interface ItemInfoVOList {
    itemImageList?: (string)[];
    jstItemImageList?: (string)[];
    itemId?: number;
    ksItemCode?: string;
    ksItemId?: string;
    orderNumber?: string;
    anchorNickname?: string;
    title?: string;
    specification?: string;
    number?: number;
    money?: string;
    isGift?: null;
    index?: number;
}
interface DateInfoVO {
    planDeliverTime?: number;
    payTime?: number;
    orderTime?: number;
    updateTime?: number;
}
interface ReceiveInfoVO {
    name?: string;
    phone?: string;
    address?: string;
}
interface DeliveryInfoVO {
    deliveryRepository?: string;
    expressName?: string;
    expressOrderNumber?: string;
    deliverTime?: number;
}
export interface List {
    id?: number;
    systemInfoVO?: SystemInfoVO;
    platformInfoVO?: PlatformInfoVO;
    itemInfoVOList?: ItemInfoVOList[];
    dateInfoVO?: DateInfoVO;
    receiveInfoVO?: ReceiveInfoVO;
    deliveryInfoVO?: DeliveryInfoVO;
    isAssignFactory?: number;
}
interface Data {
    pageNum?: number;
    pageSize?: number;
    totalRecord?: number;
    list?: List;
}
interface Json {
    code?: number;
    message?: string;
    data?: Data;
}