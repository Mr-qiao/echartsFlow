import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { uploadPicture } from '@/services/loginRegister';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return true;
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
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image
            width={100}
            height={100}
            src={imageUrl}
            alt="avatar"
            style={{ width: '100%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default ImgUpload;
