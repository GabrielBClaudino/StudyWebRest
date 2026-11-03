export default function Paginacao({ page, totalPages, onMudar }) {
    return (
        <div className="paginacao">
            <button className="btn btn--secundario" disabled={page <= 1} onClick={() => onMudar(page -
                1)}>
                ← Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button className="btn btn--secundario" disabled={page >= totalPages} onClick={() =>
                onMudar(page + 1)}>
                Próxima →
            </button>
        </div>
    );
}