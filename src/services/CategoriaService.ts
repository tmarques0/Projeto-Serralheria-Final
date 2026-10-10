// Funções que tratam as categorias.

import { lerCategorias, gravarCategorias } from '../storage/CategoriaStorage';
import { Categoria } from '../types/Categoria';

const CATEGORIAS_INICIAIS: Categoria[] = [
  { id: 'cat-1', nome: 'Portões' },
  { id: 'cat-2', nome: 'Grades' },
  { id: 'cat-3', nome: 'Corrimãos' },
];

export async function listarCategorias(): Promise<Categoria[]> {
  const salvas = await lerCategorias();

  if (salvas) {
    return salvas;
  }

  await gravarCategorias(CATEGORIAS_INICIAIS);

  return CATEGORIAS_INICIAIS;
}

// usa a categoria se já existir; senão cria
export async function obterOuCriarCategoria(nome: string): Promise<Categoria> {
  const nomeLimpo = nome.trim();
  const categorias = await listarCategorias();
  const existente = categorias.find(
    (categoria) => categoria.nome.toLowerCase() === nomeLimpo.toLowerCase(),
  );

  if (existente) {
    return existente;
  }

  const nova: Categoria = {
    id: `cat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    nome: nomeLimpo,
  };

  await gravarCategorias([...categorias, nova]);

  return nova;
}
