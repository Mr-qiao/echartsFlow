/**
 * @file 图片
 */
import { useState } from 'react';

import { Image, ImageProps, Space } from 'antd';
import { Omit } from 'lodash';

import { DEFAULT_IMG_SRC } from '@/constants';

interface IPorps extends Omit<ImageProps, 'src'> {
  src: string[];
  showCount: number;
}
// 组件内部未维护状态，组件状态必须受控
const ImageContainer: React.FC<IPorps> = ({ src, showCount, ...rest }) => {
  const [visible, setVisible] = useState<boolean>();
  const [previewCurrent, setPreviewCurrent] = useState<number>(0);

  return (
    <>
      <Space>
        {src?.map((item, idx) => {
          if (idx + 1 > showCount) {
            return '';
          }
          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                cursor: 'pointer',
                background: '#D4D4D4',
              }}
            >
              <Image
                width={50}
                height={50}
                {...rest}
                fallback={DEFAULT_IMG_SRC}
                src={item ? item : ''}
                preview={!(src && src?.length > 0)}
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(true);
                  setPreviewCurrent(idx);
                }}
              />

              {idx + 1 === showCount && (
                <div
                  className="u-fs14 u-f__center"
                  style={{
                    background: 'rgba(0,0,0,.3)',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    color: '#fff',
                    pointerEvents: 'none',
                  }}
                >
                  共 {src.length} 张
                </div>
              )}
            </div>
          );
        })}
      </Space>
      {src && src.length > 0 && (
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup
            preview={{
              visible,
              current: previewCurrent,
              onVisibleChange: (vis) => setVisible(vis),
            }}
          >
            {src?.map((item, i) => (
              <Image src={item} key={i} />
            ))}
          </Image.PreviewGroup>
        </div>
      )}
    </>
  );
};
ImageContainer.defaultProps = {
  showCount: 3,
};
export default ImageContainer;
