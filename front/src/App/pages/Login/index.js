import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
import { setAuth } from "../../store/authSlice";

function Login() {
  const dispatch = useDispatch();

  // check token
  const [cookie, setCookie] = useCookies(["auth"]);

  // for error warnings create states
  const [userEmpty, setUserEmpty] = useState(false);
  const [passEmpty, setPassEmpty] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const loadAsyncLogin = async (username, password) => {
    try {
      const headers = { "Content-Type": "application/json" };
      await axios
        .get(
          "https://site.test/homechallenge/back/?username=" +
            username +
            "&password=" +
            password,
          { headers }
        )
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.message === "success" &&
            response.data.data.token !== ""
          ) {
            const newData = {
              username: response.data.data.username,
              name: response.data.data.name,
              id: response.data.data.id,
              token: response.data.data.token,
              isAuth: true,
            };

            setInvalid(false);
            setCookie("auth", newData, { path: "/" });
            dispatch(setAuth(newData));
          } else {
            setInvalid(true); // ERROR LOGIN
          }
        })
        .catch((error) => {
          setInvalid(true); // ERROR LOGIN
        });
    } catch (error) {
      setInvalid(true); // ERROR LOGIN
    } finally {
      //setLoaded(true);
    }
  };

  // Function for submit form
  function handleSubmit(event) {
    setInvalid(false); // unset error
    event.preventDefault(); // prevent to page for refresh when submiting

    var { username, password } = document.forms[0]; // get all values from form
    //const userData = database.find((user) => user.username === username.value);

    const username_get = username.value; // get username
    const password_get = password.value; // get password

    // Set error messages
    if (!username_get) {
      setUserEmpty(true); // unset error
    } else {
      setUserEmpty(false); // set error
    }
    if (!password_get) {
      setPassEmpty(true); // unset error
    } else {
      setPassEmpty(false); // set error
    }

    // check user login info true or not
    loadAsyncLogin(username_get, password_get);
  }

  return (
    <Row className="full-height" align="middle" justify="center">
      <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
        <Card>
          <Card.Grid className="full-width rounded">
            <Row>
              <Col span={24}>
                <Typography.Text className="medium fs-28px dark-green">
                  Login
                </Typography.Text>
              </Col>
              {invalid && (
                <Col span={24}>
                  <Typography.Text className="medium fs-16px error">
                    ERROR : Invalid username or password
                  </Typography.Text>
                </Col>
              )}
            </Row>
            <Row className="m-t-10">
              <Col span={24}>
                <Form layout="vertical" requiredMark={false}>
                  <Form.Item
                    label={<span className="muli semi-bold">Username</span>}
                    validateStatus={userEmpty ? "error" : ""}
                    help={userEmpty ? "Username cant be empty" : ""}
                  >
                    <Input name="username" allowClear />
                  </Form.Item>

                  <Form.Item
                    label={<span className="muli semi-bold">Password</span>}
                    validateStatus={passEmpty ? "error" : ""}
                    help={passEmpty ? "Password cant be empty" : ""}
                  >
                    <Input.Password name="password" allowClear />
                  </Form.Item>

                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    htmlType="submit"
                    className="right-align-text"
                  >
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Grid>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
