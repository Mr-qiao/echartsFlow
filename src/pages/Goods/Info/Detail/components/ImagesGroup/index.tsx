import React, { useEffect, useRef, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Image } from 'antd';

import { DEFAULT_IMG_SRC } from '@/constants';

import ss from './index.less';

interface IProps {
  images: string[] | string;
}

const ImagesGroup: React.FC<IProps> = ({ images }) => {
  const [previewImg, setPreviewImg] = useState<string>();
  const [groupImg, setGroupImg] = useState<string[]>([]);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const scrollDomEl = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timer>();
  //点击展示
  const handlePreview = (src: string) => {
    if (src === previewImg) {
      return;
    }

    setPreviewImg(src);
  };
  const handleMove = (type) => {
    if (type === 'up') {
      scrollDomEl.current?.scrollBy(0, -10);
    } else {
      scrollDomEl.current?.scrollBy(0, 10);
    }
  };
  //上移
  const handleUpMove = (e) => {
    e.preventDefault();
    // scrollDomEl.current?.scrollTop = 10;

    timerRef.current = setInterval(() => {
      scrollDomEl.current?.scrollBy(0, -10);
    }, 20);
  };
  //下移
  const handleDownMove = (e) => {
    e.preventDefault();
    timerRef.current = setInterval(() => {
      scrollDomEl.current?.scrollBy(0, 10);
    }, 20);
  };
  // 清除
  const handleClearTime = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  useEffect(() => {
    if (Array.isArray(images)) {
      setGroupImg(images);
      setPreviewImg(images[0]);
      setIsScroll(!!(images.length > 4));
      return;
    }
    if (typeof images === 'string' && images) {
      setGroupImg([images]);
      setPreviewImg(images);
      setIsScroll(false);
      return;
    }
  }, [images]);

  return (
    <div className={ss['detail__main-img']}>
      <Image
        width={196}
        height={196}
        src={previewImg}
        preview={true}
        fallback={DEFAULT_IMG_SRC}
        placeholder={true}
      />

      <div className={ss['main-img__group']}>
        {isScroll && (
          <div
            className={ss['main-img__group-pre']}
            onClick={handleMove.bind(null, 'up')}
            onMouseDown={handleUpMove}
            onMouseUp={handleClearTime}
          >
            <UpOutlined />
          </div>
        )}
        <div
          className={ss['main-img__group-content']}
          ref={scrollDomEl}
          style={isScroll ? { overflowY: 'auto', height: 156 } : { height: 196 }}
        >
          {groupImg?.map((item, i) => {
            return (
              <Image
                key={i}
                width={40}
                height={40}
                src={item}
                onClick={handlePreview.bind(null, item)}
                preview={false}
                fallback={DEFAULT_IMG_SRC}
                placeholder={true}
                style={item === previewImg ? { border: '1px solid #86909c' } : {}}
              />
            );
          })}
        </div>
        {isScroll && (
          <div
            className={ss['main-img__group-next']}
            onClick={handleMove.bind(null, 'down')}
            onMouseDown={handleDownMove}
            onMouseUp={handleClearTime}
          >
            <DownOutlined />
          </div>
        )}
      </div>
    </div>
  );
};
export default ImagesGroup;
