# Adicionar novo endereço de entrega

Esse endpoint fornece a possibilidade de inserir um novo endereço de entrega.

## Requisição

```js
{
  "endpoint": "/me/address",
  "method": "PUT",
  "headers": {
    "authorization": "<your_token_authentication>"
  },
  "body": {
    "address": {
      "city": "São Paulo",
      "state": "SP",
      "country": "BR",
      "streetName": "R. São Paulo",
      "neighborhood": "Liberdade",
      "coordinates": {
        "latitude": -23.5568322,
        "longitude": -46.629797
      },
      "postalCode": "01513-000",
      "provider":"GOOGLE"
	  }
  }
}
```

## Resposta válida

```js
{
  "status": "success",
  "data": {
    "success": true,
    "message": "Operação realizada com sucesso",
    "id": "03c0622d-4700-4aac-8ef9-913a1ac04d66",
    "externalId": 561890551,
    "city": "São Paulo",
    "state": "SP",
    "country": "BR",
    "streetName": "R. São Paulo",
    "neighborhood": "Liberdade",
    "coordinates": {
      "latitude": -23.5568322,
      "longitude": -46.629797
    },
    "postalCode": "01513-000",
    "provider": "GOOGLE"
  }
}
```