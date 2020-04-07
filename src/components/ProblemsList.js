import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Tag } from 'antd';
import { BulbOutlined, ClockCircleOutlined, FormOutlined } from '@ant-design/icons';

import ProblemDetail from './ProblemDetail';

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const ProblemsList = (props) => {

  const color = (num) => {
    switch (num) {
      case 1:
        return 'green';
      case 2:
        return 'gold';
      case 3:
        return 'red';
      default:
        return 'green'
    }
  };

  const difficulty = (num) => {
    switch (num) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      default:
        return 'Easy'
    }
  };

  const getTime = (attempts) => {
    let count = 0;
    for (const x in attempts) {
      count += attempts[x].time;
    }
    return count;
  };

  useEffect(() => {
  }, [props.userProblems]);

  return (
    <div className="problems-list widget">
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={props.userProblems}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <Tag color={color(item.difficulty)}>{difficulty(item.difficulty)}</Tag>,
              <IconText icon={FormOutlined} text={Object.keys(item.attempts).length} className="list-attempts" key="list-vertical-form-o" />,
              <IconText icon={ClockCircleOutlined} text={getTime(item.attempts)} className="list-time" key="list-clock-circle-o" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: 'rgba(40, 85, 218, .45)' }} icon={<BulbOutlined />} size='small' />}
              title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
            />
            <ProblemDetail attempts={item.attempts}/>
          </List.Item>
        )}
      />
    </div>
  )
};

const mapStateToProps = state => {
  return {
    userProblems: state.userProblems.problems
  }
};

export default connect(mapStateToProps)(ProblemsList);