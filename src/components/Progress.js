import React from 'react'
import { connect } from 'react-redux';
import { Progress, Tag } from 'antd';

function ProgressStats(props) {

  function getAverageTime(arr) {
    let totalTime = 0;
    let count = 0;
    console.log(arr)
    if (arr.length !== 0) {
      for (const question of arr) {
        for (const attempt in question.attempts) {
          totalTime += question.attempts[attempt].time;
          count++
        }
      }
      return Math.round(totalTime / count);
    } else {
      return 0;
    }
  };

  return (
    <div className="progress-container">
      <div className="progress widget">
        <div className="progress__total">
          <Progress
            type="circle"
            width={170}
            percent={props.userProblems.length / props.problems.length}
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
            percent={props.userMed.length / props.med.length}
            format={percent => `${props.userMed.length} / ${props.med.length}`}
            strokeColor={{
              '0%': '#faad14',
              '100%': '#faad14',
            }}
          />
          <Progress
            percent={props.userHard.length / props.hard.length}
            format={percent => `${props.userHard.length} / ${props.hard.length}`}
            strokeColor={{
              '0%': '#f5222d',
              '100%': '#f5222d',
            }}
          />
        </div>
        <div className="progress__averages">
          <div className="progress__averages--header">
            Average Time Spent
          </div>
          <div className="progress__averages--grid">
            <div>
              <Tag color="green">Easy</Tag>
            </div>
            <div className="progress__averages--easy">
              {`${getAverageTime(props.userEasy)} minutes`}
            </div>
            <div>
              <Tag color="gold">Medium</Tag>
            </div>
            <div className="progress__averages--medium">
              {`${getAverageTime(props.userMed)} minutes`}
            </div>
            <div>
              <Tag color="red">Hard</Tag>
            </div>
            <div className="progress__averages--hard">
              {`${getAverageTime(props.userHard)} minutes`}
            </div>
          </div>
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
  for (const p of all_problems) {
    if (p.difficulty.level === 1) {
      easy.push(p);
    } else if (p.difficulty.level === 2) {
      med.push(p);
    } else if (p.difficulty.level === 3) {
      hard.push(p);
    }
  };

  let userEasy = [];
  let userMed = [];
  let userHard = [];
  for (const q of state.userProblems.problems) {
    if (q.difficulty === 1) {
      userEasy.push(q);
    } else if (q.difficulty === 2) {
      userMed.push(q);
    } else if (q.difficulty === 3) {
      userHard.push(q);
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