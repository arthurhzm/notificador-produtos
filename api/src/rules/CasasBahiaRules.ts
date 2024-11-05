import { Rules } from "./Rules";

export class CasasBahiaRules extends Rules {
    getSelector(): string {
        return "#product-price span.css-1vmkvrm";
    }
}