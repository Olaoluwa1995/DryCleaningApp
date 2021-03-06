import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Container, Message, Label } from "semantic-ui-react";
import { productDetailURL, addToCartURL } from "../constants";
import { fetchCart } from "../store/actions/cart";
import { authAxios } from "../utils";
import {
  Card,
  Divider,
  Spin,
  Alert,
  Row,
  Col,
  Steps,
  message,
  Progress,
  Button,
  Tooltip,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Step } = Steps;

class ProductDetail extends React.Component {
  state = {
    loading: false,
    error: null,
    data: [],
    current: 0,
    percent: 0,
    status: "",
    profile: [],
    date: "",
  };

  componentDidMount() {
    this.handleFetchItem();
  }

  handleFetchItem = () => {
    const {
      match: { params },
    } = this.props;
    this.setState({ loading: true });
    axios
      .get(productDetailURL(params.productID))
      .then((res) => {
        var date = new Date();
        this.setState({ date });
        console.log(date);
        console.log(res.data.publish);
        console.log(res.data);
        if (
          res.data.washed === true &&
          res.data.ironed === false &&
          res.data.packed === false &&
          res.data.ready === false
        ) {
          this.setState({ current: 1 });
          this.setState({ percent: 25 });
          this.setState({ status: "active" });
        } else if (
          res.data.washed === true &&
          res.data.ironed === true &&
          res.data.packed === false &&
          res.data.ready === false
        ) {
          this.setState({ current: 2 });
          this.setState({ percent: 50 });
          this.setState({ status: "active" });
        } else if (
          res.data.washed === true &&
          res.data.ironed === true &&
          res.data.packed === true &&
          res.data.ready === false
        ) {
          this.setState({ current: 3 });
          this.setState({ percent: 75 });
          this.setState({ status: "active" });
        } else if (
          res.data.washed === true &&
          res.data.ironed === true &&
          res.data.packed === true &&
          res.data.ready === true
        ) {
          this.setState({ current: 4 });
          this.setState({ percent: 100 });
          this.setState({ status: "success" });
          message.success("Your cloth is ready for checkout");
        } else {
          this.setState({ current: 0 });
          this.setState({ percent: 0 });
          this.setState({ status: "exception" });
        }
        this.setState({ data: res.data, loading: false });
        this.setState({ profile: res.data.profile, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };

  handleAddToCart = (slug) => {
    this.setState({ loading: true });
    authAxios
      .post(addToCartURL, { slug })
      .then((res) => {
        console.log(res.data);
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { data, error, loading, current, percent, status } = this.state;
    const item = data;
    const { Meta } = Card;
    return (
      <Container>
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}
        {loading && (
          <div className="example">
            <Spin size="large" tip="Loading...">
              <Alert
                message="Product Loading!"
                description="Wait for few moments. It's coming up!"
                type="info"
              />
            </Spin>
          </div>
        )}

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card
              style={{
                margin: 10,
                backgroundColor: "lavender",
              }}
              hoverable
              cover={
                <img
                  src={item.image}
                  style={{ height: 300, minWidth: 50 }}
                  alt=""
                />
              }
              actions={[<h4>Date Brought</h4>, <h4>{item.publish}</h4>]}
            >
              <Divider
                orientation="left"
                style={{ color: "Red", fontWeight: "bold" }}
              >
                <h3 style={{ color: "Black", fontSize: 20 }}>
                  {item.category}
                </h3>
              </Divider>
              <Meta title={item.title} description={item.description} />
              <div style={{ float: "right", marginTop: 5 }}>
                <Label color="teal" tag size="large">
                  #{item.price}
                </Label>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card
              style={{
                margin: 10,
                textAlign: "center",
                backgroundColor: "lavender",
              }}
              hoverable
              title="Product Processing Details"
              bordered={true}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Steps
                    type="navigation"
                    current={current}
                    direction="vertical"
                    className="site-navigation-steps"
                  >
                    <Step status="wait" title="Just In" />
                    <Step status="process" title="Washed" />
                    <Step status="process" title="Ironed" />
                    <Step status="process" title="Packed" />
                    <Step status="finish" title="Ready" />
                  </Steps>
                </Col>
                <Col span={12}>
                  <Row
                    justify="center"
                    align="middle"
                    style={{ marginTop: 40 }}
                  >
                    <Progress
                      type="circle"
                      width={150}
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={percent}
                      status={status}
                    />
                  </Row>
                  <Row justify="end" align="middle" style={{ marginTop: 80 }}>
                    {item.washed === true &&
                    item.ironed === true &&
                    item.packed === true &&
                    item.ready === true ? (
                      <Tooltip title="You can now add to cart">
                        <Button
                          type="primary"
                          shape="round"
                          icon={<ShoppingCartOutlined />}
                          size="large"
                          onClick={() => this.handleAddToCart(item.slug)}
                        >
                          Add To Cart
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="You can't add to cart yet">
                        <Button
                          type="primary"
                          shape="round"
                          icon={<ShoppingCartOutlined />}
                          size="large"
                          disabled
                        >
                          Add To Cart
                        </Button>
                      </Tooltip>
                    )}
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshCart: () => dispatch(fetchCart()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ProductDetail));
