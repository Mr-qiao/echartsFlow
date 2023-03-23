import './index.less';

import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Progress } from 'antd';

interface IProps {
  disabled?: boolean;
  percent?: number | null;
  url?: string;
  onRemove?: () => void;
}

const Thumbnail: React.FC<IProps> = ({ disabled, percent, url, onRemove }) => {
  const cls = (name?: string) => {
    if (name === undefined) {
      return 'thumbnail';
    }
    return `thumbnail-${name}`;
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className={cls()}>
      {url ? (
        <div className={cls('preview')} style={{ backgroundImage: url ? `url(${url})` : 'none' }}>
          {!disabled ? (
            <div className={cls('mask')}>
              <DeleteFilled onClick={handleRemove} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className={cls('select')}>
          {percent !== null && percent !== undefined ? (
            <Progress size="small" strokeColor="#FF7D00" percent={percent} showInfo={false} />
          ) : (
            <PlusOutlined />
          )}
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
