import { useContext, useState } from "react";
import { ContextApplication } from "../../libs/config/contexts";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
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
  const chageListener = useChangeListener();

  const { user, setUser } = useState(UserInit);
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
        message.error(response.data.token);
        userValidator.axcept(error);
      });
  };

  return (
    <>
      <Modal
        show={!application.isAuthenticated}
        centered={true}
        onHide={() => {}}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
          <Modal.Body>
            <Form.Group ClassName="mb-3">
              <Form.Lable>Email</Form.Lable>
              <Form.Control
                name="email"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) => chageListener.changeText(e, user, setUser)}
              />
            </Form.Group>
            <Form.Group ClassName="mb-3">
              <Form.Lable>Password</Form.Lable>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => chageListener.changeText(e, user, setUser)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={SignIn}>
              Sign In
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default WidgetUserSignInModal;
