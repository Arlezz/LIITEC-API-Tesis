"use server"

import axios from 'axios';

//import { getSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

async function authHeader() {

    const session = await getServerSession(authOptions)

    if (session?.user?.apiKey?.key) {
        return { 'Authorization': session.user.apiKey.key };
    } else {
        return {};
    }
}

const API = process.env.BASE_URL;

export async function get(url) {
    return axios.get(API + url, { headers: await authHeader() })
        .then(response => response.data);
}

export async function post(url, data) {
    return axios.post(API + url, data, { headers: await authHeader() })
        .then(response => response.data);
}

export async function put(url, data) {
    return axios.put(API + url, data, { headers: await authHeader() })
        .then(response => response.data);
}

export async function del(url) {
    return axios.delete(API + url, { headers: await authHeader() })
        .then(response => response.data);
}