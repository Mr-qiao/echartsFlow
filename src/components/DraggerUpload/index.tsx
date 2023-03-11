import React, { useState, useRef, useEffect } from 'react';
import { getSignature } from '@/services/common';
import { message, Upload } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { uuid } from '@/utils';
import styles from './index.less';
export default function Index(props) {
  // 5M
  const {
    size = 200,
    maxLen = 1,
    onChange = () => {},
    value = '',
    showFileName = false,
  } = props;
  const { Dragger } = Upload;

  const [fileList, setFileList] = useState([]);
  const [dataCatch, setDataCatch] = useState({});

  useEffect(() => {
    if (value) {
      if (typeof value === 'object') {
        setFileList([value]);
        return;
      }
      const list = value
        .split(',')
        .map((item) => ({ url: item, uid: uuid(), status: 'done' }));
      setFileList(list);
    }
  }, [value]);

  function Juicer(v: string, data: any) {
    let t: string = v;
    Object.keys(data).forEach((key: any) => {
      t = t.replace(new RegExp(`\\{${key}\\}`, 'gm'), data[key]);
    });
    return t;
  }

  // 上传前检测
  const beforeUpload = async (file: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const num: number = fileList.length;
      if (num >= maxLen) {
        message.warning(`最多上传${maxLen}个文件`);
        reject();
      } else {
        // 文件大小检测
        if (file.size / 1024 / 1024 > size) {
          message.warning(`上传文件大于${size}M，请重试！`);
          reject();
          return;
        }
        resolve(file);
      }
    });
  };

  const handleFileList = (file, fileList) => {
    const list = [...fileList];
    if (file.status === 'done') {
      const index = list.findIndex((item) => item.uid === file.uid);
      list[index] = {
        ...file,
        url: dataCatch[file.uid].imgUrl,
        resourceId: dataCatch[file.uid].resourceId,
      };
      setFileList(list);
    }
    const findFile = list.find((item) => item?.uid === file?.uid);
    if (file.status === 'done' || file.status === 'removed') {
      if (!showFileName) {
        onChange(list.map((item) => item.url).join(','), { file });
      } else {
        onChange(findFile);
      }
    }
  };

  const getAction = async (file: any): Promise<any> => {
    const employeeId = '123';
    const fileNameKeys = '{name}_{hash}_hash';

    const fname = file.name;
    const fileSuffix: string = fname.substr(fname.lastIndexOf('.'));
    const fileName: string = fname.substr(0, fname.lastIndexOf('.'));

    const fileNameData = {
      hash: uuid(),
      name: fileName,
    };

    const name = `${Juicer(fileNameKeys, fileNameData)}${fileSuffix}`
      .replace(/\s+/g, '_')
      .replace(/\?+/g, '');

    return new Promise((resolve) => {
      const data = {
        typeCode: 'SUPPLY_ADMIN_IMAGE_UPLOAD',
        resourceName: name,
        createTask: false,
        operator: employeeId,
      };
      getSignature(data)
        .then(({ entry }: any) => {
          const { uid } = file;

          const imgUrl = `https://${
            entry.host.includes('test.') ? 'test-' : ''
          }static.xinc818.com/${entry.key}`;
          setDataCatch(() => {
            return {
              [uid]: {
                data: {
                  key: entry.key,
                  policy: entry.policy,
                  OSSAccessKeyId: entry.accessId,
                  success_action_status: '200',
                  Signature: entry.signature,
                },
                resourceId: entry.resourceId,
                fileNameData,
                imgUrl: encodeURI(imgUrl),
                fileSuffix: fileSuffix.toLocaleLowerCase().split('.')[1] ?? '',
              },
            };
          });

          setTimeout(() => {
            resolve(entry.host);
          }, 100);
        })
        .catch((err) => {
          message.error('验签失败！');
        });
    });
  };

  const uploadProps = {
    fileList: fileList,
    multiple: false,
    data: (file: any) => dataCatch[file.uid]?.data,
    name: 'file',
    multiple: false,
    beforeUpload: beforeUpload,
    action: getAction,
    onChange({ file, fileList }) {
      setFileList(fileList);
      handleFileList(file, fileList);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onRemove: (file) => {},
  };

  console.log('---props fileList--------', fileList);

  return (
    <Dragger className={styles.draggerUpload} {...uploadProps}>
      <p className="ant-upload-text">
        <FileExcelOutlined style={{ color: '#666', fontSize: '24px' }} />
      </p>
      <p className="ant-upload-hint">
        点击或将文件拖拽至这里上传
        <br />
        支持扩展名xlsx
      </p>
    </Dragger>
  );
}
