import { Rules } from "./Rules";

export class TerabyteShopRules extends Rules {
    getSelector(): string {
        return ".a-section.a-spacing-none.aok-align-center.aok-relative span.a-price-whole";
    }
}