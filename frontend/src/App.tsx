import React from 'react';
import Navigation from "./ui/navigation/Navigation";
import {createBrowserRouter, RouterProvider, useLocation, useNavigate} from "react-router-dom";
import UserUnauthenticated from "./ui/UserUnauthenticated";
import HttpClient from "./http/HttpClient";
import {CookieStorage} from "./utils/CookieStorage";
import RegistrationForm from "./ui/RegistrationForm";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LocationHandler tabNumber={0}/>
        },
        {
            path: "/me",
            element: <LocationHandler tabNumber={0}/>,
        },
        {
            path: "/register",
            element: <RegistrationForm/>
        },
        {
            path: "/unauthenticated",
            element: <UserUnauthenticated/>
        }
    ]);

    return (<RouterProvider router={router}/>);
}

interface LocationHandlerProps {
    tabNumber: number;
}

function LocationHandler(props: LocationHandlerProps) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const navigate = useNavigate();

    if (code) {
        HttpClient.exchangeAuthCode(code)
            .then(accessTokenResponse => CookieStorage.saveEntireTokenResponse(accessTokenResponse))
            .catch(error => console.log(error))
            .finally(() => navigate('/me'));
    } else if (CookieStorage.hasNoToken()) {
        console.log('no token');
        navigate('/unauthenticated');
    }

    return (<Navigation initialTab={props.tabNumber}/>);
}

export default App;
