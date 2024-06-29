import { createContext,useContext,useState } from "react";
import { loginRequest,registerRequest } from "../api/auth";

export const AuthContext=createContext();

export const useAuth=()=>{
    const context=useContext(AuthContext);

    if(!context){
        throw new Error("useAuth most be used with in AuthProvider")
    }

    return context;
}

export const AuthProvider=({children})=>{
    const [user,setUser]= useState(null);
    const [isAuthenticated, setAuthenticated]=useState(false)
    const [errors,setErrors]= useState([]);

    const singup=async(user)=>{
       try {
        const res=await registerRequest(user);
        if(res.status===200){
            
            setUser(res.data);
            setAuthenticated(true);
        }   
       } catch (error) {
        setErrors(error.response.data.message)
        console.log(error.response.data.message);
       }
    }


    const login=async(user)=>{
        try {
            const res=await loginRequest(user);
            if(res.status===200){
                console.log(res);
                setUser(res.data);
                setAuthenticated(true);
            }   
           } catch (error) {
            setErrors(error.response.data.message)
            console.log(error.response.data.message);
           }
    }
    return(
        <AuthContext.Provider value={{login,singup,user,isAuthenticated,errors}}>
            {children}
        </AuthContext.Provider>
    )
}