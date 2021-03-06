import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Grid, Input, Radio, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultValue = {
  keywords: '',
  type: 'post',
  content: '',
};

export default function SimpleFormDialog(props) {
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    enquireScreenRegister();
  }, []);

  const enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      setMobile(mobile);
    }, mediaCondition);
  };

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const onOk = () => {
    formRef.current.validateAll((error) => {
      if (error) {
        // show validate error
        return;
      }
      // deal with value

      hideDialog();
    });
  };

  const onFormChange = (value) => {
    setValue(value);
  };

  const simpleFormDialog = {
    ...styles.simpleFormDialog,
  };
  // 响应式处理
  if (isMobile) {
    simpleFormDialog.width = '300px';
  }

  return (
    <IceContainer>
      <Dialog
        className="simple-form-dialog"
        style={simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        title="简单表单"
        {...props}
        onOk={onOk}
        onCancel={hideDialog}
        onClose={hideDialog}
        isFullScreen
        visible={visible}
      >
        <IceFormBinderWrapper
          ref={formRef}
          value={value}
          onChange={onFormChange}
        >
          <div style={styles.dialogContent}>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>关键词</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  name="keywords"
                  required
                  min={2}
                  max={10}
                  message="当前字段必填，且最少 2 个字最多 10 个字"
                >
                  <Input
                    style={styles.input}
                    placeholder="多关键词用英文 , 号分割"
                  />
                </IceFormBinder>
                <IceFormError name="keywords" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col>
                <IceFormBinder name="type">
                  <RadioGroup
                    dataSource={[
                      {
                        value: 'post',
                        label: '文章',
                      },
                      {
                        value: 'video',
                        label: '视频',
                      },
                      {
                        value: 'image',
                        label: '图片',
                      },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col>
                <IceFormBinder name="content">
                  <Input.TextArea
                    style={styles.input}
                    placeholder="请输入详细内容"
                    rows={4}
                  />
                </IceFormBinder>
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>
      </Dialog>
      <Button type="primary" onClick={showDialog}>
        显示 Dialog
      </Button>
    </IceContainer>
  );
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
