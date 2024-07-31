import {useState, createContext, useContext} from 'react';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [auth, setAuth ] = useState({
        user: null,
        token: ''
    });
    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
};

const useAuth = () => useContext(AuthContext);
export {useAuth, AuthProvider};