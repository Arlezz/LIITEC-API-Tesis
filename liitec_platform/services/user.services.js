import { get, del, put } from '../utils/httpClient';

// const getUsers = async () => {
//     try {
//         const response = await get(`/users`);
//         return response;
//     } catch (error) {
//         // Manejo de errores
//         console.error('Error fetching users:', error);
//         throw error; // Puedes lanzar el error para manejarlo en la capa superior
//     }
// }

const getUsers = async (startPage = 1, endPage = Infinity, pageSize = 10) => {
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

const getUser = async (id) => {
    try {
        const response = await get(`/users/${id}`);
        return response;
    } catch (error) {
        // Manejo de errores
        console.error('Error fetching user:', error);
        throw error;
    }
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

// Resto de las funciones con async/await

const UserService = {
    getUsers,
    getUser,
    //updateUserName,
    //updateUserPassword,
    //deleteUser
};

export default UserService;
