// Dados "fake" da Fase 1. Na Fase 2 eles virão da API (MongoDB).
export const autoresIniciais = [
    { _id: 'a1', nome: 'Machado de Assis', nacionalidade: 'Brasileira' },
    { _id: 'a2', nome: 'Clarice Lispector', nacionalidade: 'Brasileira' },
    { _id: 'a3', nome: 'J. R. R. Tolkien', nacionalidade: 'Britânica' },
];
export const livrosIniciais = [
    {
        _id: 'l1', titulo: 'Dom Casmurro', isbn: '978-85-001', genero: 'romance', ano: 1899,
        disponivel: true, autor: 'a1'
    },
    {
        _id: 'l2', titulo: 'Memórias Póstumas de Brás Cubas', isbn: '978-85-002', genero: 'romance',
        ano: 1881, disponivel: true, autor: 'a1'
    },
    {
        _id: 'l3', titulo: 'A Hora da Estrela', isbn: '978-85-003', genero: 'romance', ano: 1977,
        disponivel: true, autor: 'a2'
    },
    {
        _id: 'l4', titulo: 'O Hobbit', isbn: '978-85-004', genero: 'fantasia', ano: 1937, disponivel:
            true, autor: 'a3'
    },
    {
        _id: 'l5', titulo: 'O Senhor dos Anéis', isbn: '978-85-005', genero: 'fantasia', ano: 1954,
        disponivel: false, autor: 'a3'
    },
    {
        _id: 'l6', titulo: 'Quincas Borba', isbn: '978-85-006', genero: 'romance', ano: 1891,
        disponivel: true, autor: 'a1'
    },
    {
        _id: 'l7', titulo: 'Laços de Família', isbn: '978-85-007', genero: 'outro', ano: 1960,
        disponivel: true, autor: 'a2'
    },
];
export const usuariosFake = [
    { id: 'u1', nome: 'Admin', email: 'admin@biblioteca.com', senha: 'admin123', perfil: 'admin' },
    {
        id: 'u2', nome: 'Leitora Ana', email: 'ana@biblioteca.com', senha: 'leitor123', perfil:
            'leitor'
    },
];
export const GENEROS = ['romance', 'fantasia', 'tecnologia', 'historia', 'infantil', 'outro'];