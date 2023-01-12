# ConnectLab - Back-end

API Node usando [Nest.js](https://nestjs.com/)

## Primeiros passos
Para instalar as dependencias é preciso executar o comando **npm**:

```
$ npm install
```

## Comandos
No diretório do projeto, você pode executar:

### **dev**
Executa o aplicativo no modo de desenvolvimento. Que ficará exposto em: http://localhost:3030

```
$ npm run dev
```

## Configurações
Para rodar o projeto é preciso criar o arquivo .env na raiz do projeto, adicionar as informações do seu banco de dados postgresql e a porta que será executado, além da secret que servirá para gerar os tokens de autenticação.

```
JWT_SECRET=abcdefghijklmnopqrstuvwxyz

# POSTGRESQL
DB_DIALECT=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=connect-lab
```

