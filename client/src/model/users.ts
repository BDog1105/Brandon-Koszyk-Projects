
import { api } from "./session";
export interface User {
  _id?: string,
  firstName: string,
  lastName: string,
  time: string,
  email: string,
  password: string,
  role: "admin" | "user",
  token?: string,
  username: string,
  image: string,
  workout: any,
  coordinate?: number,
  distance?: string,
  duration?: string,
  picture?: string
}

export function getUsers(): Promise< User[]> {
    return api("users"); 
  }
  
  export async function getUserByEmail(email: string): Promise<User | undefined> {
    const users = await getUsers();
    return users.find( x => x.email === email );
  }