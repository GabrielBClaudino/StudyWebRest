import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MensagemErro from '../components/MensagemErro';
export default function Login() {
    const { entrar } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', senha: '' });
    const [erros, setErros] = useState({});
    const [erroApi, setErroApi] = useState('');
    const [enviando, setEnviando] = useState(false);
    // Um único handler para todos os campos (usa o atributo name)
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    function validar() {
        const novos = {};
        if (!form.email) novos.email = 'Informe o e-mail';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) novos.email = 'E-mail inválido';
        if (form.senha.length < 6) novos.senha = 'A senha deve ter no mínimo 6 caracteres';
        setErros(novos);
        return Object.keys(novos).length === 0;
    }
    async function handleSubmit(e) {
        e.preventDefault(); // impede o recarregamento da página
        if (!validar()) return;
        setEnviando(true);
        setErroApi('');
        try {
            await entrar(form.email, form.senha);
            navigate('/livros');
        } catch (err) {
            setErroApi(err.message);
        } finally {
            setEnviando(false);
        }
    }
    return (
        <section className="painel painel--estreito">
            <h1>Entrar</h1>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
                {erros.email && <small className="erro-campo">{erros.email}</small>}
                <label htmlFor="senha">Senha</label>
                <input id="senha" name="senha" type="password" value={form.senha} onChange={handleChange}
                />
                {erros.senha && <small className="erro-campo">{erros.senha}</small>}
                <MensagemErro mensagem={erroApi} />
                <button className="btn" type="submit" disabled={enviando}>
                    {enviando ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <p className="dica">Teste: admin@biblioteca.com / admin123 · ana@biblioteca.com /
                leitor123</p>
        </section>
    );
}