import { post } from '../utils/httpClient';
import { NextResponse } from 'next/server';



const login = (credential, password) => {
    return post("/login", {
            credential,
            password
        })
        .then((response) => {
            //localStorage.setItem("user", JSON.stringify(response));
            return response;
        });
};

const register = (username, name, lastName, email, password, type, superuser) => {
    return post("/users", {
            username,
            name,
            lastName,
            email,
            password,
            type,
            superuser
        })
        .then((response) => {
            return NextResponse.json(response);
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const AuthService = {
    register,
    login,
    logout,
};

export default AuthService;