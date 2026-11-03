import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buscarLivro, removerLivro } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import Carregando from '../components/Carregando';
import MensagemErro from '../components/MensagemErro';
export default function LivroDetalhe() {
    const { id } = useParams(); // parâmetro dinâmico da URL /livros/:id
    const navigate = useNavigate();
    const { ehAdmin } = useAuth();
    const [livro, setLivro] = useState(null);
    const [erro, setErro] = useState('');
    useEffect(() => {
        buscarLivro(id).then(setLivro).catch((e) => setErro(e.message));
    }, [id]);
    async function handleRemover() {
        if (!window.confirm(`Remover "${livro.titulo}"?`)) return;
        await removerLivro(id);
        navigate('/livros');
    }
    if (erro) return <MensagemErro mensagem={erro} />;
    if (!livro) return <Carregando />;
    return (
        <section className="painel">
            <button className="btn btn--secundario" onClick={() => navigate(-1)}>← Voltar</button>
            <h1>{livro.titulo}</h1>
            <dl className="detalhes">
                <dt>Autor</dt><dd>{livro.autor?.nome}</dd>
                <dt>Gênero</dt><dd>{livro.genero}</dd>
                <dt>Ano</dt><dd>{livro.ano}</dd>
                <dt>ISBN</dt><dd>{livro.isbn}</dd>
                <dt>Situação</dt><dd>{livro.disponivel ? 'Disponível' : 'Emprestado'}</dd>
            </dl>
            {ehAdmin && (
                <div className="acoes">
                    <Link className="btn" to={`/livros/${id}/editar`}>Editar</Link>
                    <button className="btn btn--perigo" onClick={handleRemover}>Remover</button>
                </div>
            )}
        </section>
    );
}