export type TabList = Array<{
  key: string | number; // 下标
  label: string; // 名称
  value?: undefined | string; // 定义枚举
  count?: undefined | number; // 枚举查询
}>;
