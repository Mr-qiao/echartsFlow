/* eslint-disable */
import React, { useMemo } from 'react';

import CustomModal from '@/components/CustomModal';
import { Descriptions, ModalProps } from 'antd';
import dynamicProps from '../DynamicProps';
import { IPropsType } from '../types';
import ss from './index.less';

export enum ModalType {
  BASE,
  SKUS,
}
interface IProps extends Omit<ModalProps, 'onOk'> {
  dataSource: IPropsType[];
  type: ModalType;
  onOk?: () => void;
}

export const MoreModal: React.FC<IProps> = ({ dataSource, type, ...rest }) => {
  const props = useMemo(() => {
    return {
      [ModalType.BASE]: {
        title: '更多商品信息',
      },
      [ModalType.SKUS]: {
        title: '更多其他信息',
      },
    }[type];
  }, [type]);

  return (
    <CustomModal
      {...rest}
      title={props.title}
      width={960}
      footer={false}
      destroyOnClose
      className={ss['goods__detail-wrap']}
      style={{ background: 'transparent' }}
      onCancel={() => {
        rest.onCancel?.(null as any);
      }}
    >
      <Descriptions
        className="u-ml20"
        column={2}
        labelStyle={{ flexShrink: 0 }}
        contentStyle={{ flex: 1, width: 0, paddingRight: 20, flexDirection: 'column' }}
      >
        {dataSource?.map((component, i) => {
          return <React.Fragment key={i}>{dynamicProps(component)}</React.Fragment>;
        })}
      </Descriptions>
    </CustomModal>
  );
};
