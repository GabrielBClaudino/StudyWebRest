import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import RotaPrivada from './routes/RotaPrivada';
import Home from './pages/Home';
import Login from './pages/Login';
import Livros from './pages/Livros';
import LivroDetalhe from './pages/LivroDetalhe';
import LivroForm from './pages/LivroForm';
import NaoEncontrada from './pages/NaoEncontrada';
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* Rotas protegidas: precisa estar logado */}
            <Route element={<RotaPrivada />}>
              <Route path="/livros" element={<Livros />} />
              <Route path="/livros/:id" element={<LivroDetalhe />} />
            </Route>
            {/* Rotas só para admin */}
            <Route element={<RotaPrivada perfil="admin" />}>
              <Route path="/livros/novo" element={<LivroForm />} />
              <Route path="/livros/:id/editar" element={<LivroForm />} />
            </Route>
            <Route path="*" element={<NaoEncontrada />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
