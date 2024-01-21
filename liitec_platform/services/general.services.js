import { get, del, put } from '../utils/httpClient';



const getUserChannels = async (userId, page = 1, pageSize = 10) => {
  try {
    const data = await get(`/users/${userId}/channels?page=${page}&page_size=${pageSize}`);

    if (!data.results || data.results.length === 0) {
      console.error(`La página ${page} no tiene resultados.`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(`Error al obtener la página ${page} de canales para el usuario ${userId}:`, error);
    return [];
  }
};

const getChannel = async (channelId) => {
  try {
    const data = await get(`/channels/${channelId}`);

    if (!data) {
      console.error(`No se encontró el canal ${channelId}.`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(`Error al obtener el canal ${channelId}:`, error);
    return [];
  }

}

const getMyChannelsDasboard = async (userId) => {
  let allChannels = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(`/users/${userId}/channels?page=${currentPage}&page_size=10`);

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


const getGuestsDashboard = async (userId) => {
    let allKeys = [];
    let currentPage = 1;

    try {
      while (true) {
        const data = await get(`/keys/${userId}?page=${currentPage}&page_size=10`);

        if (!data.results || data.results.length === 0) {
          // No hay más resultados, salimos del bucle
          break;
        }

        const keysWithChannelAccess = data.results.filter(key => key.channelAccess);


        allKeys.push(...keysWithChannelAccess);
        
        // Verificar si hay más páginas
        if (currentPage >= data.totalPages) {
          break;
        }

        currentPage++;
      }
    } catch (error) {
      console.error('Error al obtener invitados:', error);
    }
  
    return allKeys;
};


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

const getMyDevicesDashboard = async (channelId) => {
  let allDevices = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(`/channels/${channelId}/devices?page=${currentPage}&page_size=10`);

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
    // Manejar el error específico 404
    if (error.response && error.response.status === 404) {
      console.error(`No se encontraron dispositivos para el canal ${channelId}.`);
    } else {
      console.error('Error al obtener dispositivos:', error);
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
    
    getMyChannelsDasboard,
    getMyDevicesDashboard,
    getGuestsDashboard,
    getUserChannels,
    getChannel,
};

export default GeneralService;