
import { post } from '../utils/httpClient';
import { NextResponse } from 'next/server';



const login = (credential, password) => {
    return post("/login", {
            credential,
            password
        })
        .then((response) => {
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


const AuthService = {
    register,
    login,
};

export default AuthService;