# Task Manager App

Um aplicativo de gerenciamento de tarefas moderno, desenvolvido com React Native, Expo e TypeScript.

![Task Manager App](src/assets/images/icon.png)

## 📱 Sobre o Projeto

Task Manager é um aplicativo multiplataforma que permite aos usuários gerenciar suas tarefas diárias de forma eficiente. O aplicativo oferece funcionalidades de autenticação, criação, edição e remoção de tarefas, além de categorização por prioridade e status.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [React Query](https://tanstack.com/query/latest/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [MMKV](https://github.com/mrousavy/react-native-mmkv)
- [Axios](https://axios-http.com/)
- [Day.js](https://day.js.org/)

## 🗂️ Estrutura do Projeto

```
src/
├── assets/              # Imagens, fontes e outros recursos
├── components/          # Componentes reutilizáveis
│   ├── icons/           # Componentes de ícones SVG
│   └── TaskDetailSheet/ # Componente de detalhes de tarefas
├── hooks/               # Hooks personalizados
│   ├── auth/            # Hooks de autenticação
│   └── tabs/            # Hooks para as telas de tarefas
├── libs/                # Configuração de bibliotecas
├── providers/           # Providers de contexto React
├── services/            # Serviços de API
│   ├── auth/            # Serviços de autenticação
│   └── task/            # Serviços de tarefas
├── storage/             # Armazenamento local
├── store/               # Gerenciamento de estado global
├── types/               # Tipos TypeScript
│   ├── enums/           # Enumerações
│   └── models/          # Interfaces de dados
└── utils/               # Funções utilitárias

app/                     # Estrutura de rotas do Expo Router
├── (auth)/              # Rotas de autenticação
├── (tabs)/              # Rotas do menu principal
├── edit-task/           # Rota de edição de tarefas
└── task/                # Rota de visualização de tarefas
```

## 🚀 Funcionalidades

- **Autenticação**: Login e registro de usuários
- **Dashboard**: Visão geral das tarefas
- **Gerenciamento de Tarefas**: Criar, visualizar, editar e excluir tarefas
- **Filtros**: Filtrar tarefas por prioridade e status
- **Perfil**: Gerenciamento de dados do usuário

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- iOS Simulator ou Android Emulator para desenvolvimento local

## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://seu-repositorio/task-manager-app.git
   cd task-manager-app
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Inicie o aplicativo:
   ```bash
   npx expo start
   ```

## 🧪 Testes

Execute os testes automatizados:

```bash
yarn test
# ou
npm test
```

## 🔄 Fluxo de Trabalho de Desenvolvimento

1. Organize commits em grupos lógicos e pequenos para facilitar o entendimento
2. Utilize o padrão de commits convencional (feat, fix, chore, etc.)
3. Mantenha os testes atualizados para novas funcionalidades

## 📚 Documentação Adicional

- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 👥 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
