import { AuthControl } from "./components/AuthControl/AuthControl";
import { AuthView } from "./components/AuthView/AuthView";
import { AuthRoles } from "./components/AuthRoles/AuthRoles";

function App() {
    return (
        <>
            <h1>Auth0 React Sandbox</h1>
            <AuthControl/>
            <AuthView/>
            <AuthRoles/>
        </>
    );
}

export default App;
