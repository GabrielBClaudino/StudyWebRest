import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarLivro, criarLivro, atualizarLivro, listarAutores } from '../services/mockApi';
import { GENEROS } from '../data/dadosIniciais';
import MensagemErro from '../components/MensagemErro';
const VAZIO = { titulo: '', isbn: '', genero: 'romance', ano: '', autor: '', disponivel: true };
export default function LivroForm() {
    const { id } = useParams(); // existe só na rota /livros/:id/editar
    const editando = Boolean(id);
    const navigate = useNavigate();
    const [form, setForm] = useState(VAZIO);
    const [autores, setAutores] = useState([]);
    const [erros, setErros] = useState({});
    const [erroApi, setErroApi] = useState('');
    useEffect(() => {
        listarAutores().then(setAutores);
        if (editando) {
            buscarLivro(id).then((l) => setForm({ ...l, autor: l.autor?._id ?? l.autor }));
        }
    }, [id, editando]);
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }
    function validar() {
        const novos = {};
        if (!form.titulo.trim()) novos.titulo = 'Título é obrigatório';
        if (!form.isbn.trim()) novos.isbn = 'ISBN é obrigatório';
        if (!form.autor) novos.autor = 'Selecione um autor';
        const ano = Number(form.ano);
        if (form.ano && (ano < 1450 || ano > new Date().getFullYear())) novos.ano = 'Ano inválido';
        setErros(novos);
        return Object.keys(novos).length === 0;
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!validar()) return;
        const dados = { ...form, ano: form.ano ? Number(form.ano) : undefined };
        try {
            if (editando) await atualizarLivro(id, dados);
            else await criarLivro(dados);
            navigate('/livros');
        } catch (err) {
            setErroApi(err.message);
        }
    }
    return (
        <section className="painel">
            <h1>{editando ? 'Editar livro' : 'Novo livro'}</h1>
            <form onSubmit={handleSubmit} noValidate className="form-grade">
                <div>
                    <label htmlFor="titulo">Título *</label>
                    <input id="titulo" name="titulo" value={form.titulo} onChange={handleChange} />
                    {erros.titulo && <small className="erro-campo">{erros.titulo}</small>}
                </div>
                <div>
                    <label htmlFor="isbn">ISBN *</label>
                    <input id="isbn" name="isbn" value={form.isbn} onChange={handleChange} />
                    {erros.isbn && <small className="erro-campo">{erros.isbn}</small>}
                </div>
                <div>
                    <label htmlFor="autor">Autor *</label>
                    <select id="autor" name="autor" value={form.autor} onChange={handleChange}>
                        <option value="">Selecione...</option>
                        {autores.map((a) => <option key={a._id} value={a._id}>{a.nome}</option>)}
                    </select>
                    {erros.autor && <small className="erro-campo">{erros.autor}</small>}
                </div>
                <div>
                    <label htmlFor="genero">Gênero</label>
                    <select id="genero" name="genero" value={form.genero} onChange={handleChange}>
                        {GENEROS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="ano">Ano</label>
                    <input id="ano" name="ano" type="number" value={form.ano} onChange={handleChange} />
                    {erros.ano && <small className="erro-campo">{erros.ano}</small>}
                </div>
                <label className="checkbox">
                    <input name="disponivel" type="checkbox" checked={form.disponivel}
                        onChange={handleChange} />
                    Disponível para empréstimo
                </label>
                <MensagemErro mensagem={erroApi} />
                <div className="acoes">
                    <button className="btn" type="submit">Salvar</button>
                    <button className="btn btn--secundario" type="button" onClick={() =>
                        navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </section>
    );
}