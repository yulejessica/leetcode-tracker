import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Layout, Button, Tag } from 'antd';
import { WaveTopBottomLoading } from 'react-loadingg';

import ProblemsList from './ProblemsList';
import Progress from './Progress';
import AddProblem from './AddProblem';

import {
  getAlgoProblemsIntent,
  getDatabaseProblemsIntent,
  getShellProblemsIntent,
  getConcurProblemsIntent,
  getUserProblems
} from '../modules/actions';

const { Header, Content } = Layout;

const Dashboard = (props) => {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState(0);

  function renderDisplay() {
    // if any callsInProgress contain true, render loader
    if (Object.keys(props.callsInProgress).some((k) => props.callsInProgress[k])) {
      return <WaveTopBottomLoading color={'#45b2f7'} />;
    } else {
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
              <ProblemsList filter={filter} />
              <Progress />
            </div>
            <AddProblem visible={visible} setVisible={setVisible} />
          </Content>
        </Layout>
      );
    }
  }

  useEffect(() => {
    props.getAlgoProblemsIntent();
    props.getDatabaseProblemsIntent();
    props.getShellProblemsIntent();
    props.getConcurProblemsIntent();
    props.getUserProblems();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {renderDisplay()}
    </div>
  )
};

const mapStateToProps = state => {
  return {
    callsInProgress: state.callsInProgress
  }
};

export default connect(mapStateToProps, {
  getAlgoProblemsIntent,
  getDatabaseProblemsIntent,
  getShellProblemsIntent,
  getConcurProblemsIntent,
  getUserProblems
})(Dashboard);