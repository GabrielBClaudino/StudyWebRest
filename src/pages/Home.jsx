import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Home() {
    const { usuario } = useAuth();
    return (
        <section className="hero">
            <h1>Bem-vindo(a) à Biblioteca{usuario ? `, ${usuario.nome}` : ''}!</h1>
            <p>Consulte o acervo, filtre por gênero e veja os detalhes de cada livro.</p>
            <Link className="btn" to={usuario ? '/livros' : '/login'}>
                {usuario ? 'Ver acervo' : 'Entrar'}
            </Link>
        </section>
    );
}