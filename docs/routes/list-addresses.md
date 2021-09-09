# Listagem de endereços cadastrados

Esse **endpoint** lista todos os endereços cadastrados em sua conta previamente autorizada.

## Requisição

```js
{
  "endpoint": "/me/addresses",
  "method": "GET",
  "header": {
    "authorization": "<your_token_authentication>"
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
    "addresses": [
      {
        "id": "03c0622d-4700-4aac-8ef9-913a1ac04d66",
        "externalId": 561890551,
        "accountId": "4c4e8678-ccbb-476c-8705-3a656f899995",
        "alias": null,
        "favorite": false,
        "country": "BR",
        "state": "SP",
        "city": "São Paulo",
        "neighborhood": "Liberdade",
        "streetName": "R. São Paulo",
        "streetNumber": null,
        "complement": null,
        "reference": null,
        "postalCode": "01513-000",
        "establishment": null,
        "coordinates": {
          "latitude": -23.556832,
          "longitude": -46.629797
        },
        "locationId": null,
        "provider": "GOOGLE",
        "createdAt": "2021-08-29T03:49:01.584Z",
        "updatedAt": "2021-08-29T03:49:01.584Z"
      },
      {
        "id": "51c0f2ec-65fc-4b09-a1a6-7ebf8ab9ecb6",
        "externalId": 554434029,
        "accountId": "4c4e8678-ccbb-476c-8705-3a656f899995",
        "alias": null,
        "favorite": false,
        "country": "BR",
        "state": "SP",
        "city": "Araraquara",
        "neighborhood": "Jardim Quitandinha",
        "streetName": "Av. Sorocaba",
        "streetNumber": "2158",
        "complement": null,
        "reference": null,
        "postalCode": "0",
        "establishment": null,
        "coordinates": {
          "latitude": -21.802114,
          "longitude": -48.195127
        },
        "locationId": null,
        "provider": "GOOGLE",
        "createdAt": "2021-08-06T00:16:19.737Z",
        "updatedAt": "2021-08-06T00:16:19.737Z"
      }
    ]
  }
}
```