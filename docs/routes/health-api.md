# Saúde da API

Para saber se a API está OK / Em manutenção, você pode utilizar esse **endpoint**.

## Requisição

```js
{
  "endpoint": "/health",
  "method": "GET"
}
```

## Resposta válida

```js
{
  "status": "success",
  "message": "API running fine... thanks, my friend."
}
```