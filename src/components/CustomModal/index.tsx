import './index.less';

import { Modal } from 'antd';
import React, { useImperativeHandle, useState } from 'react';

const CustomModal = React.forwardRef((props: DrawerProps, ref) => {
  const [isHide, setIsHide] = useState(false);
  const {
    className = '',
    children = null,
    onConfirm,
    onCancel,
    title = '信息',
    maskClosable = false,
    destroyOnClose = true,
    ...propsOther
  } = props;

  const _hide = () => {
    setIsHide(false);
  };
  const _show = () => {
    setIsHide(true);
  };
  useImperativeHandle(ref, () => ({
    show: _show,
    hide: _hide,
  }));

  const handleCancel = () => {
    if (onCancel) {
      onCancel(_hide);
    } else {
      _hide();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(_hide);
    } else {
      _hide();
    }
  };
  return (
    <Modal
      className={`c-dialog ${className || ''}`}
      maskClosable={maskClosable}
      title={title}
      open={isHide}
      onOk={handleConfirm}
      onCancel={handleCancel}
      destroyOnClose={destroyOnClose}
      {...propsOther}
    >
      <div className="c-dialog__body">{children}</div>
    </Modal>
  );
});
export interface ModalInstance {
  show: (id?: any) => void;
  hide: () => void;
}
interface DrawerProps {
  className?: string;
  children?: any;
  title?: string;
  width?: number;
  onConfirm?: (close: () => any) => any;
  onCancel?: (close: () => any) => any;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  footer?: any;
}
CustomModal.defaultProps = {
  className: '',
  title: '信息',
  maskClosable: true,
  destroyOnClose: true,
};
export default CustomModal;
