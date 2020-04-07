import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, InputNumber } from 'antd';

import { addNewProblem } from '../modules/actions';

function AddProblem(props) {

  const [url, setUrl] = useState('');
  const [runTime, setRunTime] = useState(0);
  const [memory, setMemory] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const onUrlChange = (val) => {
    const rootURL = 'https://leetcode.com/problems/'
    if (val.slice(0, 30) !== rootURL) {
      alert('Invalid URL: Please paste a valid Leetcode problem URL.');
    } else {
      setUrl(val);
    }
  };

  const onRunTimeInputChange = (val) => {
    setRunTime(val);
  };

  const onMemoryInputChange = (val) => {
    setMemory(val);
  };

  const onSubmit = () => {
    if (url.length < 30 || runTime === 0 || memory === 0) {
      alert('Please fill in data.')
    } else {
      setLoading(true);
      // send data to db
      props.addNewProblem({
        url,
        runTime,
        memory,
        status: 'PASS'
      });
      setTimeout(() => {
        setLoading(false);
        props.setVisible(false);
      }, 2000);
    }
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
            onChange={onRunTimeInputChange}
          />
        </div>
        <div className="modal__stats--memory">
          <InputNumber
            defaultValue={0}
            min={0}
            formatter={value => `${value}MB`}
            parser={value => value.replace('MB', '')}
            onChange={onMemoryInputChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default connect(null, {
  addNewProblem
})(AddProblem);