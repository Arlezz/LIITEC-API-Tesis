"use server";

import { get, post } from '../utils/httpClient';
import { NextResponse } from 'next/server';

export async function login (credential, password) {
    return post("/login", {
            credential,
            password
        })
        .then((response) => {

            console.log("LA RESPUESTA: ",response);

            return response;
        });
};

export async function register (username, name, lastName, email, password, type, superuser) {
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

export async function getKeys () {
    let allKeys = [];
    let currentPage = 1;

    try {
      while (true) {
        const data = await get(`/keys?page=${currentPage}&page_size=10`);
  
        if (!data.results || data.results.length === 0) {
          // No hay más resultados, salimos del bucle
          break;
        }
  
        allKeys.push(...data.results);
        
        // Verificar si hay más páginas
        if (currentPage >= data.totalPages) {
          break;
        }
  
        currentPage++;
      }
    } catch (error) {
      console.error('Error al obtener keys:', error);
    }
  
    return allKeys;
};

export async function getChannelsPlatform () {
  let allChannels = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(`/channels?page=${currentPage}&page_size=10`);

      if (!data.results || data.results.length === 0) {
        // No hay más resultados, salimos del bucle
        break;
      }

      allChannels.push(...data.results);
      
      // Verificar si hay más páginas
      if (currentPage >= data.totalPages) {
        break;
      }

      currentPage++;
    }
  } catch (error) {
    console.error('Error al obtener canales:', error);
  }

  return allChannels;
};

export async function getDevicesPlatform () {
  let allDevices = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(`/devices?page=${currentPage}&page_size=10`);

      if (!data.results || data.results.length === 0) {
        // No hay más resultados, salimos del bucle
        break;
      }

      allDevices.push(...data.results);
      
      // Verificar si hay más páginas
      if (currentPage >= data.totalPages) {
        break;
      }

      currentPage++;
    }
  } catch (error) {
    console.error('Error al obtener dispositivos:', error);
  }

  return allDevices;
};

export async function getUsersPlatform () {
  let allUsers = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(`/users?page=${currentPage}&page_size=10`);

      if (!data.results || data.results.length === 0) {
        // No hay más resultados, salimos del bucle
        break;
      }

      allUsers.push(...data.results);
      
      // Verificar si hay más páginas
      if (currentPage >= data.totalPages) {
        break;
      }

      currentPage++;
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }

  return allUsers;
};