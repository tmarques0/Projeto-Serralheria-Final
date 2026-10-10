// Funções que tratam os serviços (listar, salvar, excluir...).

import { ID_USUARIO_PADRAO, obterSessao } from '../storage/AuthStorage';
import { gravarServicos, lerServicos } from '../storage/ServicoStorage';
import { listarCategorias } from './CategoriaService';
import { DadosServico, Servico, ServicoCompleto } from '../types/Servico';

const SERVICOS_INICIAIS: Servico[] = [
  {
    id: '1',
    nome: 'Portão de ferro',
    descricao: 'Fabricação e instalação de portão sob medida.',
    preco: 1850,
    prazo: 10,
    categoriaId: 'cat-1',
    usuarioId: ID_USUARIO_PADRAO,
  },
  {
    id: '2',
    nome: 'Grade de proteção',
    descricao: 'Grade metálica sob medida para janela ou muro.',
    preco: 680,
    prazo: 5,
    categoriaId: 'cat-2',
    usuarioId: ID_USUARIO_PADRAO,
  },
  {
    id: '3',
    nome: 'Corrimão metálico',
    descricao: 'Corrimão em metal para escada residencial.',
    preco: 520,
    prazo: 4,
    categoriaId: 'cat-3',
    usuarioId: ID_USUARIO_PADRAO,
  },
];

// lê os serviços; no primeiro uso cria os de exemplo
async function carregarServicosBase(): Promise<Servico[]> {
  const salvos = await lerServicos();

  if (salvos) {
    return salvos;
  }

  await listarCategorias();
  await gravarServicos(SERVICOS_INICIAIS);

  return SERVICOS_INICIAIS;
}

// junta cada serviço com o nome da categoria
export async function listarServicos(): Promise<ServicoCompleto[]> {
  const servicos = await carregarServicosBase();
  const categorias = await listarCategorias();

  return servicos.map((servico) => {
    const categoria = categorias.find((c) => c.id === servico.categoriaId);

    return {
      ...servico,
      categoriaNome: categoria ? categoria.nome : 'Sem categoria',
    };
  });
}

export async function buscarServicoPorId(
  id: string,
): Promise<ServicoCompleto | undefined> {
  const servicos = await listarServicos();

  return servicos.find((servico) => servico.id === id);
}

// sem id cria um serviço novo; com id atualiza
export async function salvarServico(
  dados: DadosServico,
  id?: string,
): Promise<Servico> {
  const servicos = await carregarServicosBase();

  if (id) {
    const existente = servicos.find((servico) => servico.id === id);

    if (!existente) {
      throw new Error('Serviço não encontrado.');
    }

    const atualizado: Servico = { ...existente, ...dados };

    await gravarServicos(
      servicos.map((servico) => (servico.id === id ? atualizado : servico)),
    );

    return atualizado;
  }

  const sessao = await obterSessao();
  const novo: Servico = {
    id: Date.now().toString(),
    ...dados,
    usuarioId: sessao ? sessao.id : ID_USUARIO_PADRAO,
  };

  await gravarServicos([...servicos, novo]);

  return novo;
}

export async function excluirServico(id: string): Promise<void> {
  const servicos = await carregarServicosBase();

  await gravarServicos(servicos.filter((servico) => servico.id !== id));
}

export async function obterResumo() {
  const servicos = await carregarServicosBase();
  const categorias = await listarCategorias();

  return {
    totalServicos: servicos.length,
    totalCategorias: categorias.length,
  };
}

// procura o texto no nome e na categoria
export function filtrarServicos(
  servicos: ServicoCompleto[],
  termo: string,
): ServicoCompleto[] {
  const busca = termo.trim().toLowerCase();

  return servicos.filter((servico) =>
    `${servico.nome} ${servico.categoriaNome}`.toLowerCase().includes(busca),
  );
}

export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}
