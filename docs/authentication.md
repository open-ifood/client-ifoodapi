# Autenticação

Esse é o passo a passo para fazer a autenticação da sua conta iFood na API, a primeiro momento, só existe a opção de autenticar utilizando seu e-mail do iFood.

Vale lembrar que todo endpoint segue nosso [padrão de respostas](./handle-status-response.md)

## 1. Enviando auth-token para e-mail

Esse primeiro passo será responsável por enviar um token de verificação para o seu e-mail.

### Requisição

```js
{
  "endpoint": "/auth",
  "method": "POST",
  "data": {
    "email": "example@email.com"
  }
}
```

### Resposta válida

```js
{
  "status_code": 201,
  "body": {
    "status": "success",
    "message": "Sua sessão foi iniciada no iFood com sucesso, por favor continue com o próximo passo da autenticação."
  }
}
```

### Resposta inválida

```js
{
  "status_code": 404,
  "body": {
    "status": "fail",
    "message": "O email não foi encontrado no iFood"
  }
}
```

## 2. Confirmando token recebido no e-mail

Caso o passo anterior tenha retornado o `status_code` 201, já está no momento de obtermos o [token](./token.md) recebido via e-mail.

### Requisição

```js
{
  "endpoint": "/confirm-auth",
  "method": "PATCH",
  "data": {
    "email": "example@email.com",
    "auth_code": "00011"
  }
}
```

### Resposta válida

```js
{
  "status_code": 201,
  "body": {
    "status": "success",
    "message": "Sessão autenticada 100%, agora você pode utilizar os endpoints privados",
    "data": {
      "mytoken": "fdd431d0a132954c617b2ff31e5ead8d" // Seu Bearer token que será utilizado nos endpoints privados
    }
  }
}
```

### Resposta inválida

```js
{
  "status_code": 400,
  "body": {
    "status": "fail",
    "message": "Token inválido, tente reiniciar começando pela primeira requisição da autenticação"
  }
}
```
