# Notificador de Produtos

Este projeto é um sistema de notificação de produtos desenvolvido com React, TypeScript, Vite e Node.js. Ele permite a criação, listagem e exclusão de produtos, além de autenticação de usuários.
- **Atualmente, o sistema tem compatibilidade com as seguintes lojas:**
    - Casas Bahia
    - Kabum
    - Mercado Livre
    - Terabyte

## Tecnologias Utilizadas

- **Frontend:**
    - React
    - TypeScript
    - Vite
    - React Hook Form
    - Zod
    - Axios
    - React Router DOM

- **Backend:**
    - Node.js
    - Express
    - Prisma
    - bcrypt
    - Cheerio
    - Cookie-parser
    - CORS

## Estrutura do Projeto

### Frontend

- **Componentes:**
    - `Container`
    - `FormContainer`
    - `InputText`
    - `Main`
    - `Button`
    - `PrivateRoute`

- **Páginas:**
    - `login-page.tsx`
    - `register-page.tsx`

- **Hooks:**
    - `use-auth.ts`
    - `use-product.ts`
    - `use-api.ts`

- **Contextos:**
    - `AuthContext`
    - `ToastContext`

- **Configurações:**
    - `eslint.config.js`
    - `tsconfig.json`

### Backend

- **Controladores:**
    - `ProductController.ts`

- **Serviços:**
    - `AuthService`
    - `ProductService`

- **Configurações:**
    - `package.json`

## Instalação

### Frontend

1. Navegue até o diretório `front`:
     ```sh
     cd front
     ```

2. Instale as dependências:
     ```sh
     npm install
     ```

3. Inicie o servidor de desenvolvimento:
     ```sh
     npm run dev
     ```

### Backend

1. Navegue até o diretório `api`:
     ```sh
     cd api
     ```

2. Instale as dependências:
     ```sh
     npm install
     ```

3. Inicie o servidor de desenvolvimento:
     ```sh
     npm run dev
     ```

## Arquivos .env

### .env

Este arquivo contém variáveis de ambiente utilizadas pelo Prisma e outras partes do backend:

```properties
DATABASE_URL="URL de conexão com o banco de dados PostgreSQL" -- Para mais detalhes, acesse a documentação do PRISMA
JWT_SECRET_KEY="Chave secreta para geração de tokens JWT"
JWT_REFRESH_SECRET_KEY="Chave secreta para geração de tokens de refresh JWT"
EMAIL_USER="Usuário de email para envio de notificações"
EMAIL_PASSWORD="Senha do email para envio de notificações"
```

### .env.development

Este arquivo contém variáveis de ambiente específicas para o ambiente de desenvolvimento do frontend:

```shell
VITE_FETCH_URL=http://localhost:3000 # URL base para as requisições da API no ambiente de desenvolvimento
```
