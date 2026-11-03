import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// Layout compartilhado: a rota filha aparece no <Outlet />
export default function Layout() {
    return (
        <>
            <Navbar />
            <main className="container">
                <Outlet />
            </main>
            <footer className="rodape">Projeto exemplo · Criar Serviços Web com REST</footer>
        </>
    );
}
