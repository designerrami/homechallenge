import { Spin, Row } from "antd";
import React from "react";

function Loading() {
  return (
    <Row className="full-height" align="middle" justify="center">
      <Spin tip="Loading..." />
    </Row>
  );
}

export default Loading;
