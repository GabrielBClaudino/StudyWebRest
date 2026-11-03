import { autoresIniciais, livrosIniciais, usuariosFake } from '../data/dadosIniciais';
const esperar = (ms = 400) => new Promise((r) => setTimeout(r, ms));
const ler = (chave, padrao) => JSON.parse(localStorage.getItem(chave)) ?? padrao;
const salvar = (chave, valor) => localStorage.setItem(chave, JSON.stringify(valor));
const novoId = () => Math.random().toString(36).slice(2, 10);
function erroHttp(status, mensagem) {
    const e = new Error(mensagem);
    e.status = status;
    return e;
}
// ---------- AUTH ----------
export async function login(email, senha) {
    await esperar();
    const u = usuariosFake.find((x) => x.email === email && x.senha === senha);
    if (!u) throw erroHttp(401, 'E-mail ou senha incorretos');
    const { senha: _omit, ...usuario } = u;
    return { token: 'token-fake-' + u.id, usuario };
}
// ---------- AUTORES ----------
export async function listarAutores() {
    await esperar(200);
    return ler('autores', autoresIniciais);
}
// ---------- LIVROS ----------
export async function listarLivros({ titulo = '', genero = '', page = 1, limit = 4 } = {}) {
    await esperar();
    const autores = ler('autores', autoresIniciais);
    let livros = ler('livros', livrosIniciais);
    if (titulo) livros = livros.filter((l) => l.titulo.toLowerCase().includes(titulo.toLowerCase()));
    if (genero) livros = livros.filter((l) => l.genero === genero);
    const total = livros.length;
    const dados = livros
        .sort((a, b) => a.titulo.localeCompare(b.titulo))
        .slice((page - 1) * limit, page * limit)
        .map((l) => ({ ...l, autor: autores.find((a) => a._id === l.autor) })); // "populate"
    return { dados, total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) };
}
export async function buscarLivro(id) {
    await esperar();
    const livro = ler('livros', livrosIniciais).find((l) => l._id === id);
    if (!livro) throw erroHttp(404, 'Livro não encontrado');
    const autor = ler('autores', autoresIniciais).find((a) => a._id === livro.autor);
    return { ...livro, autor };
}
export async function criarLivro(dados) {
    await esperar();
    const livros = ler('livros', livrosIniciais);
    if (livros.some((l) => l.isbn === dados.isbn)) throw erroHttp(409, 'Já existe um livro com esse ISBN');
const novo = { ...dados, _id: novoId() };
    salvar('livros', [...livros, novo]);
    return novo;
}
export async function atualizarLivro(id, dados) {
    await esperar();
    const livros = ler('livros', livrosIniciais);
    if (!livros.some((l) => l._id === id)) throw erroHttp(404, 'Livro não encontrado');
    const atualizados = livros.map((l) => (l._id === id ? { ...l, ...dados, _id: id } : l));
    salvar('livros', atualizados);
    return atualizados.find((l) => l._id === id);
}
export async function removerLivro(id) {
    await esperar();
    salvar('livros', ler('livros', livrosIniciais).filter((l) => l._id !== id));
}