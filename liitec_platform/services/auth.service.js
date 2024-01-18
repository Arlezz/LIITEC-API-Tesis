
import { get, post } from '../utils/httpClient';
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

const getKeys = async (startPage = 1, endPage = Infinity, pageSize = 10) => {
    let allKeys = [];
  
    for (let page = startPage; page <= endPage; page++) {
      try {
        const data = await get(`/keys?page=${page}&page_size=${pageSize}`);
  
        if (!data.results || data.results.length === 0) {
          break;
        }
  
        allKeys.push(...data.results);
      } catch (error) {
        
        if (error.response && error.response.status === 404) {
            break;
        }

        console.error('Error al obtener keys:', error);
        break;
      }
    }
  
    return allKeys;
};

const getChannelsPlatform = async (startPage = 1, endPage = Infinity, pageSize = 10) => {
  let allChannels = [];

  for (let page = startPage; page <= endPage; page++) {
    try {
      const data = await get(`/channels?page=${page}&page_size=${pageSize}`);

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

const getDevicesPlatform = async (startPage = 1, endPage = Infinity, pageSize = 10) => {
  let allDevices = [];

  for (let page = startPage; page <= endPage; page++) {
    try {
      const data = await get(`/devices?page=${page}&page_size=${pageSize}`);

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

const getUsersPlatform = async (startPage = 1, endPage = Infinity, pageSize = 10) => {
  let allUsers = [];

  for (let page = startPage; page <= endPage; page++) {
    try {
      const data = await get(`/users?page=${page}&page_size=${pageSize}`);

      if (!data.results || data.results.length === 0) {
        break;
      }

      // Agrega los usuarios de la página actual al arreglo total
      allUsers.push(...data.results);
    } catch (error) {
      
      if (error.response && error.response.status === 404) {
          break;
      }

      console.error('Error al obtener usuarios:', error);
      break;
    }
  }

  return allUsers;
};


const AuthService = {
    register,
    login,
    getKeys,
    getChannelsPlatform,
    getDevicesPlatform,
    getUsersPlatform
};

export default AuthService;