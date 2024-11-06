export abstract class Rules {
    abstract getSelector(): string;

    getPriceUsingRegex(content: string): number | null {
        // Regex melhorado para capturar formatos como R$, USD, EUR, etc.
        const priceRegex = /(?:R\$|US\$|\€|\£)?\s?(\d{1,3}(?:\.\d{3})*,\d{2})/g;
        const matches = content.match(priceRegex);

        if (matches && matches.length > 0) {
            const priceText = matches[0].replace(/[^\d,.-]/g, '').replace(',', '.');
            return parseFloat(priceText);
        }
        return null;
    }

}