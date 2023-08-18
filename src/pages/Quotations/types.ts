
type ItemProperties = {
	propertyName?: string;
	propertyCode?: string;
	propertyValues?: (string)[];
	value?: string;
}

export type DataType = {
	id?: number; // 健
	itemId?: number; // 商品ID
	itemTitle?: string; // 商品名称
	itemSysCode?: string; // ≈
	brandId?: number;
	brandName?: string; // 商品品牌
	categoryId?: number; // 
	categoryName?: string; // 商品类目
	color?: (string)[]; // 颜色
	size?: (string)[]; // 尺寸
	imgUrlList?: (string)[]; // 图片
	itemProperties?: ItemProperties[];
	domainType?: number; // 询价用途
	answerType?: number; // 报价类型
	number?: number; // 预计采购量
	askTime?: null; // 询价日期
	answerTime?: null;
	askStartTime?: null;
	askEndTime?: null; // 报价截止日期
	status?: number; // 报价状态
	[key: string]: any;
}

type Data = {
	pageNum?: number;
	pageSize?: number;
	totalRecord?: number;
	list?: DataType;
}

export type Entry = {
	code?: number;
	message?: string;
	data?: Data;
}
