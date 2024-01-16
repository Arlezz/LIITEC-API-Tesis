import { get, del, put } from '../utils/httpClient';


const getUsers = () => {
    return get(`/users`)
    .then((response) => {
        return response;
    });
}


const getUser = (id) => {
    console.log("el id: ",id);
    return get(`/users/${id}`)
    .then((response) => {
        return response;
    });
}

const updateUserName = (email,name) => {
    return put(`users/update/${email}`,{
        name
    }).then((response) => {
        return response;
    });
}

const updateUserPassword = (email,oldPassword,password) => {
    return put(`users/${email}`,{
        oldPassword,
        password
    }).then((response) => {
        return response;
    });


}

const deleteUser = (email) => {
    return del(`users/${email}`)
    .then((response) => {
        return response;
    });
}


const UserService = {
    getUsers,
    getUser,
    updateUserName,
    updateUserPassword,
    deleteUser
};

export default UserService;