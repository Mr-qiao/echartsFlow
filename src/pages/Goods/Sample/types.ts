
export type DataType = {
    id?: number;
    refTitle?: string; // 样衣名称
    refSysItemCode?: number; // 样衣编码
    sysItemCode?: number; // 需求单编码
    refCategoryId?: number; // 分类ID
    refSupplierStyleCode?: number; // 商家款式编码
    creator?: string // 对接人
    clothColor?: string; // 颜色
    clothSize?: string; // 尺码
    imgs?: string[]; // 图片
    spotsType?: number; // 是否现货
    tagPrice?: string; // 吊牌价
    sampleClothesFinishTime?: string; // 预计交付时间
    status?: number; // 状态
    creatorName?: string; // 对接人
    [key: string]: any;
}