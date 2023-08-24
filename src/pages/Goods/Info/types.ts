




export type DataType = {
    id?: number;
    brandIds?: number[]; // 商品品牌
    sysItemCode?: string; // 款式编码
    title?: string; // 款式名称
    categoryId?: number; // 分类ID
    hasSample?: number; // 商品类型
    categoryNames?: string[] // 类目
    brandName?: string; // 品牌
    clothColor?: string; // 颜色
    clothSize?: string; // 尺码
    images?: string[]; // 图片
    supplierName?: string; // 供应商信息
    supplierStyleCode?: number; // 供应商商品编码
    outsideItemCode?: number; // 快手商品id
    [key: string]: any;
}