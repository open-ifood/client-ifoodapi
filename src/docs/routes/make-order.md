# Make order

Esse **endpoint** é um dos principais da API, com ele você pode realizar pedidos na conta autorizada.

## Requisição

```js
{
  "endpoint": "/order",
  "method": "PUT",
  "header": {
    "authorization": "<your_token_authentication>"
  },
  "body": {
    "addressId":552239351,
    "restaurantOrder":[
        {
          "itens":[
              {
                "code":"c0940752-56ac-44a2-8321-35af69a5d8e1",
                "unitPrice": 0.01,
                "tags":[

                ],
                "choices":[ ],
                "obs":"Observação de teste",
                "qty":7
              }
          ],
          "restaurant":{
              "uuid":"4a1dc2e1-9c4e-45cb-964c-7140221e9298"
          }
        }
    ],
    "scheduled":false,
    "test":false,
    "deliveryMethod":{
        "id":"DEFAULT"
    },
    "paymentSources":{
        "sources":[
          {
              "source":"OFFLINE",
              "paymentMethod":{
                "id":"ca518725-c712-4828-9039-f9070be3622a"
              },
              "amount":{
                "value":14.9,
                "currency":"BRL"
              }
          }
        ]
    }
  }
}
```

## Resposta válida

```js
{
  "status": "success",
  "data": {
    "orderCheckout": {
      "id": "804f53e2-b0e8-40c7-8811-c09af75c5c40",
      "number": 4298515175,
      "date": 1631145796384,
      "customer": {
        "id": 305081272,
        "accountId": 305081272,
        "uuid": "4c4e8678-ccbb-476c-8705-3a656f899995",
        "email": "STREAM.FOOD.ABC@GMAIL.COM",
        "companyGroup": "IFO",
        "tags": [],
        "name": "PEDIDO DE TESTE - Leonardo Elias de Oliveira",
        "cpf": "502.949.398-06",
        "signUpDate": 1627604910305,
        "phones": [
          {
            "id": -5706975586407482000,
            "areaCode": "16",
            "countryCode": "55",
            "phone": "993798356"
          }
        ],
        "country": "BR",
        "locale": "pt_BR",
        "active": true,
        "tenantId": "IFO"
      },
      "restaurantOrder": [
        {
          "itens": [
            {
              "id": "c0940752-56ac-44a2-8321-35af69a5d8e1",
              "itemOrderDescription": "",
              "description": "PEDIDO DE TESTE - Nome do Refrigerante 350 ml",
              "code": "c0940752-56ac-44a2-8321-35af69a5d8e1",
              "obs": "Observação de teste",
              "qty": 7,
              "unitPrice": 0.01,
              "choices": [],
              "posCode": "",
              "tags": [],
              "totalValue": 0.07,
              "totalAdditions": 0,
              "totalDiscounts": 0
            }
          ],
          "restaurant": {
            "id": 1569752,
            "restaurantId": 1569752,
            "uuid": "4a1dc2e1-9c4e-45cb-964c-7140221e9298",
            "companyGroup": "IFO",
            "name": "Teste - StreamFood",
            "tags": [
              "ADDRESS_PREFORM_TYPE"
            ],
            "corporateName": "Teste - StreamFood",
            "siteUrl": "bujari-ac/teste---streamfood-bujari",
            "groupId": 0,
            "document": {
              "type": "CNPJ",
              "value": "99999999999999"
            },
            "phoneIf": "999999999",
            "address": {
              "streetNumber": 122,
              "streetNumberText": "122",
              "compl": "",
              "location": {
                "zipCode": 12345678,
                "address": "Ramal Bujari",
                "dependentAddress": "",
                "district": "Bujari",
                "city": "Bujari",
                "state": "AC",
                "country": "BR",
                "lat": -9.822384,
                "lon": -67.948589,
                "requireCompl": false
              }
            },
            "distance": 0.64,
            "deliveryTime": 40,
            "takeoutTime": 20,
            "timezone": "America/Sao_Paulo",
            "locale": "pt_BR",
            "openingHours": [
              {
                "dayOfWeek": "SEX",
                "openingTime": 1631070000000,
                "closingTime": 1631156399999
              },
              {
                "dayOfWeek": "SAB",
                "openingTime": 1631070000000,
                "closingTime": 1631156399999
              },
              {
                "dayOfWeek": "QUI",
                "openingTime": 1631070000000,
                "closingTime": 1631156399999
              },
              {
                "dayOfWeek": "QUA",
                "openingTime": 1631070000000,
                "closingTime": 1631156399999
              },
              {
                "dayOfWeek": "SEG",
                "openingTime": 1631070000000,
                "closingTime": 1631156399999
              },
              {
                "dayOfWeek": "DOM",
                "openingTime": 1631070000000,
                "closingTime": 1631156399999
              },
              {
                "dayOfWeek": "TER",
                "openingTime": 1631070000000,
                "closingTime": 1631156399999
              }
            ],
            "enabled": true,
            "closed": false,
            "score": 0,
            "supportsDelivery": true,
            "supportsTogo": true,
            "supportsSchedule": true,
            "supportsOrderTracking": false,
            "supportsOwnDelivery": false,
            "supportsOrderScheduling": true,
            "supportsIndoorDelivery": true,
            "supportsIndoorTakeout": true,
            "supportsGroceriesExpressDelivery": false,
            "supportsPickupArea": false,
            "supportsImmediateOrder": true,
            "merchantContextSetups": [
              {
                "context": "DEFAULT",
                "region_group": "e1dbd9d8-45d6-4b33-aafc-417b8d69b06d",
                "catalog_group": "ffca0022-eb43-4205-9a1b-73a72f8e3f95"
              },
              {
                "context": "DIGITAL_CATALOG",
                "region_group": "e1dbd9d8-45d6-4b33-aafc-417b8d69b06d",
                "catalog_group": "2c63df35-2837-4c64-bf7a-9ef9cdf21af6"
              },
              {
                "context": "WHITELABEL",
                "region_group": "e1dbd9d8-45d6-4b33-aafc-417b8d69b06d",
                "catalog_group": "6f18ba73-024d-49c2-acbd-f7d8805d7ab1"
              }
            ],
            "minimunOrder": 0,
            "config": {
              "test": "true",
              "ADDRESS_PREFORM_TYPE": "S",
              "nationalIdentificationNumberRequired": "false"
            },
            "deliveryMethods": [
              {
                "id": "TAKEOUT",
                "type": "FIXED",
                "value": 0,
                "originalValue": 8.9,
                "title": "Retirada",
                "subtitle": "Você retira no local",
                "minTime": 20,
                "maxTime": 30,
                "mode": "TAKEOUT",
                "priority": 4,
                "enabled": true,
                "schedule": {
                  "now": true,
                  "timeSlots": [
                    {
                      "id": "3e50be82-105b-11ec-b106-9699c2cf9718",
                      "startDateTime": 1631178000000,
                      "endDateTime": 1631178900000,
                      "originalPrice": 0,
                      "price": 0,
                      "availableLoad": 0,
                      "isAvailable": true,
                      "startTime": "06:00",
                      "endTime": "06:15",
                      "date": "2021-09-09"
                    }
                  ]
                }
              },
              {
                "id": "DEFAULT",
                "type": "FIXED",
                "value": 8.9,
                "originalValue": 8.9,
                "title": "Padrão",
                "subtitle": "O entregador leva até você agora",
                "minTime": 40,
                "maxTime": 50,
                "mode": "DELIVERY",
                "priority": 1,
                "deliveredBy": "MERCHANT",
                "deliveryOptions": {
                  "picking": "DEFAULT"
                },
                "enabled": true,
                "schedule": {
                  "now": true,
                  "timeSlots": [
                    {
                      "id": "3eadbf70-105b-11ec-984c-9699c2cf9718",
                      "startDateTime": 1631203200000,
                      "endDateTime": 1631204100000,
                      "originalPrice": 890,
                      "price": 890,
                      "availableLoad": 0,
                      "isAvailable": true,
                      "startTime": "13:00",
                      "endTime": "13:15",
                      "date": "2021-09-09"
                    }
                  ]
                }
              }
            ],
            "preparationTime": 0,
            "type": "RESTAURANT",
            "connected": true,
            "alwaysOnline": false,
            "shitftOpen": true,
            "radiusRestricted": false,
            "hubClosed": false,
            "ifoodDeliveryDisabled": false,
            "statusAvailable": true
          },
          "totalValue": 0.07
        }
      ],
      "obs": "",
      "deliveryFee": 8.9,
      "discount": 0,
      "totalAmount": 0.07,
      "address": {
        "uuid": "02411c17-b43f-457f-84b1-501f1357b26f",
        "addressId": 552239351,
        "streetNumber": 516,
        "streetNumberText": "516",
        "location": {
          "zipCode": 0,
          "address": "PEDIDO DE TESTE - NÃO ENTREGAR - R. Irineu Serra",
          "district": "Bujari",
          "city": "Bujari",
          "state": "AC",
          "country": "BR",
          "lat": -9.827597,
          "lon": -67.951077,
          "requireCompl": false
        },
        "favorite": false
      },
      "estimatedDeliveryTime": 40,
      "browser": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "product": "webapp_9.40.0",
      "channel": "IFOOD",
      "medium": "S",
      "platform": "DESKTOP",
      "deliveryDate": 1631145796075,
      "scheduled": false,
      "expectedDeliveryTime": 40,
      "expectedTakeOutDate": 1631146996075,
      "currency": "BRL",
      "benefits": {
        "itemsTags": []
      },
      "fees": {
        "total": 0,
        "values": []
      },
      "deliveryMethod": {
        "id": "DEFAULT",
        "type": "FIXED",
        "value": 8.9,
        "originalValue": 8.9,
        "title": "Padrão",
        "subtitle": "O entregador leva até você agora",
        "minTime": 40,
        "maxTime": 50,
        "mode": "DELIVERY",
        "priority": 1,
        "deliveredBy": "MERCHANT",
        "deliveryOptions": {
          "picking": "DEFAULT"
        },
        "enabled": true,
        "schedule": {
          "now": true,
          "timeSlots": [
            {
              "id": "3eadbf70-105b-11ec-984c-9699c2cf9718",
              "startDateTime": 1631203200000,
              "endDateTime": 1631204100000,
              "originalPrice": 890,
              "price": 890,
              "availableLoad": 0,
              "isAvailable": true,
              "startTime": "13:00",
              "endTime": "13:15",
              "date": "2021-09-09"
            }
          ]
        }
      },
      "context": {
        "tags": [
          "delivered_by_merchant"
        ]
      },
      "empty": false,
      "totalOrder": 8.97,
      "totalItens": 0.07,
      "totalOrderValue": 8.97,
      "totalAdditions": 0,
      "totalDiscounts": 0,
      "paymentSources": {
        "sources": [
          {
            "source": "OFFLINE",
            "paymentMethod": {
              "id": "ca518725-c712-4828-9039-f9070be3622a",
              "name": "CRÉDITO - BANRICOMPRAS (MÁQUINA)",
              "type": {
                "name": "OFFLINE",
                "description": "Pagamento na entrega"
              },
              "method": {
                "name": "CREDIT",
                "description": "Crédito"
              },
              "liability": "MERCHANT",
              "brand": {
                "id": "83f7d201-7d58-4d4e-8ef0-7111817230c7",
                "name": "BANRICOMPRAS",
                "description": "Banricompras",
                "regex": ""
              },
              "additionalData": {}
            },
            "amount": {
              "value": 8.97,
              "currency": "BRL"
            },
            "card": null,
            "cardToken": null,
            "token": null,
            "details": null,
            "additionalData": {}
          }
        ],
        "contextInfo": {}
      }
    }
  }
}
```

## Resposta inválida

```js
{
  "status": "fail",
  "message": "One or more of your items had their price changed by the restaurant. Update your cart before placing your order."
}
```