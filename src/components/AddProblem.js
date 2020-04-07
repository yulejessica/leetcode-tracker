import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, InputNumber, Tag } from 'antd';
import _ from 'lodash';

import { addNewProblem } from '../modules/actions';

function AddProblem(props) {

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [runTime, setRunTime] = useState(0);
  const [memory, setMemory] = useState(0);
  const [loading, setLoading] = useState(false);

  const all_problems = [].concat(props.algo, props.db, props.shell, props.concur);
  
  const onUrlChange = _.debounce((val) => {
    console.log('change')
    console.log(val);
    const rootURL = 'https://leetcode.com/problems/'
    if (val.length !== 0) {
      if (val.slice(0, 30) !== rootURL) {
        alert('Invalid URL: Please paste a valid Leetcode problem URL.');
      } else {
        const slug = val.slice(30, url.length - 1);
        console.log(slug)
        for (const q of all_problems) {
          if (slug === q.stat.question__title_slug) {
            console.log('hit');
            setUrl(val);
            setTitle(q.stat.question__title);
            setDifficulty(q.difficulty.level);
          }
        }
      }
    }
  }, 1000);

  const onRunTimeInputChange = (val) => {
    setRunTime(val);
  };

  const onMemoryInputChange = (val) => {
    setMemory(val);
  };

  const onSubmit = () => {
    if (url.length < 30 || runTime === 0 || memory === 0 || title.length === 0 || difficulty === 0) {
      alert('Please fill in data.')
    } else {
      setLoading(true);
      // send data to db
      props.addNewProblem({
        url,
        title,
        difficulty,
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
  
  const displayDifficulty = (num) => {
    switch(num) {
      case 0:
        return null;
      case 1:
        return <Tag color="green">Easy</Tag>;
      case 2:
        return <Tag color="gold">Medium</Tag>;
      case 3:
        return <Tag color="red">Hard</Tag>;
      default:
        return null;
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
      <div className="modal__problem">
        <div className="modal__problem--title">
          Title: {title}
        </div>
        <div className="modal__problem--difficulty">
          Difficulty: {displayDifficulty(difficulty)}
        </div>
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

const mapStateToProps = state => {
  return {
    algo: state.questions.algo,
    db: state.questions.db,
    shell: state.questions.shell,
    concur: state.questions.concur,
  }
};

export default connect(mapStateToProps, {
  addNewProblem
})(AddProblem);