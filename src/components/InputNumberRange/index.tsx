import { useState } from 'react';

import { InputNumber, InputNumberProps } from 'antd';

interface IProps {
  value?: number[];
  onChange?: (value: number[]) => void;
  minProps?: InputNumberProps;
  maxProps?: InputNumberProps;
}
const InputNumberRange: React.FC<IProps> = ({ value = [], onChange, minProps, maxProps }: any) => {
  let [minValue, setMin] = useState(value?.[0]);
  let [maxValue, setMax] = useState(value?.[1]);

  // useEffect(() => {
  //   console.log(value);
  //   setMin(value[0] ? value[0] : '');
  //   setMax(value[1] ? value[1] : '');
  // }, [value]);

  return (
    <>
      <InputNumber
        placeholder="最小值"
        style={{ width: 120 }}
        precision={0}
        {...minProps}
        onChange={(v: any) => {
          setMin(v);
          onChange?.([v, maxValue]);
        }}
        value={minValue}
      />
      &nbsp;<span>-</span>&nbsp;
      <InputNumber
        placeholder="最大值"
        style={{ width: 120 }}
        precision={0}
        {...maxProps}
        onChange={(v: any) => {
          setMax(v);
          onChange?.([minValue, v]);
        }}
        value={maxValue}
      />
    </>
  );
};
export default InputNumberRange;
