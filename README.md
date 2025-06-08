# 🏥 Sistema de Leitos Hospitalares 
Este sistema tem como objetivo auxiliar na gestão dos leitos hospitalares. A aplicação oferece um dashboard centralizado, onde é possível visualizar o status dos leitos da instituição e registrar solicitações específicas para cada um deles. Com isso, busca-se otimizar o uso dos recursos disponíveis e facilitar a comunicação entre as equipes envolvidas no cuidado dos pacientes.

## 🛠️ Tecnologias Utilizadas
- HTML/CSS
- Node.js
- Express
- MySQL
- Nodemon (em ambiente de desenvolvimento)

## 📦 Instalação
  É necessário instalar o Node.js para executar o projeto

**1. Clone o repositório**
```bash
git clone https://github.com/BrunoCLopes/app-leitos.git
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicialize o Banco de Dados**
```bash
node database/initialize.js
```

**4. Popular o Banco de Dados com dados de exemplo**
```bash
node database/seed.js
```

**5. Inicie o servidor**
```bash
npm run dev
```
