import { reactive } from "vue";
import * as fetcher from './myFetch';

export interface User {
    _id: string;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    token?: string;
    role?: string;
}

const session = reactive({
    user: null as User | null
});

export function api(url: string, method: string, data?: any, headers?: any ) {

    if(session.user?.token){
        headers = {
            "Authorization": `Bearer ${session.user.token}`,
            ...headers,
        }
    }

    return fetcher.rest(url, method, data, headers)
        .catch(err => {
            console.error({err});
        })
}

export function useSession() {
    return session;
}

export async function useLogin(email: string | undefined, password: string | undefined) {
    const userData = {
        email: email,
        password: password
    }

    const response = await api("users/login", "POST", userData); //change this to userData after testing
    session.user = response.data.user; //update the user
    if(session.user) {
        session.user.token = response.data.token;
    }
    return response;
}

export function useLogout() {
    session.user = null; 
}

export async function createUser(name: string, email: string, password: string) {
    const newUser = {
        name: name,
        email: email,
        password: password,
        role: "user"
    } as User

    const response = await api("users/", 'POST', newUser);
                     await useLogin(email, password);

    return response;
}

export async function deleteUser(id: string) {
    return api(`users/${id}`, "DELETE")
}

export async function getAllUsers() {
    const response = await api("users/", 'GET');
    return response;
}

//returns whatever entries have searchTerm in its 
export async function searchUsers(searchTerm: string) {
    const response = await api(`users/search/${searchTerm}`, 'GET')
    return response;
}