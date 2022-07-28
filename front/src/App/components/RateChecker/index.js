import {
  Row,
  Col,
  Typography,
  Card,
  Form,
  Input,
  Select,
  Space,
  Progress,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import { rateChekerData } from "./data";

function RateChecker() {
  const [currencyTo, setCurrencyTo] = useState("");
  const [amountTo, setAmountTo] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("GBP");
  const [amountFrom, setAmountFrom] = useState(1);

  const [currencyToEmpty, setCurrencyToEmpty] = useState(false);
  const [currencyFromEmpty, setCurrencyFromEmpty] = useState(false);

  // Function for submit form
  function handleSubmit() {
    // Set error messages
    if (currencyTo === "") {
      setCurrencyToEmpty(true); // unset error
    } else {
      setCurrencyToEmpty(false); // set error
    }
    if (currencyFrom === "") {
      setCurrencyFromEmpty(true); // unset error
    } else {
      setCurrencyFromEmpty(false); // set error
    }

    // if all filled then do result
    if (
      currencyTo !== "" &&
      currencyFrom !== "" &&
      amountFrom > 0
    ) {
      const findPriceTo = rateChekerData.filter(
        (item) => item.currency === currencyTo
      );
      const findPriceFrom = rateChekerData.filter(
        (item) => item.currency === currencyFrom
      );

      const finaly =
        (findPriceTo[0].price / findPriceFrom[0].price) * amountFrom;

      setAmountTo(finaly);
      setAmountFrom(amountFrom);
    }
  }

  const common = rateChekerData.filter((item) => item.type === "common"); // filter data
  const other = rateChekerData.filter((item) => item.type === "other"); // filter data

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Text className="dark-green medium fs-25px">
            Rate Checker
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            <Card.Grid className="full-width rounded b-g hover-no-border">
              <Form layout="vertical">
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="convertTo"
                      label={
                        <span className="muli semi-bold fs-18px">
                          Convert To
                        </span>
                      }
                    >
                      <Row gutter={8}>
                        <Col span={6}>
                          <Select
                            className="dark-green"
                            name="currencyTo"
                            status={currencyToEmpty ? "error" : ""}
                            onChange={(val) => setCurrencyTo(val)}
                            showSearch
                            filterOption={(input, option) => {
                              if (option.children)
                                return option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                              else if (option.label)
                                return option.label
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                            }}
                          >
                            <Select.OptGroup label="Common">
                              {common.map((item, index) => {
                                return (
                                  <Select.Option
                                    value={item.currency}
                                    key={"tocurrency" + index}
                                  >
                                    {item.currency}
                                  </Select.Option>
                                );
                              })}
                            </Select.OptGroup>
                            <Select.OptGroup label="Other">
                              {other.map((item, index) => {
                                return (
                                  <Select.Option
                                    value={item.currency}
                                    key={"toamount" + index}
                                  >
                                    {item.currency}
                                  </Select.Option>
                                );
                              })}
                            </Select.OptGroup>
                          </Select>
                        </Col>
                        <Col span={18}>
                          <Input
                            placeholder="Enter Amount"
                            type="number"
                            value={amountTo}
                            onChange={(val) => setAmountTo(val.target.value)}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item
                      name="convertFrom"
                      label={
                        <span className="muli semi-bold fs-18px">
                          Convert From
                        </span>
                      }
                    >
                      <Row gutter={8}>
                        <Col span={6}>
                          <Select
                            className="dark-green"
                            onChange={(val) => setCurrencyFrom(val)}
                            status={currencyFromEmpty ? "error" : ""}
                            defaultValue={currencyFrom}
                            showSearch
                            filterOption={(input, option) => {
                              if (option.children)
                                return option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                              else if (option.label)
                                return option.label
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                            }}
                          >
                            <Select.OptGroup label="Common">
                              {common.map((item, index) => {
                                return (
                                  <Select.Option
                                    value={item.currency}
                                    key={"fromcurrency" + index}
                                    
                                  >
                                    {item.currency}
                                  </Select.Option>
                                );
                              })}
                            </Select.OptGroup>
                            <Select.OptGroup label="Other">
                              {other.map((item, index) => {
                                return (
                                  <Select.Option
                                    value={item.currency}
                                    key={"fromamount" + index}
                                  >
                                    {item.currency}
                                  </Select.Option>
                                );
                              })}
                            </Select.OptGroup>
                          </Select>
                        </Col>
                        <Col span={18}>
                          <Input
                            placeholder="Enter Amount"
                            type={"number"}
                            value={amountFrom}
                            onChange={(val) => setAmountFrom(val.target.value)}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="bottom">
                  <Col span={12}>
                    <Space>
                      <Progress
                        type="circle"
                        percent={75}
                        width={40}
                        format={() => `30s`}
                      />
                      <Space direction="vertical" size={0}>
                        <Typography.Text className="muli semi-bold light-green">
                          FX Rate
                        </Typography.Text>
                        <Typography.Text className="muli semi-bold light-green">
                          1 GBP = 1.19 EUR
                        </Typography.Text>
                      </Space>
                    </Space>
                  </Col>
                  <Col span={12} className="right-align-text">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleSubmit}
                      className="right-align-text"
                    >
                      Convert
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default RateChecker;
