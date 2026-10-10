// Tela de cadastro e edição de serviço.

import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import BotaoPrincipal from '../components/BotaoPrincipal';
import CustomInput from '../components/CustomInput';
import SeletorCategoria from '../components/SeletorCategoria';
import {
  listarCategorias,
  obterOuCriarCategoria,
} from '../services/CategoriaService';
import { salvarServico } from '../services/ServicoService';
import { formStyles } from '../styles/FormStyles';
import { Categoria } from '../types/Categoria';
import { ServicoCompleto } from '../types/Servico';
import { avisar } from '../utils/Dialogos';

export default function FormScreen({ navigation, route }: any) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [preco, setPreco] = useState('');
  const [prazo, setPrazo] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [erroNovaCategoria, setErroNovaCategoria] = useState('');
  const [erros, setErros] = useState<Record<string, string>>({});

  // se veio um serviço, é edição; senão é cadastro novo
  const servicoEdicao: ServicoCompleto | undefined = route.params?.servico;

  // carrega as categorias
  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch(() => avisar('Erro', 'Não foi possível carregar as categorias.'));
  }, []);

  // na edição, preenche os campos
  useEffect(() => {
    if (!servicoEdicao) {
      return;
    }

    setNome(servicoEdicao.nome);
    setDescricao(servicoEdicao.descricao);
    setCategoriaId(servicoEdicao.categoriaId);
    setPreco(String(servicoEdicao.preco));
    setPrazo(String(servicoEdicao.prazo));
  }, [servicoEdicao]);

  // cria a categoria nova e já seleciona
  async function adicionarCategoria(): Promise<void> {
    const nomeLimpo = novaCategoria.trim();

    if (!nomeLimpo) {
      setErroNovaCategoria('Digite o nome da categoria.');
      return;
    }

    try {
      const categoria = await obterOuCriarCategoria(nomeLimpo);

      setCategorias(await listarCategorias());
      setCategoriaId(categoria.id);
      setNovaCategoria('');
      setErroNovaCategoria('');
      setErros((anteriores) => ({ ...anteriores, categoria: '' }));
    } catch (error) {
      avisar('Erro', 'Não foi possível salvar a categoria.');
    }
  }

  // confere os campos e guarda um erro por campo
  function validar(): boolean {
    const novosErros: Record<string, string> = {};

    if (!nome.trim()) {
      novosErros.nome = 'O nome do serviço é obrigatório.';
    }

    if (!descricao.trim()) {
      novosErros.descricao = 'A descrição é obrigatória.';
    }

    if (!categoriaId) {
      novosErros.categoria = 'Selecione uma categoria.';
    }

    const valor = Number(preco.replace(',', '.'));

    if (!preco.trim() || Number.isNaN(valor) || valor <= 0) {
      novosErros.preco = 'Informe um valor válido maior que zero.';
    }

    const dias = Number(prazo);

    if (!prazo.trim() || !Number.isInteger(dias) || dias <= 0) {
      novosErros.prazo = 'Informe um prazo inteiro maior que zero.';
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  // só salva se a validação passar
  async function salvar(): Promise<void> {
    if (!validar()) {
      return;
    }

    try {
      await salvarServico(
        {
          nome: nome.trim(),
          descricao: descricao.trim(),
          categoriaId,
          preco: Number(preco.replace(',', '.')),
          prazo: Number(prazo),
        },
        servicoEdicao?.id,
      );

      avisar(
        'Sucesso',
        servicoEdicao
          ? 'Serviço atualizado com sucesso!'
          : 'Serviço cadastrado com sucesso!',
        () => navigation.goBack(),
      );
    } catch (error) {
      avisar('Erro', 'Não foi possível salvar o serviço.');
    }
  }

  function cancelar(): void {
    navigation.goBack();
  }

  return (
    <ScrollView
      style={formStyles.container}
      contentContainerStyle={formStyles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={formStyles.header}>
        <Text style={formStyles.title}>
          {servicoEdicao ? 'Editar Serviço' : 'Novo Serviço'}
        </Text>
        <Text style={formStyles.subtitle}>
          {servicoEdicao
            ? 'Atualize os dados do serviço.'
            : 'Cadastre um novo serviço de serralheria.'}
        </Text>
      </View>

      <View style={formStyles.formCard}>
        <CustomInput
          label="Nome do serviço *"
          placeholder="Ex.: Portão de ferro"
          value={nome}
          onChangeText={setNome}
          error={erros.nome}
        />

        <SeletorCategoria
          label="Categoria *"
          categorias={categorias}
          selecionadaId={categoriaId}
          onSelecionar={setCategoriaId}
          error={erros.categoria}
        />

        <CustomInput
          label="Nova categoria (opcional)"
          placeholder="Ex.: Escadas"
          value={novaCategoria}
          onChangeText={(texto) => {
            setNovaCategoria(texto);
            setErroNovaCategoria('');
          }}
          error={erroNovaCategoria}
        />

        <BotaoPrincipal
          titulo="Adicionar categoria"
          variante="secundario"
          onPress={adicionarCategoria}
          style={formStyles.categoryButton}
        />

        <CustomInput
          label="Valor estimado (R$) *"
          placeholder="0,00"
          keyboardType="decimal-pad"
          value={preco}
          onChangeText={setPreco}
          error={erros.preco}
        />

        <CustomInput
          label="Prazo de execução (dias) *"
          placeholder="Ex.: 7"
          keyboardType="number-pad"
          value={prazo}
          onChangeText={setPrazo}
          error={erros.prazo}
        />

        <CustomInput
          label="Descrição *"
          placeholder="Descreva medidas, materiais e detalhes do serviço"
          multiline
          numberOfLines={5}
          value={descricao}
          onChangeText={setDescricao}
          error={erros.descricao}
        />

        <View style={formStyles.buttonContainer}>
          <BotaoPrincipal
            titulo="Cancelar"
            variante="secundario"
            onPress={cancelar}
            style={formStyles.buttonItem}
          />

          <BotaoPrincipal
            titulo={servicoEdicao ? 'Atualizar' : 'Salvar'}
            onPress={salvar}
            style={formStyles.buttonItem}
          />
        </View>
      </View>
    </ScrollView>
  );
}
