import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const UserContext= createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState();
    const [checkUser, setCheckUser] = useState(true);
    const [userUpdated, setUserUpdated]= useState(false)

    useEffect(()=>{
        if (!user || userUpdated) {
            fetchUserData();
          }
    },[user, userUpdated])

    const fetchUserData = async () => {
        try {
          setCheckUser(true);
          const response = await axios.get(
            `http://localhost:5001/logged-in-user`,
            { withCredentials: true }
          );
          setUser(response.data.user);
          setUserUpdated(false);
          console.log(response.data.user.userId)
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setUser(null); 
          } else {
            console.log(error.message); 
          }
        } finally {
          setCheckUser(false);
        }
      };
      

    return (
        <UserContext.Provider value={{user, setUser,fetchUserData, checkUser}}>
            {children}
        </UserContext.Provider>
    )
}