import { INetwork } from "../models/db/INetwork";

export interface AppState {
    /**
     * The current active network.
     */
    networkId: string;

    /**
     * The networks.
     */
    networks: INetwork[];

    /**
     * Darkmode theme
     */
    darkMode?: boolean;

    /**
     * config of current network
     */
    networkConfig?: INetwork;
}
