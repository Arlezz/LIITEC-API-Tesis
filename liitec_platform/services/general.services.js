import { get, del, put } from '../utils/httpClient';
//import { cache } from 'react';

const getChannels = (userId) => {
    return get(`/users/${userId}/channels`)
    .then((response) => {
        return response;
    });
}


const getDevices = (channelId) => {
    return get(`/channels/${channelId}/devices`)
    .then((response) => {
        return response;
    });
}


const getUser = (id) => {
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


const GeneralService = {
    getChannels,
    getDevices
};

export default GeneralService;