/**
 * @file 图样附图
 */
import { Button, Form, Input } from 'antd';
import { pick } from 'lodash-es';
import { useEffect } from 'react';

import Upload from '@/components/Upload';

import ss from '../../index.less';
import { IStepProps } from '../../types';

const FormItem = Form.Item;

const PatternAttachment: React.FC<IStepProps> = ({ proofInfo, onOk }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    const values = form.getFieldsValue(); // 为了获取表单有哪些key
    const data = pick(proofInfo, Object.keys(values));
    form.setFieldsValue({
      ...data,
      accessoryImages: data.accessoryImages?.map((url: string) => ({ url })) || [],
    });
  }, [proofInfo]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
        accessoryImages: values.accessoryImages.map((item: any) => item.url),
        accessoryFiles: values.accessoryFiles.map((item: any) => ({
          name: item.name,
          url: item.url,
        })),
      };
      onOk(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ style: { width: 100 } }}
      initialValues={{
        accessoryImages: [],
        accessoryFiles: [],
        accessoryRemark: '',
      }}
    >
      <FormItem label="图片附件" name="accessoryImages">
        <Upload listType="picture-card" maxCount={6} />
      </FormItem>
      <FormItem label="其他附件" name="accessoryFiles">
        <Upload maxCount={6} />
      </FormItem>
      <FormItem label="备注" name="accessoryRemark">
        <Input.TextArea rows={3} showCount maxLength={500} />
      </FormItem>

      <div className={ss.footer}>
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
      </div>
    </Form>
  );
};

export default PatternAttachment;
