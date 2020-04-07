import React, { useEffect } from 'react'
import { Collapse, List, Avatar } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

function ProblemDetail(props) {
  let listData = [];
  function setList(data) {
    for (const attempt in data) {
      listData.push(data[attempt]);
    }
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
                  {item.date}
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