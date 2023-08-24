

/**
 * 询价用途
 */
enum EnumDomainType {
    // 样衣
    SAMPLE = 1,
    // 款式
    CLOTHES = 2,
}

export const DomainTypeMap = {
    [EnumDomainType.SAMPLE]: '样衣',
    [EnumDomainType.CLOTHES]: '款式'
}

export const DomainTypeMapList = [
    {
        label: DomainTypeMap[EnumDomainType.SAMPLE],
        value: EnumDomainType.SAMPLE
    },
    {
        label: DomainTypeMap[EnumDomainType.CLOTHES],
        value: EnumDomainType.CLOTHES
    },
]

/**
 * 报价类型
 */
enum EnumAnswerType {
    // 成品报价
    ProductQuotation = 1,
    // boom报价
    BoomQuotation = 2,
}

export const AnswerTypeMap = {
    [EnumAnswerType.ProductQuotation]: '成品报价',
    [EnumAnswerType.BoomQuotation]: 'boom报价'
}

export const AnswerTypeMapList = [
    {
        label: AnswerTypeMap[EnumAnswerType.ProductQuotation],
        value: EnumAnswerType.ProductQuotation
    },
    {
        label: AnswerTypeMap[EnumAnswerType.BoomQuotation],
        value: EnumAnswerType.BoomQuotation
    },
]

/**
 * 报价状态
 */
export enum EnumStatusType {
    // 未开始
    Wait = 1,
    // 待报价
    WaitQuoted = 2,
    // 已报价
    FinishQuoted = 3,
    // 已结束
    Finish = 4,

}

export const StatusTypeMap = {
    [EnumStatusType.Wait]: '未开始',
    [EnumStatusType.WaitQuoted]: '待报价',
    [EnumStatusType.FinishQuoted]: '已报价',
    [EnumStatusType.Finish]: '已结束',
}

export const StatusTypeMapList = [
    {
        label: StatusTypeMap[EnumStatusType.Wait],
        value: EnumStatusType.Wait
    },
    {
        label: StatusTypeMap[EnumStatusType.WaitQuoted],
        value: EnumStatusType.WaitQuoted
    },
    {
        label: StatusTypeMap[EnumStatusType.FinishQuoted],
        value: EnumStatusType.FinishQuoted
    },
    {
        label: StatusTypeMap[EnumStatusType.Finish],
        value: EnumStatusType.Finish
    },
]