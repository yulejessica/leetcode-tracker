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
              <Tag color="red">Hard</Tag>,
              <IconText icon={FormOutlined} text="156" className="list-attempts" key="list-vertical-form-o" />,
              <IconText icon={ClockCircleOutlined} text="156" className="list-time" key="list-clock-circle-o" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: 'rgba(40, 85, 218, .65)' }} icon={<BulbOutlined />} size='small' />}
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