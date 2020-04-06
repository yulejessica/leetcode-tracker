import React from 'react'
import { List, Avatar, Tag } from 'antd';
import { BulbOutlined, ClockCircleOutlined, FormOutlined } from '@ant-design/icons';

import ProblemDetail from './ProblemDetail';

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

function ProblemsList(props) {
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'http://ant.design',
      title: `ant design part ${i}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

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
        dataSource={listData}
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
              title={<a href={item.href}>{item.title}</a>}
            />
            <ProblemDetail />
          </List.Item>
        )}
      />
    </div>
  )
};

export default ProblemsList;