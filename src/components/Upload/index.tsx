/**
 * @file 上传组件
 */
import './index.less';

import { UploadOutlined } from '@ant-design/icons';
import { uuid } from '@xlion/utils';
import { Button, message, Upload as XUpload, UploadProps } from 'antd';
import { UploadFile } from 'antd/dist/upload'
import { useMemo, useRef } from 'react';

import { getSignature } from '@/services/common';

import Thumbnail from '../Thumbnail';

const { AntdUpload } = XUpload

type OSSDataType = {
  key: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
  callback: string;
};

interface AliyunOSSUploadProps extends Omit<UploadProps, 'onChange' | 'multiple' | 'listType' | 'fileList'> {
  value?: UploadFile[];
  listType?: 'picture-card' | 'text';
  size?: number;
  tip?: boolean | string;
  onChange?: (fileList: UploadFile[]) => void;
}

const noop = () => { };
const formatValue = (value: UploadFile[]) => {
  return value.map((item) => {
    if (typeof item === 'string') {
      return {
        uid: uuid(),
        name: (item as string)?.split('/').pop(),
        url: item,
        status: 'done',
      } as UploadFile;
    }

    if (typeof item === 'object' && !item.uid) {
      return {
        ...item,
        name: item.name || item.url?.split('/').pop(),
        uid: uuid(),
      } as UploadFile;
    }

    return item;
  });
};

// 组件内部未维护状态，组件状态必须受控
const Upload: React.FC<AliyunOSSUploadProps> = ({
  value = [],
  listType = 'text',
  accept,
  maxCount = 1,
  size = 5,
  tip,
  onChange,
}) => {
  const fileCountRef = useRef<number>(0);
  // 编辑的时候，服务端返回可能是 string[] 或 Array<{ name: string; url: string }>
  const internalValue = useMemo(() => {
    const formattedVal = formatValue(value);
    fileCountRef.current = formattedVal.length;
    return formattedVal;
  }, [value]);

  const OSSDataMapRef = useRef<Recordable<OSSDataType>>({});

  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    console.log(file, fileList, '哈哈哈哈哈')
    let list = [...fileList];
    const OSSData = OSSDataMapRef.current[file.uid];
    const index = list.findIndex((item) => item.uid === file.uid);
    if (file.status === 'done') {
      list[index] = {
        ...file,
        url: OSSData.host + '/' + OSSData.key,
      };
    }
    // 上传失败，直接移除
    if (file.status === 'removed' || file.status === 'error') {
      list.splice(index, 1);
    }
    // 过滤掉beforeUpload返回reject的文件和上传失败的文件
    list = list.filter((item) => item.status !== 'error');
    onChange?.(list);
  };

  const onRemove = (file: UploadFile) => {
    const files = (internalValue || []).filter((item) => item.url !== file.url);
    onChange?.(files);
  };

  const getAction: UploadProps['action'] = async (file) => {
    try {
      const { entry } = await getSignature({
        createTask: true,
        resourceName: file.name.replace(/[#?]/g, ''),
        typeCode: 'SUPPLY_ADMIN_IMAGE_UPLOAD',
        operator: 124,
      });
      OSSDataMapRef.current = {
        ...OSSDataMapRef.current,
        [file.uid]: {
          key: entry.key,
          expire: entry.expire,
          host: entry.host,
          accessId: entry.accessId,
          policy: entry.policy,
          signature: entry.signature,
          callback: entry.callback,
        },
      };

      return entry.host;
    } catch (err) {
      message.error((err as Error).message || '获取签名失败');
    }
  };

  const getExtraData: UploadProps['data'] = (file) => {
    const OSSData = OSSDataMapRef.current[file.uid];
    return {
      key: OSSData?.key,
      OSSAccessKeyId: OSSData?.accessId,
      policy: OSSData?.policy,
      Signature: OSSData?.signature,
      success_action_status: '200',
    };
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    return new Promise((resolve, reject) => {
      fileCountRef.current = fileCountRef.current + 1;
      // 文件数量检测
      if (maxCount && fileCountRef.current > maxCount) {
        // @ts-ignore
        file.status = 'error';
        message.warning(`最多上传${maxCount}个文件`);
        reject();
      } else if (file.size / 1024 / 1024 > size) {
        // @ts-ignore
        file.status = 'error';
        // 文件大小检测
        message.warning(`上传文件大于${size}M，请重试！`);
        reject();
      } else {
        resolve(file);
      }
    });
  };

  const renderChildren = () => {
    if (listType === 'picture-card') {
      if (value.length >= maxCount) return null;
      return <Thumbnail />;
    }

    return <Button icon={<UploadOutlined />}>上传附件</Button>;
  };

  const recommendAccept = useMemo(() => {
    if (accept) return accept;
    if (listType === 'picture-card') return '.jpg,.jpeg,.png';
    return undefined;
  }, []);

  const renderTip = () => {
    if (tip) {
      return tip;
    }
    const tipArr: string[] = [];
    if (maxCount > 1) {
      tipArr.push(`最多上传${maxCount}个`);
    }
    if (recommendAccept) {
      tipArr.push(
        `支持${recommendAccept
          .split(',')
          .map((t) => (t.startsWith('.') ? t.slice(1) : t))
          .join('、')}格式`,
      );
    }
    if (size) {
      tipArr.push(`文件大小不超过${size}M`);
    }

    return tipArr.join('，');
  };

  return (
    <div>
      <AntdUpload
        name="file"
        fileList={internalValue}
        listType={listType}
        disabled={internalValue.length >= maxCount}
        multiple={maxCount > 1}
        accept={recommendAccept}
        action={getAction}
        onChange={handleChange}
        onRemove={noop}
        data={getExtraData}
        beforeUpload={beforeUpload}
        itemRender={(originNode, file) => {
          if (listType === 'picture-card') {
            return (
              <Thumbnail
                key={file.url || file.uid}
                url={file.url || file.thumbUrl}
                percent={file.percent}
                onRemove={() => onRemove(file)}
              />
            );
          }
          return originNode;
        }}
      >
        {renderChildren()}
      </AntdUpload>
      {tip === false ? null : (
        <div className="upload-tip" style={{ marginTop: listType === 'text' ? 8 : 0 }}>
          {renderTip()}
        </div>
      )}
    </div>
  );
};

export default Upload;
