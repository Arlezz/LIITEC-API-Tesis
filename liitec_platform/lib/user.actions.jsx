"use server";

import { revalidatePath } from 'next/cache';
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

export async function updateUser (id, user) {
    try {
        const response = await put(`/users/${id}`, user);

        revalidatePath(`/profile`);

        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(error.response.data.message);
    }
}
