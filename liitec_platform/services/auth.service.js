
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


const AuthService = {
    register,
    login,
    getKeys
};

export default AuthService;