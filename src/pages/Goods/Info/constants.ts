

// 商品类型
enum Shop_ENUM {
  // 0 - 成衣款 1 - 设计师款
  CLOTHES = 0,
  DESIGNER = 1
}

export const SHOETREE = [
  {
    value: Shop_ENUM.CLOTHES,
    label: '成衣款'
  },
  {
    value: Shop_ENUM.DESIGNER,
    label: '设计师款'
  }
]
