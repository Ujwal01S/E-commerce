import {useState, useEffect, createContext, useContext} from 'react';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [auth, setAuth ] = useState({
        user: null,
        token: ''
    });
    useEffect(() => {
        const data = localStorage.getItem('auth');

        if(data){
            const parsedData = JSON.parse(data);
            setAuth({
                ...auth,
                user : parsedData.user,
                token : parsedData.token
            });   
        }
    //eslint-disable-next-line    
    }, []);
            
    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
};

const useAuth = () => useContext(AuthContext);
export {useAuth, AuthProvider};