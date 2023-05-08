export type TabList = Array<{
  key: string | number; // 下标
  label: string; // 名称
  value?: undefined | string; // 定义枚举 根据枚举进行策略模式
  count?: undefined | number; // 枚举查询
}>;
