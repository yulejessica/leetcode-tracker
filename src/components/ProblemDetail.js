import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

function ProblemDetail(props) {
  return (
    <Collapse>
      <Panel key="1">
        {text}
      </Panel>
    </Collapse>
  )
};

export default ProblemDetail;