
export interface ICurrencySettings {
    /**
     * The fiat code for currency conversion.
     */
    fiatCode: string;

    /**
     * The time the last currency update happened.
     */
    lastCurrencyUpdate?: number;

    /**
     * The base currency for exchange rates.
     */
    baseCurrencyRate?: number;

    /**
     * The market cap.
     */
    marketCap?: number;

    /**
     * The volume in the last 24H.
     */
    volume24h?: number;

    /**
     * The currencies used for conversion.
     */
    currencies?: {
        /**
         * Id of the currency.
         */
        id: string;
        /**
         * The rate.
         */
        rate: number;
    }[];

    /**
     * The currency id to full name map.
     */
    currencyNames?: {
        /**
         * Id to name key value pair.
         */
        [id: string]: string;
    };
}
