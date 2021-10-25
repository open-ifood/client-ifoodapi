# Geocodificar endereço

A partir de uma linha inserida, assim como na interface da aplicação WEB/Mobile você poderá geocodificar o endereço (isto é, consolidar o endereço com latitude e longitude).

## Requisição

```js
{
  "endpoint": "/address/geocode",
  "method": "GET",
  "body": {
    "address_line": "Rua são paulo, São Paulo, SP"
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
    "rules": [
      {
        "key": "city",
        "localizedLabel": "Cidade",
        "required": true
      },
      {
        "key": "state",
        "localizedLabel": "Estado",
        "required": true
      },
      {
        "key": "country",
        "localizedLabel": "País",
        "required": true
      },
      {
        "key": "streetName",
        "localizedLabel": "Rua",
        "required": true
      },
      {
        "key": "streetNumber",
        "localizedLabel": "Número",
        "required": true
      },
      {
        "key": "neighborhood",
        "localizedLabel": "Bairro",
        "required": true
      },
      {
        "key": "coordinates",
        "localizedLabel": "Coordenadas",
        "required": true
      },
      {
        "key": "postalCode",
        "localizedLabel": "CEP",
        "required": true
      },
      {
        "key": "complement",
        "localizedLabel": "Complemento",
        "required": false
      },
      {
        "key": "reference",
        "localizedLabel": "Ponto de referência",
        "required": false
      }
    ],
    "addresses": [
      {
        "city": "Rio de Janeiro",
        "state": "RJ",
        "country": "BR",
        "streetName": "Av. Alm. Barroso",
        "streetNumber": "472",
        "neighborhood": "Centro",
        "coordinates": {
          "latitude": -22.9068467,
          "longitude": -43.1728965
        },
        "postalCode": "20031-002",
        "quality": {
          "city": 1,
          "state": 1,
          "country": 1,
          "streetName": 1,
          "streetNumber": -1,
          "neighborhood": 1,
          "postalCode": 1,
          "coordinates": {
            "latitude": 1,
            "longitude": 1
          }
        }
      }
    ],
    "provider": "GOOGLE"
  }
}
```