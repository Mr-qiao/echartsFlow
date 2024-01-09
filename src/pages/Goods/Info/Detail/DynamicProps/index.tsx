import { Descriptions, Typography } from 'antd';
import React from 'react';

import ImageContainer from '@/components/ImageContainer';
import { transformFen2Yuan } from '@/utils';
import { math } from '@xlion/utils';
import { ATTR_TYPE } from '../constants';
import { IPropsType } from '../types';

import { CheckboxComponent } from './CheckboxComponent';
import { FilesComponent } from './FilesComponent';

type IProps = IPropsType;

const DynamicProps: React.FC<IProps> = ({ itemPropertyType, ...info }) => {
  const renderFormItem = () => {
    const { itemPropertyValues } = info;
    const value = itemPropertyValues || '';
    switch (itemPropertyType) {
      //文本 --------
      // case ATTR_TYPE.TEXT:
      //   break;
      //多行文本 --------
      // case ATTR_TYPE.TEXTAREA:
      //   break;
      //金额 --------
      case ATTR_TYPE.NUMBER_PRICE:
        return (
          <Typography.Text
            ellipsis={{
              tooltip:
                info.unit && info.unit === '元'
                  ? transformFen2Yuan(info, ['itemPropertyValues'], false, 1000)
                    .itemPropertyValues
                  : value,
            }}
          >
            {info.unit && info.unit === '元'
              ? transformFen2Yuan(info, ['itemPropertyValues'], false, 1000)
                .itemPropertyValues
              : value}
            {info.unit ? info.unit : ''}
          </Typography.Text>
        );
      //百分比 --------
      case ATTR_TYPE.NUMBER_RATE:
        return (
          <Typography.Text>
            {value ? math.div(value, 100) + '%' : '-'}
          </Typography.Text>
        );
      //单选 --------
      // case ATTR_TYPE.RADIO:
      //   break;
      //多选 --------
      case ATTR_TYPE.CHECKBOX:
        return <CheckboxComponent value={value} />;
      //数值 --------
      // case ATTR_TYPE.NUMBER:
      // break;
      //数值区间 --------
      case ATTR_TYPE.NUMBER_RANGE:
        return (
          <Typography.Text
            ellipsis={{
              tooltip:
                value?.replace(',', ' - ') + (info.unit ? info.unit : ''),
            }}
          >
            {value?.replace(',', ' - ') + (info.unit ? info.unit : '')}
          </Typography.Text>
        );
      //日期 --------
      // case ATTR_TYPE.DATE:
      //   break;
      //日期区间 --------
      case ATTR_TYPE.DATE_RANGE:
        return (
          <Typography.Text ellipsis={{ tooltip: value?.replace(',', ' - ') }}>
            {value?.replace(',', ' - ')}
          </Typography.Text>
        );
      //单图片 --------
      case ATTR_TYPE.IMAGE:
        console.log(
          value,
          value?.split(','),
          itemPropertyType,
          '----=====-=---==',
        );
        return value ? (
          <ImageContainer src={value?.split(',')} showCount={3} />
        ) : (
          '-'
        );
      //多图 --------
      case ATTR_TYPE.IMAGE_MULTIPLE:
        return value ? (
          <ImageContainer src={value?.split(',')} showCount={3} />
        ) : (
          '-'
        );
      //文件 --------
      case ATTR_TYPE.FILE:
        return <FilesComponent value={value} />;
      //链接 --------
      case ATTR_TYPE.LINK:
        return (
          <Typography.Text
            className={value ? 'u-c__blue' : ''}
            ellipsis={{ tooltip: true }}
            copyable={value ? true : false}
          >
            {value || '-'}
          </Typography.Text>
        );

      default:
        return (
          <Typography.Text
            ellipsis={{ tooltip: value + (info.unit ? info.unit : '') }}
          >
            {value || '-' + (info.unit ? info.unit : '')}
          </Typography.Text>
        );
    }
  };

  return (
    <Descriptions.Item label={info.itemPropertyName || '-'}>
      {renderFormItem()}
    </Descriptions.Item>
  );
};

export default DynamicProps;
