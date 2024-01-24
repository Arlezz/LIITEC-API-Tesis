"use server";

import { get, del, put } from '../utils/httpClient';



export async function getUser (id) {
    try {
        const response = await get(`/users/${id}`);
        return response;
    } catch (error) {
        // Manejo de errores
        console.error('Error fetching user:', error);
        throw error;
    }
}
