# Client IFood API

Uma **Client API** para o IFood que permite **gerenciar multiplas** sessões no IFood Marketplace API de forma simples, concedendo a possibilidade de obter informações de conta, **enviar pedidos**, ver pedidos já feitos.

## Acesso rápido

Temos uma instância da aplicação rodando em um servidor. [Clique aqui]() e você poderá testar. =)

## Rodando o ambiente localmente

Antes de qualquer passo... Devemos configurar o ambiente de desenvolvimento para o projeto, configurando o editor de texto ou IDE, requisitos mínimos para o projeto... etc.

A API possui uma imagem docker pré-configurada, esse é um guia para você abrir a API localmente.

## Guias

Essa sessão contém diversos guias para a utilização da API.

### Básicos

- [Fazendo autenticação na API](./docs/authentication.md)

### Avançados

- [Tratando respostas da API](./docs/handle-status-response.md)

## Utilitarios

Para a construção concreta do projeto, mantendo padrões de desenvolvimento entre os colaboradores algumas ferramentas foram necessarias:

- [Typescript (primary language)](https://www.typescriptlang.org/)
- [Node.JS (javascript runtime)](https://nodejs.org/en/)
- [Husky (hooks manager)](https://typicode.github.io/husky/#/)
- [Prettier (code formatter)](https://prettier.io/)
- [DotEnv (environment variables manager)](https://www.npmjs.com/package/dotenv)
- [EditorConfig (config of development text editor)](https://editorconfig.org/)
- [Gitmoji (emojis represents action in git commit message)](https://gitmoji.dev/)

Algumas das ferramentas citadas acima fazem parte de extensoes presentes no editor [Visual Studio Code](https://code.visualstudio.com/)

Algumas das versões dos utilitarios citados acima estão dentro do arquivo `package.json`.
