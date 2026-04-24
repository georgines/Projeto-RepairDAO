# Guia do Projeto

## Desenvolvimento de Protocolo Web3 Completo com Deploy em Testnet

**Unidade 1 | Capítulo 5**  
**Prof.: Bruno Portes**

---

## Objetivo

Consolidar conhecimentos avançados por meio da construção de um MVP completo.

---

## Enunciado

Desenvolver um MVP funcional de um protocolo descentralizado integrando:

- Token ERC-20  
- NFT (ERC-721 ou ERC-1155)  
- Contrato de Staking  
- Governança básica (DAO simplificada)  
- Integração com oráculo  
- Integração com backend Web3  
- Deploy em testnet  

---

## Etapas

### Etapa 1 – Modelagem

- Definir o problema que o protocolo resolve  
- Criar diagrama de arquitetura  
- Justificar escolha dos padrões ERC  

---

### Etapa 2 – Implementação

Desenvolver:

- Token ERC-20 (OpenZeppelin)  
- NFT ERC-721 ou ERC-1155  
- Contrato de Staking com recompensa  
- Contrato de Governança simples  

---

### Etapa 3 – Segurança

Aplicar:

- Proteção contra reentrancy  
- Controle de acesso  
- Solidity ^0.8.x  

Executar auditoria com:

- Slither  
- Mythril  
- Hardhat  

Entregar relatório simples de auditoria.

---

### Etapa 4 – Oráculo

Integrar dados externos com:

- Chainlink ou API3  

Exemplo: usar preço ETH/USD para ajustar recompensa de staking.

---

### Etapa 5 – Integração Web3

Criar script ou mini frontend com:

- ethers.js  
ou  
- web3.py  

Demonstrar:

- Mint de NFT  
- Stake de tokens  
- Votação na DAO  

---

### Etapa 6 – Deploy

Deploy em:

- Sepolia ou outra testnet  

Entregar:

- Endereço dos contratos  
- Link do explorer  
- README explicativo  

---

## Formato de Entrega

1. Relatório técnico em PDF  
2. Link do GitHub  
3. Vídeo demonstrativo (5–10 minutos)  
4. Relatório de auditoria  

---

## Nome do Arquivo

U1C5O1T1_NomeSobrenome.pdf

---

## Critérios de Avaliação

| Critério                     | Peso |
|----------------------------|------|
| Arquitetura e Modelagem    | 20%  |
| Implementação Técnica      | 20%  |
| Segurança                  | 20%  |
| Integração Oráculo         | 10%  |
| Integração Web3            | 10%  |
| Deploy em Testnet          | 10%  |
| Clareza do Relatório       | 10%  |

**Nota final = soma ponderada**
