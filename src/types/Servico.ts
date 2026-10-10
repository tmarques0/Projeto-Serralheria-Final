// Formato dos dados do serviço.

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  prazo: number;
  categoriaId: string;
  usuarioId: string;
}

export interface ServicoCompleto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  prazo: number;
  categoriaId: string;
  usuarioId: string;
  categoriaNome: string;
}

export interface DadosServico {
  nome: string;
  descricao: string;
  preco: number;
  prazo: number;
  categoriaId: string;
}
