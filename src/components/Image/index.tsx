/**
 * @file 图片
 */
import { Image as AntdImage, ImageProps } from 'antd';

import { DEFAULT_IMG_SRC } from '@/constants';

// 组件内部未维护状态，组件状态必须受控
const Image: React.FC<ImageProps> = ({ ...rest }) => {
  return <AntdImage fallback={DEFAULT_IMG_SRC} {...rest} />;
};

export default Image;
