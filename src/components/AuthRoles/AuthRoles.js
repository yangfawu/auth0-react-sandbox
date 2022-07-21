import "./AuthRoles.scss";
import { TestBlock } from "../TestBlock/TestBlock";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Wrapper = data => <TestBlock title={"Auth Roles"}>{data}</TestBlock>;
const DICT = {
    INTERN: "INTERN-APPLICATION",
    CHAMPION: "CHAMPION-APPLICATION",
    ADMIN: "ADMIN-APPLICATION"
}

export function AuthRoles() {
    const { user, isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState(null);
    useEffect (() => {
        if (isAuthenticated)
            getAccessTokenSilently()
                .then(setToken)
                .catch((err) => {
                    console.error(err);
                    setToken(null);
                });
        else
            setToken(null);
    });

    if (!isAuthenticated || isLoading)
        return Wrapper(<p>Waiting for user information.</p>);

    // handlers
    const updateRoles = (data, action) => {
        return async () => {
            if (!token)
                return;
            await axios.request({
                method: "POST",
                url: `/api/private/form${action}`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
                data: { "application-type": data }
            });
            window.location.reload();
        }
    }
    const getRole = appType => updateRoles(appType, "");
    const resignRole = appType => updateRoles(appType, "/reset");

    // resignation
    let roles = user["https://SOME-UNIQUE-NAMESPACE-FOR-CUSTOM-CLAIM.com/roles"];
    roles = roles.filter(r => r !== "USER");
    return Wrapper(
        <>
            <div className="AuthRoles-btn-box">
                <button onClick={getRole("INTERN-APPLICATION")}>Become an Intern</button>
                <button onClick={getRole("CHAMPION-APPLICATION")}>Become a Champion</button>
                <button onClick={getRole("ADMIN-APPLICATION")}>Become an Admin</button>
            </div>
            <div className="AuthRoles-link-box">{
                roles.map(r => (
                    <div key={r}>You are seeing this line because you have the {r} role. (<span onClick={resignRole(DICT[r])}
                    >
                        Click here to resign.
                    </span>)</div>
                ))
            }</div>
        </>
    );
}