import React from "react";
import { Card, Col, Row, Table } from "antd";
import "antd"; // Import Ant Design styles

const RenderApiResult = ({ apiResult }) => {
  if (!apiResult) {
    return null; // Return null if apiResult is not provided
  } else {
    const formatValue = (value) => {
      if (Math.abs(value) > 1e6 || (Math.abs(value) < 1e-6 && value !== 0)) {
        return Math.abs(value.toExponential(3));
      }
      return Math.abs(value.toFixed(4));
    };

    // Extract unique methods from the first substance
    const uniqueMethods = Object.keys(apiResult[Object.keys(apiResult)[0]]);

    return (
      <Row justify="center" gutter={[16, 16]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={16}
          style={{ flex: "1 0 66.66666666666666%", maxWidth: "100%" }}
        >
          <Card
            title={<h2>Bảng kết quả dự đoán nồng độ chất</h2>}
            style={{
              width: "90%", // Adjust the width percentage as needed
              margin: "auto", // Center the card
              border: "1px solid black",
              borderRadius: "8px",
            }}
          >
            <Table
              dataSource={Object.entries(apiResult).map(
                ([substance, values]) => ({
                  substance,
                  ...values,
                })
              )}
              columns={[
                {
                  title: "Substance",
                  dataIndex: "substance",
                  key: "substance",
                  fixed: "left", // Keeps this column fixed during horizontal scrolling
                },
                ...uniqueMethods.map((method) => ({
                  title: method,
                  dataIndex: method,
                  key: method,
                  render: (value) => formatValue(value),
                  align: "center", // Center the content within each cell
                })),
              ]}
              pagination={false}
              bordered
            />
          </Card>
        </Col>
      </Row>
    );
  }
};

export default RenderApiResult;
