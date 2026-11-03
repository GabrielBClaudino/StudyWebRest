import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
    const { usuario, ehAdmin, sair } = useAuth();
    const navigate = useNavigate();
    function handleSair() {
        sair();
        navigate('/login');
    }
    return (
        <header className="navbar">
            <NavLink to="/" className="navbar__marca">📚 Biblioteca</NavLink>
            <nav className="navbar__links" aria-label="Principal">
                <NavLink to="/livros" end>Livros</NavLink>
                {ehAdmin && <NavLink to="/livros/novo">Novo livro</NavLink>}
            </nav>
            {usuario && (
                <div className="navbar__usuario">
                    <span>{usuario.nome} <small>({usuario.perfil})</small></span>
                    <button className="btn btn--secundario" onClick={handleSair}>Sair</button>
                </div>
            )}
        </header>
    );
}