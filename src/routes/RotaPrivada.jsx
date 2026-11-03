import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Protege rotas: sem login -> vai para /login; perfil errado -> volta para /livros
export default function RotaPrivada({ perfil }) {
    const { usuario } = useAuth();
    if (!usuario) return <Navigate to="/login" replace />;
    if (perfil && usuario.perfil !== perfil) return <Navigate to="/livros" replace />;
    return <Outlet />;
}