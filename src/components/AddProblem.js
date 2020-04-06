import React, { useState } from 'react';
import { Modal, Input, InputNumber } from 'antd';
import _ from 'lodash';

function AddProblem(props) {

  const [url, setUrl] = useState('');
  const [runTime, setRunTime] = useState(0);
  const [memory, setMemory] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const onUrlChange = _.debounce((val) => {
    console.log(val)
    setUrl(val);
  }, 500);

  const onRunTimeInputChange = (val) => {
    setRunTime(val);
  };

  const onMemoryInputChange = (val) => {
    setMemory(val);
  };

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      console.log(runTime, memory)
      setLoading(false);
      props.setVisible(false);
    }, 2000);
  };

  return (
    <Modal
      title="Add Leetcode Problem"
      centered
      visible={props.visible}
      onOk={() => onSubmit()}
      confirmLoading={loading}
      onCancel={() => props.setVisible(false)}
    >
      <div className="modal__link">
        <Input 
          onChange={(e) => onUrlChange(e.target.value)}
        />
      </div>
      <div className="modal__stats">
        <div className="modal__stats--run-time">
          <InputNumber
            defaultValue={0}
            min={0}
            formatter={value => `${value}ms`}
            parser={value => value.replace('ms', '')}
            onChange={_.debounce(onRunTimeInputChange, 700)}
          />
        </div>
        <div className="modal__stats--memory">
          <InputNumber
            defaultValue={0}
            min={0}
            formatter={value => `${value}MB`}
            parser={value => value.replace('MB', '')}
            onChange={_.debounce(onMemoryInputChange, 700)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddProblem;