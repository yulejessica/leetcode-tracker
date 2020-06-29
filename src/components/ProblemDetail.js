import React, { useEffect } from 'react'
import { Collapse, List, Avatar } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Panel } = Collapse;

function ProblemDetail(props) {
  let listData = [];
  function setList(data) {
    for (const attempt in data) {
      listData.push(data[attempt]);
    }
    listData.sort(function (a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  };

  function setStatus(status) {
    if (status === 'pass') {
      return <Avatar shape="square" size="small" style={{ backgroundColor: '#b7eb8f' }} icon={<CheckOutlined />} />;
    } else {
      return <Avatar shape="square" size="small" style={{ backgroundColor: '#ffa39e' }} icon={<CloseOutlined />} />;
    }
  };

  useEffect(() => {
    setList(props.attempts)
    // eslint-disable-next-line
  }, [props.attempts])

  return (
    <Collapse>
      <Panel key="1">
        <List
          header={
            <div className="attempt-header">
              <div>Status</div>
              <div>Time</div>
              <div>Runtime</div>
              <div>Memory</div>
              <div>Date</div>
            </div>
          }
          // loading={'true'}
          dataSource={listData}
          renderItem={item => (
            <List.Item>
              <div className="attempt">
                <div className="attempt__status">
                  {setStatus(item.status)}
                </div>
                <div className="attempt__time">
                  {item.time} mins
                </div>
                <div className="attempt__runTime">
                  {item.runTime} ms
                </div>
                <div className="attempt__memory">
                  {item.memory} MB
                </div>
                <div className="attempt__date">
                  {moment(new Date(item.date)).format('MMM Do YYYY')}
                  {console.log(new Date(item.date))}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Panel>
    </Collapse>
  )
};

export default ProblemDetail;