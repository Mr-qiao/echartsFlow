import { Drawer, DrawerProps } from '@xlion/component';
import React, { useState } from 'react';

export interface IProps extends DrawerProps {
  className?: string;
  children?: any;
  onConfirm?: () => any;
  onCancel?: (close: () => any) => any;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  width?: any;
  // loading?: boolean;
}

const DrawerModal = React.forwardRef((props: IProps, ref) => {
  const [isHide, setIsHide] = useState(false);
  const { className, children, title, onCancel, maskClosable, destroyOnClose, ...propsOther } =
    props;

  const _hide = () => {
    setIsHide(false);
  };
  const _show = () => {
    setIsHide(true);
  };
  React.useImperativeHandle(ref, () => ({
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

  return (
    <Drawer
      className={`c-dialog ${className || ''}`}
      maskClosable={maskClosable}
      title={title}
      open={isHide}
      onClose={handleCancel}
      destroyOnClose={destroyOnClose}
      {...propsOther}
    >
      <div className="c-dialog__body">{children}</div>
    </Drawer>
  );
});
DrawerModal.defaultProps = {
  className: '',
  title: '信息',
  maskClosable: true,
  destroyOnClose: true,
};
export default DrawerModal;
