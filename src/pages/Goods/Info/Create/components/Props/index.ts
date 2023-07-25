import type { FormRule } from 'antd';

import { ATTR_TYPE } from '../../constants';
import { IPropsType, RuleType } from '../../types';

import { default as CascaderCpt, rules as cascaderRules } from './CascaderCpt';
import { default as DateCpt, rules as dateRules } from './DateCpt';
import { default as DateRangeCpt, rules as dateRangeRules } from './DateRangeCpt';
import { default as FileCpt, rules as fileRules } from './FileCpt';
import { default as ImageCpt, rules as imageRules } from './ImageCpt';
import { default as ImageMultipleCpt, rules as imageMultipleRules } from './ImageMultipleCpt';
import { default as LinkCpt, rules as linkRules } from './LinkCpt';
import { default as NumberCpt, rules as numberRules } from './NumberCpt';
import { default as NumberPriceCpt, rules as numberPriceRules } from './NumberPriceCpt';
import { default as NumberRangeCpt, rules as numberRangeRules } from './NumberRangeCpt';
import { default as NumberRateCpt, rules as numberRateRules } from './NumberRateCpt';
import { default as SelectCpt, rules as selectRules } from './SelectCpt';
import { default as TextAreaCpt, rules as textAreaRules } from './TextAreaCpt';
import { default as TextCpt, rules as textRules } from './TextCpt';

interface IProps {
  Component: React.FC<IPropsType>;
  rules: (rule: RuleType, label: string) => FormRule[];
}
export default function renderProps(type: ATTR_TYPE): IProps {
  return {
    [ATTR_TYPE.TEXT]: { Component: TextCpt, rules: textRules },
    [ATTR_TYPE.TEXTAREA]: { Component: TextAreaCpt, rules: textAreaRules },
    [ATTR_TYPE.NUMBER_PRICE]: { Component: NumberPriceCpt, rules: numberPriceRules },
    [ATTR_TYPE.NUMBER_RATE]: { Component: NumberRateCpt, rules: numberRateRules },
    [ATTR_TYPE.RADIO]: { Component: SelectCpt, rules: selectRules },
    [ATTR_TYPE.CHECKBOX]: { Component: CascaderCpt, rules: cascaderRules },
    [ATTR_TYPE.NUMBER]: { Component: NumberCpt, rules: numberRules },
    [ATTR_TYPE.NUMBER_RANGE]: { Component: NumberRangeCpt, rules: numberRangeRules },
    [ATTR_TYPE.DATE]: { Component: DateCpt, rules: dateRules },
    [ATTR_TYPE.DATE_RANGE]: { Component: DateRangeCpt, rules: dateRangeRules },
    [ATTR_TYPE.IMAGE]: { Component: ImageCpt, rules: imageRules },
    [ATTR_TYPE.IMAGE_MULTIPLE]: { Component: ImageMultipleCpt, rules: imageMultipleRules },
    [ATTR_TYPE.FILE]: { Component: FileCpt, rules: fileRules },
    [ATTR_TYPE.LINK]: { Component: LinkCpt, rules: linkRules },
  }[type];
}
