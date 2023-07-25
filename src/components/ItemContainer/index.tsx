import { Descriptions, DescriptionsProps, ImageProps } from 'antd';

import Image from '@/components/Image';

interface IProps extends DescriptionsProps {
  options: { label: any, value: any }[];
  images?: string[] | string;
  imagesProps?: ImageProps;
  imageRender?: React.ReactNode;
}
const ItemContainer = ({ options, images, imageRender, imagesProps, ...props }: IProps) => {
  const descElem = (
    <Descriptions
      column={1}
      labelStyle={{ flexShrink: 0 }}
      contentStyle={{ flex: 1, width: 0 }}
      size={'small'}
      {...props}
    >
      {options?.map((item, idx) => (
        <Descriptions.Item
          key={idx}
          span={1}
          label={item.label}
          labelStyle={{ color: 'var(--text-color-sub)' }}
          contentStyle={{ color: 'var(--text-color-main)' }}
        >
          {item.value || '-'}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );

  return !(images === null || images === undefined) || imageRender ? (
    <div className="u-flex u-mb5">
      <div style={{ flexShrink: 0 }} className="u-mr10">
        {imageRender ? (
          imageRender
        ) : (
          <Image
            src={
              typeof images === 'string'
                ? images
                : Array.isArray(images) && images.length > 0
                  ? images[0]
                  : ''
            }
            {...(Array.isArray(images) && images.length > 0 && { previewGroup: images })}
            width={80}
            height={80}
            {...imagesProps}
          ></Image>
        )}
      </div>
      <div>{descElem}</div>
    </div>
  ) : (
    descElem
  );
};
export default ItemContainer;
