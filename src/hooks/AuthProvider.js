import {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => Cookies.get('token') ? Cookies.get('token') : null);
    const [refresh, setRefresh] = useState(() => Cookies.get('refresh') ? Cookies.get('refresh') : null);
    const [loading, setLoading] = useState(false);


    const register = async (username = null, email, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                await logIn(email, password)
            } else {
                console.log("register failed");
                const data = await response.json();
                alert(JSON.stringify(data))
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const logIn = async (email, password) => {

        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                Cookies.set('token', data.access);
                Cookies.set('refresh', data.refresh);
                console.log(data);
                setToken(data.access);
                setRefresh(data.refresh);
                return true;
            } else {
                console.log("login failed");
                alert("Invalid email or password")
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Oops, something went wrong")
        }
        return false;
    };

    const verifyToken = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/token/verify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                }),
            });
            const data = await response.json();
            if (data) {
                console.log(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const refreshTokens = () => {
        console.log(refresh, "refreshing tokens")
        if (!Cookies.get('refresh')) {
            return console.log('no refresh token found');
        }
        fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: Cookies.get('refresh'),
            }),
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            if (data.access && data.refresh) {
                Cookies.set('token', data.access);
                Cookies.set('refresh', data.refresh);
                setToken(data.access);
                setRefresh(data.refresh);
            } else {
                console.log(data);
                logOut()
            }

        }).catch(error => {
            console.error('Error:', error);
            logOut()
        })

    }

    const logOut = () => {

        fetch('http://localhost:8000/api/token/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refresh,
            }),
        }).then(response => {
            console.log(response.status);
        }).catch(error => {
            console.error('Error:', error);
        })

        Cookies.remove('token');
        Cookies.remove('refresh');
        setToken(null);
        setRefresh(null);
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (refresh) {
                refreshTokens()
            }
        }, 1000 * 60 * 55)
        return () => clearInterval(interval)
    }, [token, refresh, loading])

    return (
        <AuthContext.Provider value={{
            token,
            refresh,
            register,
            logIn,
            refreshTokens,
            verifyToken,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;