import { Rules } from "./Rules";

export class TerabyteShopRules extends Rules {
    getSelector(): string {
        return "#product-price span.css-1vmkvrm";
    }
}