import { createContext, useContext, useState } from 'react';
import * as api from '../services/mockApi';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {

    // Estado global: quem está logado (recupera do localStorage ao recarregar)
    const [usuario, setUsuario] = useState(() => JSON.parse(localStorage.getItem('usuario')));
    async function entrar(email, senha) {
        const { token, usuario } = await api.login(email, senha);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        setUsuario(usuario);
    }
    function sair() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUsuario(null);
    }
    const ehAdmin = usuario?.perfil === 'admin';
    return (
        <AuthContext.Provider value={{ usuario, ehAdmin, entrar, sair }}>
            {children}
        </AuthContext.Provider>
    );
}
// Hook personalizado: evita importar useContext + AuthContext em todo lugar
export function useAuth() {
    return useContext(AuthContext);
}