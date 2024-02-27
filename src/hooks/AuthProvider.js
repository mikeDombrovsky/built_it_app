import {createContext, useContext, useState} from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [refresh, setRefresh] = useState(Cookies.get('refresh'));

    const logIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            });
            const data = await response.json();
            if (data) {
                Cookies.set('token', data.access);
                Cookies.set('refresh', data.refresh);
                setToken(data.access);
                setRefresh(data.refresh);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const refreshTokens = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh: refresh,
                }),
            });
            const data = await response.json();
            if (data) {
                Cookies.set('token', data.access);
                Cookies.set('refresh', data.refresh);
                setToken(data.access);
                setRefresh(data.refresh);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const logOut = () => {
        Cookies.remove('token');
        Cookies.remove('refresh');
        setToken(null);
        setRefresh(null);
    };

    return (
        <AuthContext.Provider value={{token, refresh, logIn, refreshTokens, logOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;