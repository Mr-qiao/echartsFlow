interface ItemProperties {
    propertyName?: string;
    propertyCode?: string;
    propertyValues?: (string)[];
    value?: string;
    cardGroup?: number;
    cardOrder?: number;
}
interface DetailVOList {
    id?: number;
    purNo?: string;
    itemId?: number;
    skuId?: number;
    itemTitle?: string;
    itemType?: number;
    itemTypeDesc?: string;
    skuSysCode?: string;
    imgUrlList?: (string)[];
    specification?: string;
    itemProperties?: ItemProperties[];
    price?: string;
    number?: number;
    amount?: string;
    unit?: string;
    latelyPrice?: string;
    askPrice?: string;
    status?: number;
    rejectReason?: string;
    extra?: string;
    gmtCreate?: null;
    gmtModified?: null;
    creator?: string;
    modifier?: string;
    isDeleted?: number;
}
export interface List {
    id?: number;
    purNo?: string;
    supplierId?: number;
    supplierName?: string;
    amount?: string;
    number?: number;
    unit?: string;
    skuNumber?: number;
    buyer?: string;
    status?: number;
    statusDesc?: string;
    expectedTime?: null;
    rejectReason?: string;
    extra?: string;
    gmtCreate?: null;
    gmtModified?: null;
    creator?: string;
    modifier?: string;
    isDeleted?: number;
    detailVOList?: DetailVOList[];
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
