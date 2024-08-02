import { useState, useEffect } from "react";
import { useAuth } from '../../Context/auth';
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(()=> {
        const authCheck = async() => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`, {
                headers:{
                    "Authorization" : auth?.token
                }
            }
            )
            if (res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }

        };
        if(auth?.token) authCheck(); 

    }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner path=""/>;
};

//backend ma requiredSingIn ma authenticate garna pathako ho yesma backend lae response pathauxa
//jun chai hamiley res ma capture garya chau ani if check ma haley ra verified logic pathauchau

//token chaina vaney spinner purauha