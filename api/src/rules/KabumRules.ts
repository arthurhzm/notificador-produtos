import { Rules } from "./Rules";

export class TerabyteShopRules extends Rules {
    getSelector(): string {
        return ".sc-5492faee-2.ipHrwP.finalPrice";
    }
}