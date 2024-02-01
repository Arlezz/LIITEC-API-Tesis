"use server";

import { get, del, put, post } from "../utils/httpClient";
import { revalidatePath } from "next/cache";



export async function getUserChannels (userId, page = 1, pageSize = 10) {
  try {
    const data = await get(
      `/users/${userId}/channels?page=${page}&page_size=${pageSize}`
    );

    if (!data.results || data.results.length === 0) {
      console.error(`La página ${page} no tiene resultados.`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(
      `Error al obtener la página ${page} de canales para el usuario ${userId}:`,
      error
    );
    return [];
  }
};

export async function getChannelDevices (channelId, page = 1, pageSize = 10) {
  try {
    const data = await get(
      `/channels/${channelId}/devices?page=${page}&page_size=${pageSize}`
    );

    if (!data.results || data.results.length === 0) {
      console.error(`La página ${page} no tiene resultados.`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(
      `Error al obtener la página ${page} de dispositivos para el canal ${channelId}:`,
      error
    );
    return [];
  }
};

export async function exportChannelData (channelId) {
  try {
    const data = await get(`/data/${channelId}/export`);

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

export async function getChannel (channelId) {
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
};

export async function getMyChannels (userId) {
  let allChannels = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(
        `/users/${userId}/channels?page=${currentPage}&page_size=10`
      );

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
    console.error("Error al obtener canales:", error);
  }

  return allChannels;
};

export async function getGuests(userId) {
  let allKeys = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(`/keys/${userId}?page=${currentPage}&page_size=10`);

      if (!data.results || data.results.length === 0) {
        // No hay más resultados, salimos del bucle
        break;
      }

      // Filtrar las keys que tienen un channelAccess y cuyo channelOwner es igual a userId
      const keysWithChannelAccessAndMatchingOwner = data.results.filter(
        (key) => key.channelAccess && key.channelOwner === userId
      );

      allKeys.push(...keysWithChannelAccessAndMatchingOwner);

      // Verificar si hay más páginas
      if (currentPage >= data.totalPages) {
        break;
      }

      currentPage++;
    }
  } catch (error) {
    console.error("Error al obtener invitados:", error);
  }

  return allKeys;
}

export async function getChannelsInvited() {
  let allKeys = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(`/channels/invited?page=${currentPage}&page_size=10`);

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
    console.error("Error al obtener invitados y propietarios:", error);
  }

  return allKeys;
}

export async function getChannelsInvitedPaginate(page = 1, pageSize = 10) {

  try {
    const data = await get(`/channels/invited?page=${page}&page_size=${pageSize}`);

    if (!data.results || data.results.length === 0) {
      console.error(`La página ${page} no tiene resultados.`);
      return [];
    }

    return data;

  } catch (error) {
    throw new Error(error.response.data.message);
  }

}


export async function getGuest (channelId, page = 1, pageSize = 10) {
  try {
    const data = await get(
      `/channels/${channelId}/guests?page=${page}&page_size=${pageSize}`
    );

    if (!data.results || data.results.length === 0) {
      console.error(`La página ${page} no tiene resultados.`);
      return [];
    }

    return data;
  } catch (error) {
    // Evitar imprimir el error en la consola si es un error 404
    if (error.response && error.response.status === 404) {
      console.error(
        `No se encontraron invitados para el canal ${channelId}.`
      );

      return [];
    }

    console.error(
      `Error al obtener la página ${page} de invitados para el canal ${channelId}:`,
      error
    );
    
    return [];
  }
}

export async function createGuest (channelId, guestData) {
  try {
      
      const data = await post(`/channels/${channelId}/guests`, guestData);
  
      revalidatePath(`/channels/${channelId}/keys`);
  
      return data;
  }
  catch (error) {
    //console.error(`Error al crear el invitado ${guestData.userId}:`, error);
    throw new Error(error.response.data.error);
  }

}

export async function getDevices (
  channelId,
  startPage = 1,
  endPage = Infinity,
  pageSize = 10
) {
  let allDevices = [];

  for (let page = startPage; page <= endPage; page++) {
    try {
      const data = await get(
        `/channels/${channelId}/devices?page=${page}&page_size=${pageSize}`
      );

      if (!data.results || data.results.length === 0) {
        break;
      }

      allDevices.push(...data.results);
    } catch (error) {
      // Evitar imprimir el error en la consola si es un error 404
      if (error.response && error.response.status === 404) {
        break;
      }

      console.error("Error al obtener dispositivos:", error.response);
      break;
    }
  }

  return allDevices;
};

export async function getMyDevices (channelId) {
  let allDevices = [];
  let currentPage = 1;

  try {
    while (true) {
      const data = await get(
        `/channels/${channelId}/devices?page=${currentPage}&page_size=10`
      );

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
      console.error(
        `No se encontraron dispositivos para el canal ${channelId}.`
      );
    } else {
      console.error("Error al obtener dispositivos:", error);
    }
  }

  return allDevices;
};

export async function getDevice (channelId, deviceId) {
  try {
    const data = await get(`/channels/${channelId}/devices/${deviceId}`);

    if (!data) {
      console.error(`No se encontró el dispositivo ${deviceId}.`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(`Error al obtener el dispositivo ${deviceId}:`, error);
    return [];
  }
}

export async function getDeviceData(deviceId, variable, page = 1, pageSize = 10) {
  try {
    const data = await get(
      `/data/${deviceId}?page=${page}&page_size=${pageSize}&variable=${variable}`
    );

    if (!data.results || data.results.length === 0) {
      console.error(`La página ${page} no tiene resultados.`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(
      error.response.data.error+`"${deviceId}"`+` in variable: "${variable}"`
    );
    return [];
  }
}

export async function updateDevice(channelId, deviceId, deviceData){
  try {
    const data = await put(`/channels/${channelId}/devices/${deviceId}`, {
      name: deviceData.name,
      description: deviceData.description,
      isActive: deviceData.status,
    });
    
    revalidatePath(`/channels/${channelId}/devices/${deviceId}`);
    
    return data;
    
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export async function deleteDevice (item) {
  try{
    const data = await del(`/channels/${item.channelId}/devices/${item.deviceId}`);
    revalidatePath(`/channels/${item.channelId}`);
    return data;
  } catch (error) {
    console.error(`Error al eliminar el dispositivo ${item.deviceId}:`, error);
    throw new Error(error.response.data.message);
  }
}


export async function deleteChannel (item) {
  try{



    const data = await del(`/channels/${item.channelId}`);
    revalidatePath(`/channels`);
    return data;
  } catch (error) {
    console.error(`Error al eliminar el canal ${channelId}:`, error);
    //throw new Error(error.response.data.message);
  }
}

export async function createChannel (userId, channelData) {
  try {

    const data = await post("/channels", {
      name: channelData.name,
      description: channelData.description,
      project: channelData.project,
      ubication: {
        latitude: channelData.latitude,
        longitude: channelData.longitude,
      },
      isActive: channelData.status,
      isPublic: channelData.visibility,
      owner: userId,
    });

    revalidatePath(`/channels`);

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getPublicChannels (page = 1, pageSize = 10) {
  try {

    const data = await get(`/channels/public?page=${page}&page_size=${pageSize}`);

    if (!data.results || data.results.length === 0) {
      console.error(`La página ${page} no tiene resultados.`);
      return [];
    }

    return data;

  } catch (error) {
    throw new Error(error.response.data.message);
  }
}


export async function createDevice (channelId, deviceData) {
  try {

    const data = await post(`/channels/${channelId}/devices`, deviceData);

    revalidatePath(`/channels/${channelId}/devices`);

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateChannel(channelId, channelData) {
  try {
    const data = await put(`/channels/${channelId}`, {
      name: channelData.name,
      description: channelData.description,
      project: channelData.project,
      ubication: {
        latitude: channelData.latitude,
        longitude: channelData.longitude,
      },
      isActive: channelData.status,
      isPublic: channelData.visibility,
    });
    
    revalidatePath(`/channels/${channelId}`);
    
    return data;
    
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
