# Guia para contribuição

Seja bem vindo colega, esse é mais um dos diversos repositórios onde você pode contribuir.. =), mas antes disso, aqui vai algumas dicas de como configurar o ambiente corretamente, para você poder desenvolver em um maior conforto e assertividade.

## Fluxo de desenvolvimento

Nós seguimos um dos fluxos mais comuns no desenvolvimento.

### Branchs principais

Existem duas branchs principais no repositório, a `master` e a `develop`, as demais branchs são referentes ao desenvolvimento especifico de alguma nova funcionalidade, melhoria ou correção.

**Atenção**: As duas branchs principais nunca poderão receber commits diretamente e serão barrados automaticamente pela politica de branch aplicada sobre elas.

Atente-se a criar uma nova branch a partir da branch principal para cada tarefa, resolução de issue em especifica. O nome da branch deve seguir o seguinte padrão:

#### Novas funcionalidades e melhorias

develop -> feature/<nome>

#### Correções

master -> fix/<nome>

### Iniciando novo desenvolvimento

Esse é um passo a passo que pode ser utilizado como exemplo:

#### Obtendo uma ISSUE

- ISSUE #33 - Inserir logs na aplicação (feature)

#### Clonando o projeto

`git clone git@github.com:leoelias023/client-ifoodapi.git`

#### Criando nova branch

Como no caso é a melhoria da aplicação com novos logs, então se trata de uma `feature`, logo, a branch principal a ser utilizada será a `develop`.

`git checkout develop`

`git checkout -b feature/melhoria-log`

#### Commitando alterações

A cada commit o hook gerenciado pelo husky será ativado, para formatador todo o código fonte com o prettier.

#### Subindo branch para remote

`git push --set-upstream origin feature/melhoria-log`

#### Criando o Pull Request

Basta acessar o repositório no github, navegar até Pull Request e criar um novo PR, selecionando nesse caso como exemplo a `target branch` como sendo a `develop` e a `feature/melhoria-log`.

## Configuração do ambiente

Para facilitar o desenvolvimento e manter o padrão de código proposto no projeto, aqui vão algumas configurações:

### Requerimentos

- Yarn (yarn config set workspaces-experimental true)

- [Node.JS >= v.14.6.0](https://nodejs.org/en/)

### Extensões do vscode

Permitindo a agilidade durante o desenvolvimento, essas são algumas extensões interessantes de serem aplicadas antes de iniciar a contribuição no projeto.

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

### Configuraçõe no vscode

#### Auto format on save

Caso não esteja habilitado e configurado, abra o menu de configurações do vscode utilizando o atalho: `ctrl + ,`, procure pela opçao `format on save` e habilite-a, também será necessário indicar o prettier como formatador padrão, para fazer isso procure pela opção `default formatter` e selecione a opção que contenha `esbenp.prettier-vscode`.

## Execução do projeto

Bem simples, basta utilizar dos scripts já configurados no `package.json`.

### Desenvolvimento

`npm dev`

### Produção

Para gerar o build apenas:

`npm build`

Para gerar o build da aplicação e executa-lo:

`npm start`

## Sinta-se livre para contribuir
