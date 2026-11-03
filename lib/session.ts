import {auth} from "@/lib/auth"
import { headers } from "next/headers";// Get the session from the request headers to determine if the user
// is Login or not
export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  }); //server function to get the session from the request headers

  if(!session) {    
    return null; 
    }

  return session;// Return the session object
}