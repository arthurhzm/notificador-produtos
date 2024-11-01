import { Rules } from "./Rules";

export class MercadoLivreRules extends Rules {
    getSelector(): string {
        return ".andes-money-amount__fraction";
    }
}