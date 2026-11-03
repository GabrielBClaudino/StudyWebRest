import { Link } from 'react-router-dom';
// Componente reutilizável que recebe dados via props
export default function LivroCard({ livro }) {
    return (
        <article className="card">
            <span className={`selo ${livro.disponivel ? 'selo--ok' : 'selo--off'}`}>
                {livro.disponivel ? 'Disponível' : 'Emprestado'}
            </span>
            <h3 className="card__titulo">{livro.titulo}</h3>
            <p className="card__autor">{livro.autor?.nome}</p>
            <p className="card__meta">{livro.genero} · {livro.ano}</p>
            <Link className="btn" to={`/livros/${livro._id}`}>Ver detalhes</Link>
        </article>
    );
}