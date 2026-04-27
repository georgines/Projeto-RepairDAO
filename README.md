# Projeto RepairDAO

Repositório raiz de orquestração do ambiente. Ele depende de dois repositórios públicos:

- [`repairdao`](https://github.com/georgines/repairdao): app Next.js
- [`repairdao-contracts`](https://github.com/georgines/repairdao-contracts): contratos Solidity com Hardhat

O projeto RepairDAO implementa uma plataforma de serviços com integração blockchain, cobrindo cadastro de usuários, depósito, reputação, ordens de serviço, disputas e governança.

## Requisitos

- Git
- Node.js 20 ou superior
- Yarn 1.x

Os comandos abaixo funcionam em PowerShell e Bash.

## Início rápido

### 1. Clone a raiz

```bash
git clone https://github.com/georgines/Projeto-RepairDAO.git
```

### 2. Entre na pasta

```bash
cd Projeto-RepairDAO
```

### 3. Clone o app

```bash
git clone https://github.com/georgines/repairdao.git repairdao
```

### 4. Clone os contratos

```bash
git clone https://github.com/georgines/repairdao-contracts.git repairdao-contracts
```

### 5. Configure o `.env` do app

Duplique `repairdao/.env.example` como `repairdao/.env`.

### 6. Configure o `.env` dos contratos

Duplique `repairdao-contracts/.env.example` como `repairdao-contracts/.env`.

### 7. Se for usar Sepolia

No `repairdao/.env`, preencha `SEPOLIA_RPC_URL`.

No `repairdao-contracts/.env`, preencha:

- `SEPOLIA_RPC_URL`
- `SEPOLIA_PRIVATE_KEY`, se for fazer deploy em Sepolia

Para configurar `SEPOLIA_RPC_URL`, escolha uma destas opções:

1. Usar uma RPC com chave própria:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/SUA_CHAVE_AQUI
```

2. Usar uma RPC pública gratuita, sem chave:

```env
SEPOLIA_RPC_URL=https://rpc.sepolia.org
```

ou

```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

As RPCs públicas costumam ser suficientes para desenvolvimento e testes, mas tendem a ter mais instabilidade e limite menor do que provedores com chave própria.

### 8. Instale as dependências dos contratos

```bash
yarn --cwd repairdao-contracts install
```

### 9. Instale as dependências do app

```bash
yarn --cwd repairdao install
```

### 10. Gere o Prisma Client

```bash
yarn --cwd repairdao run prisma:generate
```

## Estrutura esperada

```text
Projeto-RepairDAO/
|- repairdao/
|- repairdao-contracts/
```

## Uso local

Terminal 1:

```bash
yarn --cwd repairdao-contracts run node
```

Terminal 2:

```bash
yarn --cwd repairdao-contracts run deploy:local
```

Terminal 3:

```bash
yarn --cwd repairdao run db:reset
yarn --cwd repairdao run dev
```

App disponível em `http://localhost:3000`.

## MetaMask e seletor

O app exibe um seletor de rede na barra da carteira, com as opções `LOCAL` e `SEPOLIA`. A escolha feita ali fica salva no navegador e passa a ser a rede ativa do app.

### Rede local

1. Suba a rede local com `yarn run local` na raiz ou com o fluxo manual.
2. No MetaMask, adicione ou selecione uma rede com estes dados:

```text
Nome: Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Símbolo: ETH
```

3. Importe no MetaMask uma das contas exibidas pelo `hardhat node`.
4. No app, escolha `LOCAL` no seletor.
5. Confirme no MetaMask que a carteira também está conectada na rede local.

### Rede Sepolia

1. No MetaMask, selecione a rede Sepolia.
2. No app, escolha `SEPOLIA` no seletor.

## Uso em Sepolia

1. Faça o deploy:

```bash
yarn --cwd repairdao-contracts run deploy:sepolia
```

2. Inicie o app:

```bash
yarn --cwd repairdao run db:reset
yarn --cwd repairdao run dev
```

## Observações

- Os arquivos `repairdao/src/contracts/deploy/local.json` e `repairdao/src/contracts/deploy/sepolia.json` guardam os endereços dos contratos usados pelo app em cada rede e são atualizados pelo deploy correspondente.
- Se esses arquivos não estiverem alinhados ao deploy real, o app pode tentar ler ou enviar transações para contratos errados.
- Na raiz, `yarn run local` sobe o `hardhat node`, faz o deploy local, reseta o banco e inicia o app.
- Na raiz, `yarn run sepolia` sobe o app para uso com Sepolia.
- Para fazer o deploy em Sepolia antes de subir o app pela raiz, use `yarn run sepolia -d`.
- O atalho `yarn run sepolia -d` exige `SEPOLIA_RPC_URL` e `SEPOLIA_PRIVATE_KEY` válidos em `repairdao-contracts/.env`.
- O fluxo passo a passo acima continua sendo o mais portável e o mais fácil de depurar.
