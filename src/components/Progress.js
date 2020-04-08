import React from 'react'
import { connect } from 'react-redux';
import { Progress } from 'antd';

function ProgressStats(props) {
  




  return (
    <div className="progress-container">
      <div className="progress widget">
        <div className="progress__total">
          <Progress 
            type="circle" 
            width={170} 
            percent={(props.userProblems.length/props.problems.length)}
            format={percent => `${props.userProblems.length} / ${props.problems.length}`} 
          />
        </div>
        <div className="progress__breakdown">
          <Progress
            percent={props.userEasy.length / props.easy.length}
            format={percent => `${props.userEasy.length} / ${props.easy.length}`}
            strokeColor={{
              '0%': '#52c41a',
              '100%': '#52c41a',
            }}
          />
          <Progress
            percent={30}
            percent={props.userMed.length / props.med.length}
            format={percent => `${props.userMed.length} / ${props.med.length}`}
            strokeColor={{
              '0%': '#faad14',
              '100%': '#faad14',
            }}
          />
          <Progress
            percent={30}
            percent={props.userHard.length / props.hard.length}
            format={percent => `${props.userHard.length} / ${props.hard.length}`}
            strokeColor={{
              '0%': '#f5222d',
              '100%': '#f5222d',
            }}
          />
        </div>
        <div className="progress__averages">
          Average
      </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  const all_problems = [].concat(state.questions.algo, state.questions.db, state.questions.shell, state.questions.concur);
  let easy = [];
  let med = [];
  let hard = [];
  for (const p in all_problems) {
    if (all_problems[p].difficulty.level === 1) {
      easy.push(all_problems[p]);
    } else if (all_problems[p].difficulty.level === 2) {
      med.push(all_problems[p]);
    } else if (all_problems[p].difficulty.level === 3) {
      hard.push(all_problems[p]);
    }
  };

  let userEasy = [];
  let userMed = [];
  let userHard = [];
  for (const q in state.userProblems.problems) {
    if (state.userProblems.problems[q].difficulty === 1) {
      userEasy.push(state.userProblems.problems[q]);
    } else if (state.userProblems.problems[q].difficulty === 2) {
      userMed.push(state.userProblems.problems[q]);
    } else if (state.userProblems.problems[q].difficulty === 3) {
      userHard.push(state.userProblems.problems[q]);
    }
  };

  return {
    problems: all_problems,
    userProblems: state.userProblems.problems,
    easy,
    med,
    hard,
    userEasy,
    userMed,
    userHard
  };
};

export default connect(mapStateToProps)(ProgressStats);