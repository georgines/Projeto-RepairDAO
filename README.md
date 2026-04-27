# Projeto RepairDAO

Repositório raiz de orquestração do ambiente. Ele depende de dois repositórios públicos:

- `repairdao`: app Next.js
- `repairdao-contracts`: contratos Solidity com Hardhat

O projeto RepairDAO implementa uma plataforma de serviços com integração blockchain, cobrindo cadastro de usuários, depósito, reputação, ordens de serviço, disputas e governança.

## Requisitos

- Git
- Node.js 20 ou superior
- Yarn 1.x

Os comandos abaixo funcionam em PowerShell e Bash.

## Estrutura esperada

```text
Projeto-RepairDAO/
|- repairdao/
|- repairdao-contracts/
```

## Clone

```bash
git clone https://github.com/georgines/Projeto-RepairDAO.git
cd Projeto-RepairDAO
git clone https://github.com/georgines/repairdao.git repairdao
git clone https://github.com/georgines/repairdao-contracts.git repairdao-contracts
```

## Configuração

1. Duplique `repairdao/.env.example` como `repairdao/.env`.
2. Duplique `repairdao-contracts/.env.example` como `repairdao-contracts/.env`.
3. Se for usar Sepolia, edite `repairdao/.env` e `repairdao-contracts/.env` com sua RPC e sua chave.

## Instalação

```bash
yarn --cwd repairdao-contracts install
yarn --cwd repairdao install
yarn --cwd repairdao run prisma:generate
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

## Uso em Sepolia

1. Preencha `SEPOLIA_RPC_URL` e `SEPOLIA_PRIVATE_KEY` em `repairdao-contracts/.env`.
2. Preencha `SEPOLIA_RPC_URL` em `repairdao/.env`.
3. Se quiser abrir o app já com Sepolia como padrão, defina `NEXT_PUBLIC_NETWORK=sepolia` em `repairdao/.env`.
4. A seleção final da rede no navegador é feita pelo seletor da interface.
5. Faça o deploy:

```bash
yarn --cwd repairdao-contracts run deploy:sepolia
```

6. Inicie o app:

```bash
yarn --cwd repairdao run db:reset
yarn --cwd repairdao run dev
```

## RPC Sepolia

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

## Observações

- O deploy local atualiza `repairdao/src/contracts/deploy/local.json`.
- O deploy em Sepolia atualiza `repairdao/src/contracts/deploy/sepolia.json`.
- Na raiz, `yarn run local` sobe o `hardhat node`, faz o deploy local, reseta o banco e inicia o app.
- Na raiz, `yarn run sepolia` sobe o app para uso com Sepolia.
- Para fazer o deploy em Sepolia antes de subir o app pela raiz, use `yarn run sepolia -d`.
- O atalho `yarn run sepolia -d` exige `SEPOLIA_RPC_URL` e `SEPOLIA_PRIVATE_KEY` válidos em `repairdao-contracts/.env`.
- O fluxo passo a passo acima continua sendo o mais portável e o mais fácil de depurar.
