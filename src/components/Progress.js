import React from 'react'
import { Progress } from 'antd';

function ProgressStats(props) {
  return (
    <div className="progress-container">
      <div className="progress widget">
        <div className="progress__total">
          <Progress type="circle" percent={75} />
        </div>
        <div className="progress__breakdown">
          <Progress
            percent={30}
            // status="active"
            strokeColor={{
              '0%': '#52c41a',
              '100%': '#52c41a',
            }}
          />
          <Progress
            percent={30}
            // status="active"
            strokeColor={{
              '0%': '#faad14',
              '100%': '#faad14',
            }}
          />
          <Progress
            percent={30}
            // status="active"
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
}

export default ProgressStats;