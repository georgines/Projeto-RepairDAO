import { spawn, spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const contractsEnvPath = path.join(repoRoot, "repairdao-contracts", ".env");

function executar(comando, args) {
	const resultado = spawnSync(comando, args, {
		cwd: repoRoot,
		stdio: "inherit",
		shell: process.platform === "win32",
	});

	if (resultado.error) {
		throw resultado.error;
	}

	if (resultado.status !== 0) {
		process.exit(resultado.status ?? 1);
	}
}

function lerVariavelAmbienteDoArquivo(caminhoArquivo, chave) {
	if (!existsSync(caminhoArquivo)) {
		return null;
	}

	const conteudo = readFileSync(caminhoArquivo, "utf8");

	for (const linha of conteudo.split(/\r?\n/)) {
		const texto = linha.trim();

		if (!texto || texto.startsWith("#")) {
			continue;
		}

		const separador = texto.indexOf("=");

		if (separador === -1) {
			continue;
		}

		const nome = texto.slice(0, separador).trim();

		if (nome !== chave) {
			continue;
		}

		const valor = texto.slice(separador + 1).trim().replace(/^['"]|['"]$/g, "");
		return valor || null;
	}

	return null;
}

function obterRpcLocal() {
	return (
		lerVariavelAmbienteDoArquivo(contractsEnvPath, "HARDHAT_RPC_URL") ||
		process.env.HARDHAT_RPC_URL ||
		"http://127.0.0.1:8545"
	);
}

async function aguardarRpc(url, tentativas = 30, intervaloMs = 1000) {
	for (let tentativa = 1; tentativa <= tentativas; tentativa += 1) {
		try {
			const resposta = await fetch(url, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					jsonrpc: "2.0",
					id: tentativa,
					method: "eth_chainId",
					params: [],
				}),
			});

			if (resposta.ok) {
				return;
			}
		} catch {}

		await new Promise((resolve) => setTimeout(resolve, intervaloMs));
	}

	throw new Error(`Nao foi possivel conectar ao Hardhat RPC em ${url}.`);
}

function iniciarNoLocal() {
	const processo = spawn(npmCommand, ["--prefix", "repairdao-contracts", "run", "node"], {
		cwd: repoRoot,
		detached: true,
		stdio: "ignore",
		shell: process.platform === "win32",
	});

	processo.unref();
}

try {
	iniciarNoLocal();
	await aguardarRpc(obterRpcLocal());
	executar(npmCommand, ["--prefix", "repairdao-contracts", "run", "deploy:local"]);
	executar(npmCommand, ["--prefix", "repairdao", "run", "db:reset"]);
	executar(npmCommand, ["--prefix", "repairdao", "run", "dev"]);
} catch (error) {
	console.error(error);
	process.exit(1);
}
