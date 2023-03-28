import { Image, message, Upload } from 'antd';
import { UploadFile } from 'antd/es/upload';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { getSignature } from '@/services/common';
import { uuid } from '@/utils';

interface UploadFileEx extends UploadFile {
  url?: any;
}
interface UploadType {
  width?: any;
  value?: any;
  uploadButton?: any;
  size: number; //大小
  onUpload?: any;
  maxCount: number; //上传个数
  disabled?: boolean;
  ajax?: () => any; //请求方法 return promise ，非必穿
  onChange?: (any) => void;
}
function PicturesWall({ onChange, value, uploadButton, size, maxCount, onUpload, ...otherProps }: UploadType) {
  let [previewVisible, setPreviewVisible] = useState(false);
  let [previewImage, setPreviewImage] = useState('');
  let [fileList, setFileList] = useState<any[]>([]);
  const [dataCatch, setDataCatch] = useState({});

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFileEx) => {
    // let img = fileList.filter((item: any) => file.uid === item.uid)[0];
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj as RcFile);
    // }

    // setPreviewImage(file.url || (file.preview as string));
    setPreviewImage(file?.url || file?.url);
    setPreviewVisible(true);
  };

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  // const handleupload = ({ file }) => {
  //   if (!beforeUpload(file)) {
  //     return;
  //   }
  //   let _request = ajax || Api.Common.Upload;
  //   _request(
  //     { file: file, fileType: 0 },
  //     {
  //       upload: true,
  //       isFile: true,
  //     },
  //   ).then(({ data }) => {
  //     let _ = [...fileList, { url: data?.url, uid: file.uid, name: file.name, status: 'done' }];
  //     setFileList(_);
  //     triggerChange(_);
  //     onUpload?.(_);
  //   });
  //   return;
  //   getBase64(file, (imageUrl) => {
  //     Api.Common.Upload({ image: imageUrl, fileName: file.name, fileType: 0 }, { upload: true }).then(({ data }) => {
  //       setFileList(data.url);
  //       triggerChange(data.url);
  //     });
  //   });
  // };

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

    const name = `${Juicer(fileNameKeys, fileNameData)}${fileSuffix}`.replace(/\s+/g, '_').replace(/\?+/g, '');

    return new Promise((resolve) => {
      const data = {
        typeCode: 'SUPPLY_ADMIN_IMAGE_UPLOAD',
        resourceName: name,
        createTask: false,
        operator: employeeId,
      };
      getSignature(data, {})
        .then(({ entry }: any) => {
          const { uid } = file;

          const url = `${entry.host}/${entry.key}`;
          setDataCatch({
            ...dataCatch,
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
              url: encodeURI(url),
              fileSuffix: fileSuffix.toLocaleLowerCase().split('.')[1] ?? '',
            },
          });

          setTimeout(() => {
            resolve(entry.host);
          }, 100);
        })
        .catch(() => {
          message.error('验签失败！');
        });
    });
  };

  const handleChange = ({ file, fileList }) => {
    let _ = [...fileList];
    _.map((item) => {
      // if()
      console.log();
      if (dataCatch[item.uid] as 'url') {
        item.url = dataCatch[item.uid]?.url;
      }
      return item;
    });
    setFileList(_);

    if (file.status === 'removed') {
      let _ = fileList.filter((item) => item.uid !== file.uid);
      setFileList(_);
      triggerChange(_);
      onUpload?.(_);
    }
    if (file.status === 'done') {
      triggerChange(_);
      onUpload?.(_);
    }

    // console.log(file);
  };

  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        let fileListStr = fileList.map((o) => o.url);
        if (fileListStr.toString() !== value.toString()) {
          let _ = value?.map((item) => {
            if (typeof item !== 'object') {
              return { url: item, uid: uuid(), name: new Date().getTime(), status: 'done' };
            } else {
              return item;
            }
          });
          setFileList(_);
        }
      } else {
        setFileList([{ url: value, uid: uuid(), name: new Date().getTime(), status: 'done' }]);
      }
    }
    return () => {};
  }, [value]);

  async function beforeUpload(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('请上传 JPG/PNG 文件!');
        reject();
        return;
      }

      const isLt2M = file.size / 1024 / 1024 < size;
      if (!isLt2M) {
        message.error(`上传图片请小于${size}M!`);
        reject();
        return;
      }
      const isCount = fileList.length < maxCount;
      if (!isCount) {
        message.error(`最多上传${maxCount}个文件`);
        reject();
        return;
      }
      resolve(file);
      return;
    });
  }

  return (
    <div className="clearfix">
      {fileList.length >= maxCount}
      <Upload
        action={getAction}
        data={(file: any) => dataCatch[file.uid]?.data}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        // data={{ imgType: 1 }}
        // name={'image'}
        // withCredentials={true}
        // customRequest={handleupload}

        beforeUpload={beforeUpload}
        disabled={otherProps.disabled ? true : false}
        // customRequest={handleupload}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Image
        alt="example"
        style={{ display: 'none' }}
        src={previewImage}
        preview={{
          visible: previewVisible,
          src: previewImage,
          onVisibleChange: handleCancel,
        }}
      />
    </div>
  );
}

PicturesWall.propTypes = {
  ajax: PropTypes.func, //请求方法 return promise ，非必穿
  onUpload: PropTypes.func, //上传回调，非必穿
  maxCount: PropTypes.number, //上传个数
};
PicturesWall.defaultProps = {
  maxCount: 3, //上传个数
  size: 10,
  uploadButton: (
    <div>
      <div className="ant-upload-text">上传图片</div>
    </div>
  ),
};
export default PicturesWall;

function Juicer(v: string, data: any) {
  let t: string = v;
  Object.keys(data).forEach((key: any) => {
    t = t.replace(new RegExp(`\\{${key}\\}`, 'gm'), data[key]);
  });
  return t;
}
