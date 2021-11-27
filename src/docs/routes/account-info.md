# Obter informações da conta
Esse endpoint fornecerá informações da conta autenticada no IFood.

## Requisição

```js
{
  "endpoint": "/me",
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