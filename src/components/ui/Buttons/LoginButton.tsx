import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button data-cy="logIn" onClick={() => import.meta.env.MODE !== 'test' ? loginWithRedirect() : null} 
      className="button login">
        Log In
    </Button>
  );
};

export default LoginButton;