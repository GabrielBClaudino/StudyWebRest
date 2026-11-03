import { useEffect, useState } from 'react';
import { listarLivros } from '../services/mockApi';
import { GENEROS } from '../data/dadosIniciais';
import LivroCard from '../components/LivroCard';
import Paginacao from '../components/Paginacao';
import Carregando from '../components/Carregando';
import MensagemErro from '../components/MensagemErro';
export default function Livros() {
    const [filtros, setFiltros] = useState({ titulo: '', genero: '' });
    const [page, setPage] = useState(1);
    const [resultado, setResultado] = useState({ dados: [], totalPages: 1, total: 0 });
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    // Efeito: busca os livros sempre que filtros ou página mudarem
    useEffect(() => {
        let ativo = true; // evita atualizar estado de componente desmontado
        setCarregando(true);
        setErro('');
        listarLivros({ ...filtros, page })
            .then((res) => ativo && setResultado(res))
            .catch((err) => ativo && setErro(err.message))
            .finally(() => ativo && setCarregando(false));
        return () => { ativo = false; }; // limpeza
    }, [filtros, page]);
    function handleFiltro(e) {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
        setPage(1); // novo filtro sempre volta para a página 1
    }
    return (
        <section>
            <h1>Acervo <small>({resultado.total} livros)</small></h1>
            <div className="filtros">
                <input name="titulo" placeholder="Buscar por título..." value={filtros.titulo}
                    onChange={handleFiltro} />
                <select name="genero" value={filtros.genero} onChange={handleFiltro}>
                    <option value="">Todos os gêneros</option>
                    {GENEROS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
            </div>
            <MensagemErro mensagem={erro} />
            {carregando ? (
                <Carregando texto="Buscando livros..." />
            ) : resultado.dados.length === 0 ? (
                <p className="estado">Nenhum livro encontrado.</p>
            ) : (
                <div className="grade">
                    {resultado.dados.map((livro) => <LivroCard key={livro._id} livro={livro} />)}
                </div>
            )}
            <Paginacao page={page} totalPages={resultado.totalPages} onMudar={setPage} />
        </section>
    );
}

