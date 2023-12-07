const API_URL = import.meta.env.VITE_API_URL;
import { useSession } from './session';

export type DataEnvelope<T> = {
    data: T,
    isSuccess: boolean,
    error?: string
}

export type DataListEnvelope<T> = DataEnvelope<T[]> & { 
    total: number
}

export async function rest(url: string, method: string, data?: any, headers?: any ){
    
    const response = await fetch(API_URL + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: data ? JSON.stringify(data) : undefined
    });
    return await (response.ok ? response.json() : response.json().then(x => { throw ({ ...x, message: x.error }); }));
}