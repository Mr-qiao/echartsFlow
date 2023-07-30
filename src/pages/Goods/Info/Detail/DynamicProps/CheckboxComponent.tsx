//多选
import { useMemo } from 'react';
import { Popover, Space, Tag, Typography } from '@xlion/component';

const maxCount = 4;

export const CheckboxComponent = ({ value }: { value: string }) => {
  const dataSource = useMemo(() => {
    return value ? value.split(',') : [];
  }, [value]);
  const tagRender = (item) => {
    return (
      <Tag key={item}>
        <Typography.Text ellipsis={{ tooltip: true }} style={{ maxWidth: 100 }}>
          {item}
        </Typography.Text>
      </Tag>
    );
  };
  return (
    <Space>
      {dataSource?.length > 0
        ? dataSource
          ?.slice(0, maxCount)
          ?.map((item) => tagRender(item))
          .concat(
            dataSource?.length > maxCount
              ? [
                <Popover
                  key="more"
                  placement="top"
                  content={
                    <Space wrap size={[4, 8]} style={{ width: 300 }}>
                      {dataSource?.map((item) => tagRender(item))}
                    </Space>
                  }
                  trigger="click"
                >
                  <span className="t-c__blue u-fs12">共{dataSource.length || 0}个</span>
                </Popover>,
              ]
              : [],
          )
        : '-'}
    </Space>
  );
};
