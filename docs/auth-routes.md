# Rotas privadas
Essas são as rotas que poderão ser acessadas após a [Autenticação](./authentication.md).

## Obter menu de um comerciante
Esse endpoint responderá com as categorias, produtos, opções disponiveis para um cliente fazer compra em determinado comerciante.

Exemplo: `ID_COMERCIANTE: 95c57181-290d-4bd0-a88f-e4fedaeec045`

### Requisição

```json
{
  "endpoint": "/merchant/<ID_COMERCIANTE>/menu",
  "method": "GET",
  "header": {
    "authorization": "<your_token_authentication>"
  }
}
```

### Resposta válida

```json
{
  "status_code": 200,
  "body": {
    "status": "success",
    "message": "Menu do comerciante obtido com sucesso",
    "data": {
      "menu": [
        {
          "code": "16700930",
          "name": "Promoções",
          "itens": [
            {
              "id": "0662e7f5-f1c1-410a-9a5c-eeabd01f5cf7",
              "code": "355565698",
              "description": "Chocolate Herdhey's Meio Amargo 87 Gr",
              "details": "Barra 87g",
              "logoUrl": "95c57181-290d-4bd0-a88f-e4fedaeec045/20200903013638_415951.jpg",
              "needChoices": false,
              "unitPrice": 3.29,
              "unitMinPrice": 3.29,
              "unitOriginalPrice": 5.49
            },
            {
              "id": "a20f4e15-7106-4217-9bd8-c0070ca0b377",
              "code": "355565697",
              "description": "Chocolate Hershey's Meio Amargo 92g",
              "details": "Tablete 92g",
              "logoUrl": "95c57181-290d-4bd0-a88f-e4fedaeec045/20200903013638_200942.jpg",
              "needChoices": false,
              "unitPrice": 3.29,
              "unitMinPrice": 3.29,
              "unitOriginalPrice": 5.49
            },
            {
              "id": "965ae3dd-d330-4aeb-bfc9-3b7747ddaef7",
              "code": "355565708",
              "description": "Whiskey Jack Daniel's 1l",
              "details": "Produto para maiores de 18 anos",
              "logoUrl": "95c57181-290d-4bd0-a88f-e4fedaeec045/20200903013645_12770.jpg",
              "needChoices": false,
              "unitPrice": 153.99,
              "unitMinPrice": 153.99,
              "unitOriginalPrice": 186.99
            },
            {
              "id": "27650a30-b1af-49ef-90aa-d3e926b26740",
              "code": "355565707",
              "description": "Whiskey Jack Daniel's Honey 1l",
              "details": "Produto para maiores de 18 anos",
              "logoUrl": "95c57181-290d-4bd0-a88f-e4fedaeec045/20200903013644_12805.jpg",
              "needChoices": false,
              "unitPrice": 153.99,
              "unitMinPrice": 153.99,
              "unitOriginalPrice": 186.99
            },
            {
              "id": "33489224-8d4c-4060-af1d-992758ef6fe2",
              "code": "355565710",
              "description": "Bala Gelatina Fini Tubes Morango 80g",
              "details": "Pacote 80g",
              "logoUrl": "95c57181-290d-4bd0-a88f-e4fedaeec045/20200903013646_3855.jpg",
              "needChoices": false,
              "unitPrice": 5.49,
              "unitMinPrice": 5.49,
              "unitOriginalPrice": 6.59
            },
            {
              "id": "02150c12-8b34-492f-b232-bb0043d01da6",
              "code": "355565713",
              "description": "Pimentão Amarelo",
              "details": "Compra a cada 200g",
              "logoUrl": "95c57181-290d-4bd0-a88f-e4fedaeec045/20200903013648_18264.jpg",
              "needChoices": false,
              "unitPrice": 3.3,
              "unitMinPrice": 3.3,
              "unitOriginalPrice": 3.96,
              "sellingOption": {
                "minimum": 200,
                "incremental": 200,
                "availableUnits": [
                  "UNIT",
                  "WEIGHT"
                ]
              }
            },
            {
              "id": "31eeb60c-6af0-4d8c-9ba8-0baa6f84fd37",
              "code": "355565712",
              "description": "Maçã Gala",
              "details": "Compra a cada 150g",
              "logoUrl": "95c57181-290d-4bd0-a88f-e4fedaeec045/20200903013647_181694.jpg",
              "needChoices": false,
              "unitPrice": 1.48,
              "unitMinPrice": 1.48,
              "unitOriginalPrice": 1.65,
              "sellingOption": {
                "minimum": 150,
                "incremental": 150,
                "availableUnits": [
                  "UNIT",
                  "WEIGHT"
                ]
              }
            },
            {
              "id": "0ce617d0-b2a2-43a1-ad35-b3ca8bb4e373",
              "code": "355550323",
              "description": "Frango a Passarinho Sadia sem Tempero 1kg",
              "details": "Pacote 1kg",
              "logoUrl": "95c57181-290d-4bd0-a88f-e4fedaeec045/20200912213226_8988.jpg",
              "needChoices": false,
              "unitPrice": 12.09,
              "unitMinPrice": 12.09,
              "unitOriginalPrice": 13.18
            }
          ]
        }
      ]
    }
  }
}
```

### Resposta inválida

```json
{
  "status_code": 500,
  "body": {
    "status": "fail",
    "message": "Comerciante não encontrado, valide o comerciante fornecido como argumento."
  }
}
```

## Obter informações da conta
Esse endpoint fornecerá informações da conta autenticada no IFood.

### Requisição

```json
{
  "endpoint": "/me",
  "method": "GET",
  "header": {
    "authorization": "<your_token_authentication>"
  }
}
```

### Resposta válida

```json
{
  "status": "success",
  "message": "Informações do perfil obtida com sucesso",
  "data": {
    "id": "918227e9-9f89-4c5a-a156-a83371e13fd1",
    "external_id": 188345440,
    "name": "Carlos Alberto de Nobrega",
    "tax_payer_identification_number": null,
    "phone": {
      "country_code": 55,
      "area_code": 16,
      "number": "9923369504",
      "full_number": "16993798356"
    },
    "email": "LEOELIAS021@GMAIL.COM",
    "language": "pt-br",
    "registration_date": "2020-01-05T22:32:18.640Z",
    "tenant_id": "IFO",
    "active": true,
    "test_scope": null,
    "blocked_to_create_account": false,
    "user_type": "PLATFORM",
    "not_publish_when_create": false
  }
}
```