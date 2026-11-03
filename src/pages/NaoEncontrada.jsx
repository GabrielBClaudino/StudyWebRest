import { Link } from 'react-router-dom';
export default function NaoEncontrada() {
    return (
        <section className="hero">
            <h1>404</h1>
            <p>Página não encontrada.</p>
            <Link className="btn" to="/">Voltar ao início</Link>
        </section>
    );
}