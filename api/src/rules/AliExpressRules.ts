import { Rules } from "./Rules";

export class AliExpressRules extends Rules {
    getSelector(): string {
        return ".price--currentPriceText--V8_y_b5 pdp-comp-price-current";
    }
}