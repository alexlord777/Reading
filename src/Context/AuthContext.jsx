import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, verityTokenRequet,logoutRequest } from "../api/auth";
import Cookie from 'js-cookie'
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth most be used with in AuthProvider")
    }

    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [errors, setErrors] = useState([]);
    const [loading,setLoading]= useState(true);

    const singup = async (user) => {
        try {
            const res = await registerRequest(user);
            if (res.status === 200) {

                setUser(res.data);
                setAuthenticated(true);
            }
        } catch (error) {
            setErrors(error.response.data.message)
            console.log(error.response.data.message);
        }
    }


    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            if (res.status === 200) {
                setUser(res.data);
                setAuthenticated(true);
                alert(`Hola ${res.data.username}`)
            }
        } catch (error) {
            console.log(error.response.data.message);
            setErrors(error.response.data.message)
            
        }
    }

    const logout= async()=>{
        Cookies.remove("token");
        setUser(null);
        setAuthenticated(false);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors]);

    useEffect(() => {
        async function checklogin() {
            const cookie = Cookie.get();

            if (!cookie.token) {
                setAuthenticated(false);
                setLoading(false)
            }
            try {
                const res = await verityTokenRequet(cookie.token)

                if (!res.data)return setAuthenticated(false)


                setLoading(false)
                setAuthenticated(true)
                setUser(res.data)
            } catch (error) {
                setAuthenticated(false);
                setUser(null);
            }
        }
        checklogin();
    }, [])
    return (
        <AuthContext.Provider value={{ login, singup,logout, user, isAuthenticated, errors,loading }}>
            {children}
        </AuthContext.Provider>
    )
}