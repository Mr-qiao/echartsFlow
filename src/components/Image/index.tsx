/**
 * @file 图片
 */
import { Image as AntdImage, ImageProps } from 'antd';
import { useState } from 'react';

import { DEFAULT_IMG_SRC } from '@/constants';

interface IPorps extends ImageProps {
  previewGroup?: any[];
}
// 组件内部未维护状态，组件状态必须受控
const Image: React.FC<IPorps> = ({ src, previewGroup, ...rest }) => {
  const [visible, setVisible] = useState<boolean>();
  return (
    <>
      <AntdImage
        fallback={DEFAULT_IMG_SRC}
        src={src ? src : ''}
        preview={!(previewGroup && previewGroup?.length > 0)}
        {...rest}
        onClick={() => setVisible(true)}
      />
      {previewGroup && previewGroup.length > 0 && (
        <div style={{ display: 'none' }}>
          <AntdImage.PreviewGroup
            preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
          >
            {previewGroup?.map((item, i) => (
              <AntdImage src={item} key={i} />
            ))}
          </AntdImage.PreviewGroup>
        </div>
      )}
    </>
  );
};
Image.defaultProps = {
  previewGroup: [],
};
export default Image;
