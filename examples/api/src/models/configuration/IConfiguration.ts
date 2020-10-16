/**
 * Definition of configuration file.
 */
export interface IConfiguration {
    /**
     * The providers to use for IOTA communication on mainnet.
     */
    nodes: {
        [network: string]: string;
    };

    /**
     * A list of domains allowed to access the api.
     */
    allowedDomains: string[];

    /**
     * Enable verbose API logging.
     */
    verboseLogging: boolean;
}
