import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, InputNumber, Radio, Tag } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { addNewProblem, getUserProblems } from '../modules/actions';

function AddProblem(props) {

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [time, setTime] = useState(0);
  const [runTime, setRunTime] = useState(0);
  const [memory, setMemory] = useState(0);
  const [status, setStatus] = useState('pass');
  const [loading, setLoading] = useState(false);

  const all_problems = [].concat(props.algo, props.db, props.shell, props.concur);

  const onUrlChange = _.debounce((val) => {
    const rootURL = 'https://leetcode.com/problems/'
    const solution = 'solution/';
    const submissions = 'submissions/';
    let givenURL = val;
    if (val.length !== 0) {
      if (val.slice(0, 30) !== rootURL) {
        alert('Invalid URL: Please paste a valid Leetcode problem URL.');
      } else {
        if (val.slice(val.length - 9, val.length) === solution) {
          console.log('sol');
          givenURL = val.slice(0, val.length - 9);
        } else if (val.slice(val.length - 12, val.length) === submissions) {
          console.log('sub');
          givenURL = val.slice(0, val.length - 12);
        }
        setUrl(givenURL);
        const slug = givenURL.slice(30, val.length - 1);
        console.log(slug);
        for (const q of all_problems) {
          if (slug === q.stat.question__title_slug) {
            console.log('hit');
            setUrl(givenURL);
            setTitle(`${q.stat.question_id}. ${q.stat.question__title}`);
            setDifficulty(q.difficulty.level);
          }
        }
      }
    }
  }, 100);

  const onTimeChange = (val) => {
    setTime(val);
  };

  const onRunTimeInputChange = (val) => {
    setRunTime(val);
  };

  const onMemoryInputChange = (val) => {
    setMemory(val);
  };

  const onStatusChange = (val) => {
    setStatus(val);
  };

  const onSubmit = () => {
    if (url.length < 30 || runTime === 0 || time === 0 || memory === 0 || title.length === 0 || difficulty === 0) {
      alert('Please fill in data.')
    } else {
      const date = moment().format();
      setLoading(true);
      // send data to db
      props.addNewProblem({
        url,
        title,
        difficulty,
        time,
        runTime,
        memory,
        status,
        date
      });
      setTimeout(() => {
        setUrl('');
        setTitle('');
        setDifficulty(0);
        setTime(0);
        setRunTime(0);
        setMemory(0);
        setStatus('pass');
        setLoading(false);
        props.setVisible(false);
        props.getUserProblems();
      }, 2000);
    }
  };

  const displayDifficulty = (num) => {
    switch (num) {
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
          placeholder="https://leetcode.com/problems/"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
        />
      </div>
      <div className="modal__problem">
        <div className="modal__problem--title">
          <div className="modal__problem--title-label">
            Problem:
          </div>
          <div className="modal__problem--title-display">
            {title}
          </div>
        </div>
        <div className="modal__problem--difficulty">
          <div className="modal__problem--difficulty-label">
            Difficulty:
          </div>
          <div className="modal__problem--difficulty-display">
            {displayDifficulty(difficulty)}
          </div>
        </div>
      </div>
      <div className="modal__focus">
          <div className="modal__focus-label">Time:</div>
          <InputNumber
            value={time}
            min={0}
            formatter={value => `${value}min`}
            parser={value => value.replace('min', '')}
            onChange={onTimeChange}
          />
        </div>
      <div className="modal__stats">
        <div className="modal__stats--run-time">
          Runtime: &nbsp;
          <InputNumber
            value={runTime}
            min={0}
            formatter={value => `${value}ms`}
            parser={value => value.replace('ms', '')}
            onChange={onRunTimeInputChange}
          />
        </div>
        <div className="modal__stats--memory">
          Memory: &nbsp;
          <InputNumber
            value={memory}
            min={0}
            formatter={value => `${value}MB`}
            parser={value => value.replace('MB', '')}
            onChange={onMemoryInputChange}
          />
        </div>
        <div className="modal__stats--status">
          <Radio.Group value={status} onChange={(e) => onStatusChange(e.target.value)}>
            <Radio.Button value="pass">Pass</Radio.Button>
            <Radio.Button value="fail">Fail</Radio.Button>
          </Radio.Group>
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
  addNewProblem,
  getUserProblems
})(AddProblem);