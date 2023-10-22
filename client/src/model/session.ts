/* B"H
*/
import { reactive } from "vue";
import { type User, getUserByEmail } from "./users";
import { useRouter } from "vue-router"

const session = reactive({
  user: null as User | null,
  redirectUrl: null as string | null,
})



export function getSession(){
  return session;
}

export function useLogin(){
  const router = useRouter();


return{
  login(email: string, password: string): User | null (
  const user = getUserByEmail(email);
  if(user && user.password === password){
    session.user = user;
    router.push(session.redirectUrl || "/");
    return user;
  }
  return null;
  )
}
}
export function logout(){
  session.user = null;
}