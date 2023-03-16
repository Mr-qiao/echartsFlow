import { Image, message, Upload } from 'antd';
import { UploadFile } from 'antd/es/upload';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { getSignature } from '@/services/common';
import { uuid } from '@/utils';
function Juicer(v: string, data: any) {
  let t: string = v;
  Object.keys(data).forEach((key: any) => {
    t = t.replace(new RegExp(`\\{${key}\\}`, 'gm'), data[key]);
  });
  return t;
}

function PicturesWall(props: any) {
  const { onChange, value, uploadButton, size, onUpload } = props;
  let [previewVisible, setPreviewVisible] = useState(false);
  let [previewImage, setPreviewImage] = useState('');
  let [fileList, setFileList] = useState([]);
  const [dataCatch, setDataCatch] = useState({});

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: { imgUrl: string } & UploadFile) => {
    // let img = fileList.filter((item: any) => file.uid === item.uid)[0];
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj as RcFile);
    // }

    // setPreviewImage(file.url || (file.preview as string));
    setPreviewImage(file?.imgUrl);
    setPreviewVisible(true);
  };

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
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
      getSignature(data, {})
        .then(({ entry }: any) => {
          const { uid } = file;

          const imgUrl = `https://${
            entry.host.includes('test.') ? 'test-' : ''
          }static.xinc818.com/${entry.key}`;
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
              imgUrl: encodeURI(imgUrl),
              fileSuffix: fileSuffix.toLocaleLowerCase().split('.')[1] ?? '',
            },
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

  const handleChange = ({ file, fileList }) => {
    let _ = [...fileList];
    _.map((item) => {
      item.imgUrl = dataCatch[item.uid]?.imgUrl;
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
  };

  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        let _ = value.map((item, i) => {
          if (!item.uid) {
            return { url: item, uid: i, name: new Date().getTime() };
          } else {
            return item;
          }
        });
        setFileList(_);
      } else {
        setFileList([
          { url: value, uid: new Date().getTime(), name: new Date().getTime() },
        ]);
      }
    }
    return () => {};
  }, [value]);

  async function beforeUpload(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
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
      const isCount = fileList.length < props.maxCount;
      if (!isCount) {
        message.error(`最多上传${props.maxCount}个文件`);
        reject();
        return;
      }
      resolve(file);
      return;
    });
  }

  return (
    <div className="clearfix">
      {fileList.length >= props.maxCount}
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
        disabled={props.disabled ? true : false}
        // customRequest={handleupload}
      >
        {fileList.length >= props.maxCount ? null : uploadButton}
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
