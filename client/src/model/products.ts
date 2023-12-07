import { api } from "./session";
import type { DataListEnvelope, DataEnvelope } from "./fetcher";

export interface Product {
    _id: string | string[];
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export function addProduct(product: Product): Promise<DataEnvelope<Product>> {
    return api("products", "POST", product); 
}

export function updateProduct(id: string | string[], product: Product): Promise<DataEnvelope<Product>> {
    return api(`products/${id}`, "PATCH", product);
}

export function deleteProduct(id: string | string[]): Promise<DataEnvelope<Product>> {
    return api(`products/${id}`, "DELETE")
}

export function getProducts(): Promise<DataListEnvelope<Product>> { 
    return api('products', "GET"); 
}

export function getProduct(id: string | string[]): Promise<DataEnvelope<Product>>{
    return api(`products/${id}`, "GET");
}