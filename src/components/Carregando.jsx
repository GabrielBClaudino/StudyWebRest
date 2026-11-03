export default function Carregando({ texto = 'Carregando...' }) {
    return <p className="estado estado--carregando" role="status">⏳ {texto}</p>;
}