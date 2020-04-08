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
  const [filter, setFilter] = useState(0);

  const onFilterChange = (val) => {

  };

  useEffect(() => {
    props.getAlgoProblems();
    props.getDatabaseProblems();
    props.getShellProblems();
    props.getConcurProblems();
    props.getUserProblems();
    
    // eslint-disable-next-line
  }, []);

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: 'white', height: '65px', fontSize: '24px', fontWeight: '300' }} >Leetcode Progress Tracker</Header>
      <Content style={{ padding: '20px 50px', backgroundColor: 'rgba(242, 246, 248, 1)', minHeight: '93vh' }}>
        <div className="dashboard-container">
          <div className="list-config widget">
            <div className="list-config__tags">
              <Tag onClick={() => setFilter(0)}>All</Tag>
              <Tag color="green" onClick={() => setFilter(1)}>Easy</Tag>
              <Tag color="gold" onClick={() => setFilter(2)}>Medium</Tag>
              <Tag color="red" onClick={() => setFilter(3)}>Hard</Tag>
            </div>
            <div className="list-config__add">
              <Button type="primary" size="small" onClick={() => setVisible(true)}>+</Button>
            </div>
          </div>
          <ProblemsList filter={filter}/>
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