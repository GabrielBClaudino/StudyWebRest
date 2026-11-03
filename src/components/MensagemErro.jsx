export default function MensagemErro({ mensagem }) {
    if (!mensagem) return null;
    return <p className="estado estado--erro" role="alert">⚠️ {mensagem}</p>;
}