//附件
import { useMemo } from 'react';
import { LinkOutlined } from '@ant-design/icons';
import { Popover, Typography } from 'antd';

import './index.less';

const maxCount = 4;
export const FilesComponent = ({ value }: { value: string }) => {
  const dataSource = useMemo(() => {
    return value ? value.split(',') : [];
  }, [value]);

  const tagRender = (item) => {
    return (
      <span key={item} className="a-typography__download-wrapper u-f__start u-mb4">
        <LinkOutlined className="u-mr4" />
        <Typography.Text ellipsis={{ tooltip: true }} className="u-pr20">
          {item}
        </Typography.Text>
        <a href={item} download style={{ flexShrink: 0 }} className="a-typography__download u-fs12">
          下载
        </a>
      </span>
    );
  };

  return (
    <>
      {dataSource?.length > 0
        ? dataSource
          ?.slice(0, maxCount)
          ?.map((item) => {
            return tagRender(item);
          })
          .concat(
            dataSource?.length > maxCount
              ? [
                <Popover
                  key="more"
                  placement="top"
                  overlayClassName="detail__popover-wrapper"
                  content={
                    <div className="u-flex u-f__column" style={{ width: 300 }}>
                      {dataSource?.map((item) => tagRender(item))}
                    </div>
                  }
                  trigger="click"
                >
                  <span className="t-c__blue u-fs12">共{dataSource.length || 0}个</span>
                </Popover>,
              ]
              : [],
          )
        : '-'}
    </>
  );
};
