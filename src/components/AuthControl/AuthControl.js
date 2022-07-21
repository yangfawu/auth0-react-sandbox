import "./AuthControl.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { TestBlock } from "../TestBlock/TestBlock";

export function AuthControl() {
    const { loginWithRedirect, logout } = useAuth0();
    return (
        <TestBlock title={"Auth Control"}>
            <div className="AuthControl-container">
                <button onClick={() => loginWithRedirect()}>Log In</button>
                <button onClick={() => logout({ returnTo: window.location.origin })}>Sign Out</button>
            </div>
        </TestBlock>
    );
}