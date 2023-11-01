import React from "react";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";

const Logout = () => {
    const navigate = useNavigate();
    const handIeLogout = () =>{
        AuthService.logout();
        navigate("/");
    };
    setTimeout(() => {
        handIeLogout();
    }, 3 * 1000);
    return <div>Logout</div>
};

export default Logout;