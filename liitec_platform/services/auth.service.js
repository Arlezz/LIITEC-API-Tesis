import { post } from '../utils/httpClient';



const login = (credential, password) => {
    return post("/login", {
            credential,
            password
        })
        .then((response) => {
            localStorage.setItem("user", JSON.stringify(response));
            return response;
        });
};

const register = (email, name, role) => {
    return post("/signup", {
            email,
            name,
            role
        })
        .then((response) => {
            return response;
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