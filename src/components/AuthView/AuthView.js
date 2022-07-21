import "./AuthView.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { TestBlock } from "../TestBlock/TestBlock";

const Wrapper = data => <TestBlock title={"Auth View"}>{data}</TestBlock>;
const PreWrapper = data => Wrapper(<pre className="AuthView-pre">{data}</pre>);

export function AuthView() {
    const { user, isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();

    if (error)
        return PreWrapper(`Error: ${error.message}`);

    if (isLoading)
        return PreWrapper("Loading...");

    if (!isAuthenticated)
        return PreWrapper("You are not logged in!");

    return PreWrapper(JSON.stringify(user, null, 2));
}