import { transformFen2Yuan } from '@/utils';

export const formatPriceRange = (priceRange: { left: number; right: number }) => {
  const { left, right } = transformFen2Yuan(priceRange, ['left', 'right']);
  if (left === undefined && right !== undefined) {
    return right ? `${right}元` : '-';
  }
  return left && right ? [left, right].join('-') + '元' : '-';
};

export const formatRatioRange = (priceRange: { left: number; right: number }) => {
  const { left, right } = transformFen2Yuan(priceRange, ['left', 'right'], false, 100);
  if (left === undefined && right !== undefined) {
    return right ? `${right}%` : '-';
  }
  return left && right ? [left, right].join('-') + '%' : '-';
};
