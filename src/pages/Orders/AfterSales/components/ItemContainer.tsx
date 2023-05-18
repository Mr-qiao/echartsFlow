import { Descriptions, DescriptionsProps } from 'antd';

interface IProps extends DescriptionsProps {
  options: any;
}
const ItemContainer = ({ options, ...props }: IProps) => {
  return (
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
          label={item.label}
          labelStyle={{ color: 'var(--text-color-sub)' }}
          contentStyle={{ color: 'var(--text-color-main)' }}
        >
          {item.value || '-'}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};
export default ItemContainer;
