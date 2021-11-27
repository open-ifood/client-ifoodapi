# Tratamento de respostas da API

Esse é um guia indicando o padrão utilizado para retornar uma situação de sucesso ou erro durante uma requisição.

Toda resposta retornará um [status code](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) que faz sentido com o resultado de uma requisição.

## Template de resposta à uma requisição
```js
{
    "status_code": 200, // "Número inteiro, refere-se ao código de estado de uma resposta no HTTP"
    "body": {  //"Dados retornados no corpo da resposta à uma requisição"
        "status": "success | fail",
        "message": "Mensagem auto-explicativa da ação que ocorreu",
        "data": {} // Dados retornados em uma resposta
    }
}
```

## Situação de sucesso
```js
{
    "status_code": 201,
    "body": {
        "status": "success",
        "message": "Sua conta foi autenticada com sucesso.",
        "data": {
            "token": "1212dihf8i239whyd1hd2hwd32398d2"
        }
    }
}
```

## Situação de erro
```js
{
    "status_code": 400,
    "body": {
        "status": "fail",
        "message": "Ocorreu um problema durante o envio do pedido"
    }
}
```
