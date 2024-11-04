import { Rules } from "./Rules";

export class MercadoLivreRules extends Rules {
    getSelector(): string {
        return ".ui-pdp-price__second-line span.andes-money-amount__fraction";
    }
}