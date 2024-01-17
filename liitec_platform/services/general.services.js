import { get, del, put } from '../utils/httpClient';
//import { cache } from 'react';

// const getChannels = (userId) => { //first page
//     return get(`/users/${userId}/channels`)
//     .then((response) => {
//         return response;
//     });
// }

const getChannels = async (userId, startPage = 1, endPage = Infinity, pageSize = 10) => {
    let allChannels = [];
  
    for (let page = startPage; page <= endPage; page++) {
      try {
        const data = await get(`/users/${userId}/channels?page=${page}&page_size=${pageSize}`);
  
        if (!data.results || data.results.length === 0) {
          break;
        }
  
        allChannels.push(...data.results);
      } catch (error) {
        // Evitar imprimir el error en la consola si es un error 404
        if (error.response && error.response.status === 404) {
          break;
        }
  
        console.error('Error al obtener canales:', error.response);
        break;
      }
    }
  
    return allChannels;
};


const getGuests = async (userId, startPage = 1, endPage = Infinity, pageSize = 10) => {
    let allKeys = [];
  
    for (let page = startPage; page <= endPage; page++) {
      try {
        const data = await get(`/keys/${userId}?page=${page}&page_size=${pageSize}`);
  
        if (!data.results || data.results.length === 0) {
          break;
        }
  
        // Filtra las claves que tienen el campo channelAccess
        const keysWithChannelAccess = data.results.filter(key => key.channelAccess);
  
        // Agrega las claves filtradas al arreglo total
        allKeys.push(...keysWithChannelAccess);
      } catch (error) {

        if (error.response && error.response.status === 404) {
            break;
        }

        console.error('Error al obtener claves:', error);
        break;
      }
    }
  
    return allKeys;
};

// const getDevices = (channelId) => {
//     return get(`/channels/${channelId}/devices`)
//     .then((response) => {
//         return response;
//     });
// }

const getDevices = async (channelId, startPage = 1, endPage = Infinity, pageSize = 10) => {
    let allDevices = [];
  
    for (let page = startPage; page <= endPage; page++) {
      try {
        const data = await get(`/channels/${channelId}/devices?page=${page}&page_size=${pageSize}`);
  
        if (!data.results || data.results.length === 0) {
          break;
        }
  
        allDevices.push(...data.results);
      } catch (error) {
        // Evitar imprimir el error en la consola si es un error 404
        if (error.response && error.response.status === 404) {
          break;
        }
  
        console.error('Error al obtener dispositivos:', error.response);
        break;
      }      
    }
  
    return allDevices;
};


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
    getDevices,
    getGuests,
};

export default GeneralService;