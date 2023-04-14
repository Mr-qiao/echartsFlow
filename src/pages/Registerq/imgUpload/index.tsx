import { uploadPicture } from '@/services/loginRegister';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, message, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传jpg或png格式的图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('最大长传5m');
  }
  return isJpgOrPng && isLt2M;
};

const ImgUpload: React.FC = (props: any) => {
  const { onChange, value = '' } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleChange: UploadProps['onChange'] = (info: any) => {
    uploadPicture({ file: info.file.originFileObj }).then((res) => {
      setImageUrl(res.entry?.ossUrl);
      onChange(res.entry?.ossUrl);
    });
  };
  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      {imageUrl ? (
        <div style={{ marginRight: 10 }}>
          <Image
            width={100}
            height={100}
            src={imageUrl}
            alt="avatar"
            style={{ width: '100%' }}
          />
        </div>
      ) : null}
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        accept={'image/png, image/jpeg'}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

export default ImgUpload;
