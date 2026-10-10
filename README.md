# Serralheria

Aplicativo mobile para gerenciamento de serviços de uma serralheria.

## Funcionalidades
- Login com validação
- Dashboard com resumo de serviços, nome do usuário logado e últimos serviços
- Cadastro e edição de serviços
- Lista com pesquisa
- Detalhes do serviço
- Exclusão de serviços
- Validação de formulário com mensagens de erro
- Persistência local com AsyncStorage

## Telas
1. Login
2. Dashboard
3. Novo Serviço (cadastro/edição)
4. Serviços (lista com pesquisa)
5. Detalhes do Serviço

## Tecnologias
React Native, Expo, TypeScript, React Navigation (native stack) e AsyncStorage.

## Estrutura do projeto
```
src/
├── components/   CustomInput, BotaoPrincipal, CardServico, SeletorCategoria
├── navigation/   Routes (stack de navegação e controle de sessão)
├── screens/      LoginScreen, DashboardScreen, FormScreen, ListScreen, DetalhesScreen
├── services/     ServicoService e CategoriaService (regras de negócio)
├── storage/      ServicoStorage, CategoriaStorage e AuthStorage (AsyncStorage)
├── styles/       StyleSheets de cada tela
├── types/        Servico e Categoria (tipos)
└── utils/        Dialogos (alertas e confirmações no celular e no navegador)
```

### Componentes reutilizáveis
- **CustomInput**: campo de texto com rótulo e mensagem de erro (Login e Formulário).
- **BotaoPrincipal**: botão com 2 estilos (primário e secundário) e estado de carregamento (Login, Formulário e Detalhes).
- **CardServico**: cartão de um serviço, com ações opcionais (Lista e Dashboard).
- **SeletorCategoria**: escolha da categoria do serviço por opções (Formulário).

## Dados
Os dados ficam no AsyncStorage do aparelho, em 3 entidades relacionadas:

| Entidade | Campos |
|---|---|
| **Usuario** | id (PK), nome, email, senha |
| **Categoria** | id (PK), nome |
| **Servico** | id (PK), nome, descricao, preco, prazo, categoriaId (FK), usuarioId (FK) |

Relacionamentos:
- Categoria 1 -------- N Servico (uma categoria possui vários serviços)
- Usuario 1 -------- N Servico (um usuário cadastra vários serviços)

No primeiro uso, 3 categorias e 3 serviços de exemplo são criados automaticamente.

## Execução
```bash
npm install
npx expo start --tunnel
```

## Autenticação
O aplicativo possui autenticação local para demonstração do projeto. A sessão é mantida com AsyncStorage e as telas internas só ficam disponíveis após login.

Usuário de demonstração:
- E-mail: `admin@serralheria.com`
- Senha: `123456`

O usuário pode encerrar a sessão pelo botão **Sair da conta** no Dashboard. Em um aplicativo de produção, a autenticação deverá ser substituída por um serviço seguro e as credenciais não devem ficar armazenadas em texto simples.
