import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const argumentos = new Set(process.argv.slice(2));
const deveFazerDeploy = argumentos.has("-d") || argumentos.has("--deploy");

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

if (deveFazerDeploy) {
	executar(npmCommand, ["--prefix", "repairdao-contracts", "run", "deploy:sepolia"]);
}

executar(npmCommand, ["--prefix", "repairdao", "run", "db:reset"]);
executar(npmCommand, ["--prefix", "repairdao", "run", "dev"]);
