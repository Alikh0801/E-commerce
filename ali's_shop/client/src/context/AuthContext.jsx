import { createContext, useState, useEffect, useContext } from 'react';
import { getMe, loginUser, logoutUser } from '../api/authService';


const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // Sehifede refresh olanda tokeni saxliyir
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await getMe();

                if (response.data.ok) {
                    setUser(response.data.user);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    // login
    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);

            if (response.data.ok) {
                setUser(response.data.user);
            }
            return response.data;
        } catch (error) {
            return {
                ok: false,
                message: error.response?.data?.message || "E-mail və ya şifrə yanlışdır!"
            };
        }
    }

    // logout
    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);

        } catch (error) {
            console.error("Logout zamanı xəta:", error);
        }
    }

    return (
        <authContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </authContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);