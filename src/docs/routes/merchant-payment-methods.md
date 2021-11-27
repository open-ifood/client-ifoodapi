# Formas de pagamento do comerciante

Lista as formas de pagamento disponíveis para utilização do pagamento em um determinado comerciante.

## Requisição

```js
{
  "endpoint": "/merchant/:merchantID/payment-method?tags=:tags",
  "method": "GET"
}
```

**Observação**: Exemplo de tag **delivered_by_merchant**.

## Resposta válida

```js
{
  "status": "success",
  "data": [
    {
      "id": "04f5319c-e923-4369-b107-613653e18a9a",
      "name": "DINERS",
      "type": {
        "name": "ONLINE",
        "description": "Pagamento pelo app"
      },
      "method": {
        "name": "CREDIT",
        "description": "Crédito"
      },
      "liability": "IFOOD",
      "brand": {
        "id": "ed4f2cee-a87d-4659-9b0b-c37b854c99eb",
        "name": "DINERS",
        "regex": "^3(?:0[0-5]|[68][0-9])[0-9]{11}$",
        "description": "Diners",
        "cvv_regex": "^[0-9]{3}$"
      },
      "token_configuration": {
        "id": "d9083a16-80ee-49a7-95db-c46e1efc83e2",
        "voucher": false,
        "providers": [
          {
            "name": "ZOOP",
            "zero_dollar": true,
            "test": false,
            "url": "https://payment.ifood.com.br/v1/customers/me/card-tokens",
            "revalidation_url": "https://payment.ifood.com.br/v1/customers/me/card-tokens/retokenize",
            "public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQ0lqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnOEFNSUlDQ2dLQ0FnRUEweCsyN29YdGpjQllVdW9YR0hLNQo0ZjQ4WDIvV3VlUVVLTUZBWnNnZkZ0NjlicW5vRjdtWjZ5UVIwNEpkd0FWQkJYS2JIR3N2dFQva3RWZThDR3REClU1V1dMK1plV294T3FKM2cwaW1YMEdDMHlsQkdjWC82VVI0bkZ2OGRLWjhpd0NFcE9zV3I3a0NuLzZRWEV0QloKN2IzZzdmd2VDTS9DWTQrRnpTT2ZwbEJzUjgrdUJWcjlYT29wL2c0Z3NkeTdINkQyR2p2QmRaeGphdDNscHlBdwpGNVpwRkRUYmZjZXBDNWRYb3UwVkdhZzE1dUJaUUgwZEk5cFdhVER0MVJvWnJnTGZxN1NRZ3JsSHYzVzRGbXFFClN4RVNQS2RyUmxkUXJIWnJydnNlR1lIU2NNQTRIRk16Vjk3NlFraTZvRlUrY1pKY3ErZkVhcW9PaGtpZ0Q2bWYKaTQvTFZkL0tuYjdQeldMcXBReTNoMFkxOHl5cGdrK1ozN05PZzdDOFJqTEJ3RHdnL2RGMU0ydkRmaHZvdndLMwp3WjdoZGNxZTQwbG1Cd1dKa0dIb3N3bFZPZzh0RVJGK1RJdUlYRDdCVTAzMFlEVHlvSEVwUitMSHhIT3VMQmNoCndQQmcrSmlVQk5ZSERFMERub2xmV1VmeFV0ZkNQbTZ4MG1tSGgrZ1c3MGtLYzMyaVZrbVhNcE4xSmN2RWZPSkwKUTk5UDJaNkF4S0lGRllOYUh2cWNzRDhNSXI2MGJmNzh2ZDZCeDhhR1ZwaUpnK0RPZkwrdGNQUFFMS0tIdnIrOAoyMFRiUUFyeEhlZitGVXlObjc0blhjV0RQQzBoc3pCMEdGQnkreHZQczdhMThiR24vUmJ6T0hEU2VBVlVYTWlwCk9WWVNxY0MyMHEvZmZtRFdxY3NLR2FNQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==",
            "acquirers": "tWJdsBjEVIO5qqa9PzpNQ6ZUT0QVLZ1vZvRjqatCuafc3UQqsfFPl6KpKpK/z1rdbHGxcG3plGjYO33OF5No8CrvZktxRk6DGQxfPHt81c7MNVR/cGju09K+hx5q29o7aJ3uT2mkMWBo3svHZblxz1Ad2YbPeMpFX9Yf4KEHUvKHtoYaPlclhZDGpXEulgjt4VYiOPQ36Ga03bWe41rX+r9dGQAZ/ItZUcSsiWpRJXMbueEgFHgI69bM1NxxysfO1d3omgPpMUXpTTX7r5ew4igu0B9uShP6Wj0HHM94WzMXnBnu3wra/f72t8by8iYrgfgSWzGhEL2Mh4ElEhFX7E8uTXxdsxQP3SP/nnPVQg+SgataACzenwKNcZ4o1h5id2OJZsNUZqMQGfTuZTsw2iqTd8Qi4T4iCcC1Cb5xf70yfR2Jy6s8sjo/j3npEEHersxL/A7QNmU3y2AEyFBdGV2q7d/hBmBFQgJ607nB4+qzlz0s+NJzBamFjKkl/hFrT2Dt9btiAk2MdTwXoXsupMkOQhKtEDdLdgpjgZxgORdYLCjjZhI9FLM9Kn9zTunHbE0u7X2Oi5nsun/YKDjeVQxT+28CcR3nZK1dTQ8Oj+zCggV0JUUVZ7hLic77ETVMEd9zXgaMNGdD6igJGWbqnt+78zTzOy120B6RRKMdlPw=|jQKGaCkpZur8IPNG8+H5BWDqcRyFNmHE8my703UuVygTYWwEal7srp1YpKG51+jMMZ6EEvTvg7kPMByWEKkHkaIbde9ANlZ0D6tKmqTErUAgf+ebxNypWbLU8VuRvDvaMK6wA0kgUtrSv+zg4i/EBKF40Uv4repTz52QnWTpzX8MCqN4DtJHkgP/qCKt2uL5ZZDLfpKqErGbirrdETYP2NxU2zUydykq2UO4W8qz+264yLXmFLstHkDuKfzndqVOuvQGJALc0AOWI6nq/6yZIg=="
          }
        ]
      },
      "additional_data": {},
      "required_cvv": false
    }
  ]
}
```