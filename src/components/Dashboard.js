import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Layout, Button, Tag } from 'antd';

import ProblemsList from './ProblemsList';
import Progress from './Progress';
import AddProblem from './AddProblem';

import { 
  getAlgoProblems, 
  getDatabaseProblems, 
  getShellProblems, 
  getConcurProblems,
  getUserProblems 
} from '../modules/actions';

const { Header, Content } = Layout;

const Dashboard = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    props.getUserProblems();
    props.getAlgoProblems();
    props.getDatabaseProblems();
    props.getShellProblems();
    props.getConcurProblems();

    // eslint-disable-next-line
  }, []);

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: 'white', height: '65px', fontSize: '24px', fontWeight: '300' }} >Leetcode Progress Tracker</Header>
      <Content style={{ padding: '20px 50px', backgroundColor: 'rgba(242, 246, 248, 1)', minHeight: '93vh' }}>
        <div className="dashboard-container">
          <div className="list-config widget">
            <div className="list-config__tags">
              <Tag color="green">Easy</Tag>
              <Tag color="gold">Medium</Tag>
              <Tag color="red">Hard</Tag>
            </div>
            <div className="list-config__add">
              <Button type="primary" size="small" onClick={() => setVisible(true)}>+</Button>
            </div>
          </div>
          <ProblemsList />
          <Progress />
        </div>
        <AddProblem visible={visible} setVisible={setVisible} />
      </Content>
    </Layout>
  )
};

export default connect(null, {
  getAlgoProblems,
  getDatabaseProblems,
  getShellProblems,
  getConcurProblems,
  getUserProblems
})(Dashboard);