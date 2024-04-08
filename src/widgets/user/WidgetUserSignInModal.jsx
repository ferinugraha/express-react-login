import React, { useContext, useState } from "react";
import { ContextApplication } from "../../libs/config/contexts";
import { Button, Form, Modal } from "react-bootstrap";
import useJWT from "../../libs/hooks/useJWT";
import useHTTP from "../../libs/hooks/useHTTP";
import useMessage from "../../libs/hooks/useMessage";
import useChangeListener from "../../libs/hooks/useChangeListener";
import { UserInit, UserValidator } from "../../data/UserData";
import useValidator from "../../libs/hooks/useValidator";
import { BASE_URL } from "../../libs/config/settings";

const WidgetUserSignInModal = () => {
  const application = useContext(ContextApplication);
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [user, setUser] = useState(UserInit);
  const userValidator = useValidator(UserValidator);

  const SignIn = () => {
    userValidator.reset(user);

    const url = `${BASE_URL}/user/signin/`;

    http.publicHttp
      .post(url, user)
      .then((response) => {
        jwt.setToken(response.data.token);
        application.setIsAuthenticated(true);
        console.log(response.data.token);
      })
      .catch((error) => {
        message.error(error.response.data.token);
        userValidator.accept(error);
      });
  };

  return (
    <Modal
      show={!application.isAuthenticated}
      centered={true}
      onHide={() => {}}
      backdrop={"static"}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => changeListener.changeText(e, setUser)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => changeListener.changeText(e, setUser)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={SignIn}>
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WidgetUserSignInModal;
