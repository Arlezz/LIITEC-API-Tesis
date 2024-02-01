"use server";

import { get, post, put, del } from '../utils/httpClient';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';


export async function login (credential, password) {
    return post("/login", {
            credential,
            password
        })
        .then((response) => {
            return response;
        });
};

export async function register (userData) {

  try {

      const response = await post("/users",userData);

      revalidatePath(`/admin/users`);

      return response;
  } catch (error) {
      console.error('Error creating user:', error.response.data.error);
      throw new Error(error.response.data.error);
  }    
};

export async function deleteUser (item) {

  try {

      const response = await del(`/users/${item._id}`);

      revalidatePath(`/admin/users`);

      return response;
  } catch (error) {
      console.error('Error deleting user:', error.response.data.error);
      throw new Error(error.response.data.error);
  }    
}

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

export async function getUsersAdmin (page) {

  try {
    const data = await get(`/users?page=${page}&page_size=10`);

    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error(error.response.data.message);
  }
};

export async function getDevicesAdmin (page) {

  try {
    const data = await get(`/devices?page=${page}&page_size=10`);

    return data;
  } catch (error) {
    console.error('Error al obtener dispositivos:', error);
    throw new Error(error.response.data.message);
  }
};

export async function getChannelsAdmin (page) {
  
    try {
      const data = await get(`/channels?page=${page}&page_size=10`);
  
      return data;
    } catch (error) {
      console.error('Error al obtener canales:', error);
      throw new Error(error.response.data.message);
    }
};

export async function getKeysAdmin (page) {
    
    try {
      const data = await get(`/keys?page=${page}&page_size=10`);
  
      return data;
    } catch (error) {
      console.error('Error al obtener keys:', error);
      throw new Error(error.response.data.message);
    }
  
}

export async function deleteDevice (item) {
    try {
        const response = await del(`/channels/${item.channelId}/devices/${item.deviceId}`);
  
        revalidatePath(`/admin/devices`);
  
        return response;
    } catch (error) {
        console.error('Error deleting device:', error.response.data.error);
        throw new Error(error.response.data.error);
    }    
}

export async function deleteChannel (item) {
  try {
      const response = await del(`/channels/${item.channelId}`);
      
      revalidatePath(`/admin/channels`);

      return response;
  } catch (error) {
      console.error('Error deleting channel:', error.response.data.error);
      throw new Error(error.response.data.error);
  }    
}

export async function updateKey (id, isUpdate) {
  try {
      const response = await put(`/users/${id}`, isUpdate);

      //revalidatePath(`/profile/api-credentials`);

      

      return response;
  } catch (error) {
      console.error('Error updating key:', error);
      throw new Error(error.response.data.message);
  }
}