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

## Endpoints disponíveis:

## Autenticação

### Cadastrar usuário:

```
POST: http://localhost:3000/auth/signup
Headers: {
	"Content-Type": "application/json"
}

Body: {
	"fullName": "Théo Barreto Silva",
	"photoUrl": "https://avatars.githubusercontent.com/u/103266889?v=4",
	"email": "emailteste@gmail.com",
	"password": "123456789",
	"confirmPassword": "123456789",
	"phone": (48) 99999-9999,
	"address": {
		"zipCode": "88101-250",
		"street": "Rua mauricio",
		"number": 537,
		"neighborhood": "Campinas",
		"city": "São José",
		"state": "Belém",
		"complement": "Apto. 1405"
	}
}
```
**Resultado:**

```
{
	"message": "Usuário cadastrado com sucesso!"
}
```

### Fazer login com email e senha:

```
POST: http://localhost:3000/auth/signin
Headers: {
	"Content-Type": "application/json"
}

Body: {
	"email": "emailteste@gmail.com",
	"password": "123456789"
}
```
**Resultado:**

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IlRow6lvIiwicGhvdG9VcmwiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTAzMjY2ODg5P3Y9NCIsImVtYWlsIjoianVsaWFub2Zsb3NzMjJAZ21haWwuY29tIiwiaWF0IjoxNjczNDY0MDI3LCJleHAiOjE2NzM0NjQwODd9.t8YzRH0-d9ua024xmpJG9r1nWdlWQWR-GRLrxyNGEbQ"
}
```

## Usuário

### Receber os dados de perfil do usuário:

```
GET: http://localhost:3000/users/profile
Headers: {
	"Authorization": "Bearer token"
}
```
**Resultado:**

```
{
	"photoUrl": "https://avatars.githubusercontent.com/u/103266889?v=4",
	"userName": "Théo Barreto Silva",
	"email": "emailteste@gmail.com",
	"phone": (48) 99999-9999,
	"address": {
		"_id": 4,
		"zipCode": "88101-250",
		"street": "Rua mauricio",
		"number": 537,
		"neighborhood": "Campinas",
		"city": "São José",
		"state": "Belém",
		"complement": "Apto. 1405"
	}
}
```

### Mudar a senha do usuário:

```
POST: http://localhost:3000/users/changePassword
Headers: {
	"Authorization": "Bearer token"
	"Content-Type": "application/json"
}

Body: {
	"email": "emailteste@gmail.com",
	"oldPassword": "senhaantiga",
	"newPassword": "novasenha",
	"confirmNewPassword": "novasenha"
}
```
**Resultado:**

```
{
	"message": "Senha alterada com sucesso!"
}
```

## Dispositivos

### Adicionar dispositivo ao usuário:

```
POST: http://localhost:3000/devices/addDevice
Headers: {
	"Authorization": "Bearer token"
	"Content-Type": "application/json"
}

Body: {
	"_id": 25,
	"name": "Lâmpada LED",
	"type": "Energia",
	"madeBy": "Intelbras",
	"isOn": false,
	"info": "Lâmpada da suite 1",
	"ipAddress": "127.0.0.1",
	"macAddress": "127.0.0.1",
	"local": "Quarto",
	"grouping": "Casa de praia"
}
```
**Resultado**

```
{
	"message": "Dispositivo adicionado com sucesso!"
}
```

### Detalhar dispositivo do usuário:

```
GET: http://localhost:3000/devices/detailDevice/:id
Headers: {
	"Authorization": "Bearer token"
}
```
**Resultado**

```
{
	"name": "Lâmpada theo",
	"type": "Energia",
	"madeBy": "Intelbras",
	"isOn": false,
	"info": "Lâmpada da suite 1",
	"ipAddress": "127.0.0.1",
	"macAddress": "127.0.0.1"
}
```

### 
