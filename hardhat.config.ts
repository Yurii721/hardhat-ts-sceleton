import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
// Official plugins.
/*
 * The toolbox (`@nomicfoundation/hardhat-toolbox`) contains:
 *  - @nomicfoundation/hardhat-network-helpers;
 *  - @nomicfoundation/hardhat-chai-matchers;
 *  - @nomiclabs/hardhat-ethers;
 *  - @nomiclabs/hardhat-etherscan;
 *  - chai;
 *  - ethers;
 *  - hardhat-gas-reporter;
 *  - solidity-coverage;
 *  - @typechain/hardhat;
 *  - typechain;
 *  - @typechain/ethers-v5;
 *  - @ethersproject/abi;
 *  - @ethersproject/providers.
 *
 * This is no need to install or import them.
 *
 * NOTE. This applies to npm 7 or later. This project is not designed to be used with an older version of npm.
 */
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
// Community plugins.
import "hardhat-contract-sizer";
import "hardhat-tracer"; // To see events, calls and storage operations during testing.
import "hardhat-abi-exporter";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-dependency-compiler"; // See the comment for the field `dependencyCompiler` in `config`.
import "solidity-docgen"; // The tool by OpenZeppelin to generate documentation for contracts in the Markdown format.

// See `README.md` for details.

/*
 * Private keys for the network configuration.
 *
 * Setting in `.env` file.
 */
// prettier-ignore
const ETHEREUM_MAINNET_KEYS: string[] = process.env.ETHEREUM_MAINNET_KEYS ?
    process.env.ETHEREUM_MAINNET_KEYS.split(",") : [];
// prettier-ignore
const ETHEREUM_TESTNET_KEYS: string[] = process.env.ETHEREUM_TESTNET_KEYS ?
    process.env.ETHEREUM_TESTNET_KEYS.split(",") : [];
// See `config.networks`.
// const POLYGON_MAINNET_KEYS: string[] = process.env.POLYGON_MAINNET_KEYS ?
//     process.env.POLYGON_MAINNET_KEYS.split(",") : [];
// const POLYGON_TESTNET_KEYS: string[] = process.env.POLYGON_TESTNET_KEYS ?
//     process.env.POLYGON_TESTNET_KEYS.split(",") : [];

/*
 * The solc compiler optimizer configuration. (The optimizer is disabled by default).
 *
 * Set `ENABLED_OPTIMIZER` in `.env` file to true for enabling.
 *
 * NOTE. It is enabled for commands `$ npm run deploy:...` by default.
 */
// `!!` to convert to boolean.
const ENABLED_OPTIMIZER: boolean = !!process.env.ENABLED_OPTIMIZER || !!process.env.REPORT_GAS || false;
// `+` to convert to number.
const OPTIMIZER_RUNS: number = process.env.OPTIMIZER_RUNS ? +process.env.OPTIMIZER_RUNS : 200;

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: ENABLED_OPTIMIZER,
                        runs: OPTIMIZER_RUNS
                    }
                }
            } //,
            // { // Example of adding of multiple compiler versions within the same project.
            //     version: "0.7.6",
            //     settings: {
            //         optimizer: {
            //             enabled: ENABLED_OPTIMIZER,
            //             runs: OPTIMIZER_RUNS
            //         }
            //     }
            // }
        ] //,
        // overrides: { // Example of specifying of a compiler for a specified contract.
        //     "contracts/Foo.sol": {
        //         version: "0.5.5",
        //         settings: { }
        //     }
        // }
    },
    // defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            allowUnlimitedContractSize: !ENABLED_OPTIMIZER,
            accounts: {
                // Default value: "10000000000000000000000" (10000 ETH).
                accountsBalance: process.env.ACCOUNT_BALANCE || "10000000000000000000000",
                // Default value: 20.
                count: process.env.NUMBER_OF_ACCOUNTS ? +process.env.NUMBER_OF_ACCOUNTS : 20
            },
            forking: {
                url: process.env.FORKING_URL || "",
                enabled: process.env.FORKING !== undefined
            }//,
            /*
             * Uncomment the line below if Ethers reports the error
             * "Error: cannot estimate gas; transaction may fail or may require manual gas limit...".
             */
            // gas: 30000000//,
            // gasPrice: 8000000000
        },
        // Ethereum.
        // Rest parameter (...) to treat it as a single array (added in ES6)
        mainnet: {
            url: process.env.ETHEREUM_URL || "",
            accounts: [...ETHEREUM_MAINNET_KEYS]
        },
        goerli: {
            url: process.env.GOERLI_URL || "",
            accounts: [...ETHEREUM_TESTNET_KEYS]
        },
        sepolia: {
            url: process.env.SEPOLIA_URL || "",
            accounts: [...ETHEREUM_TESTNET_KEYS]
        } //,
        // // Polygon.
        // // Example of adding of other networks.
        // polygon: {
        //     url: process.env.POLYGON_URL || "",
        //     accounts: [...POLYGON_MAINNET_KEYS]
        // },
        // mumbai: {
        //     url:  process.env.MUMBAI_URL || "",
        //     accounts: [...POLYGON_TESTNET_KEYS]
        // }
    },
    contractSizer: {
        except: ["mocks/", "from-dependencies/"]
    },
    /*
     * A Mocha reporter for test suites:
     *  - Gas usage per unit test.
     *  - Metrics for method calls and deployments.
     *  - National currency costs of deploying and using your contract system.
     *
     * See https://github.com/cgewecke/hardhat-gas-reporter#readme for more details.
     */
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        excludeContracts: ["from-dependencies/"],
        /*
         * Available currency codes can be found here:
         * https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions.
         */
        currency: "USD", // "CHF", "EUR", ....
        outputFile: process.env.GAS_REPORT_TO_FILE ? "gas-report.txt" : undefined
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
        /*
         * If the project targets multiple EVM-compatible networks that have different explorers, then it is necessary
         * to set multiple API keys.
         *
         * Note. This is not necessarily the same name that is used to define the network.
         * To see the full list of supported networks, run `$ npx hardhat verify --list-networks`. The identifiers
         * shown there are the ones that should be used as keys in the `apiKey` object.
         *
         * See the link for details:
         * https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#multiple-api-keys-and-alternative-block-explorers.
         */
        // apiKey: {
        //     mainnet: "ETHERSCAN_API_KEY",
        //     goerli: "ETHERSCAN_API_KEY",
        //     sepolia: "ETHERSCAN_API_KEY",
        //     polygon: "POLYGONSCAN_API_KEY",
        //     polygonMumbai: "POLYGONSCAN_API_KEY"
        // }
    },
    abiExporter: {
        pretty: true,
        except: ["interfaces/", "mocks/", "from-dependencies/"]
    },
    docgen: {
        pages: "files"
    },
    // For getting of contracts directly from npm-dependencies instead of mocks.
    dependencyCompiler: {
        paths: [
            // "@openzeppelin/contracts/token/ERC20/IERC20.sol",
            // "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol",
            // "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol"
        ],
        path: "./from-dependencies"//,
        /*
         * Required for Slither if something in `paths`. It is to keep temporary file directory after compilation is
         * complete.
         */
        // keep: true
    }
};

// By default fork from the latest block.
if (process.env.FORKING_BLOCK_NUMBER)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.networks!.hardhat!.forking!.blockNumber = +process.env.FORKING_BLOCK_NUMBER;

/*
 * This setting changes how Hardhat Network works, to mimic Ethereum's mainnet at a given hardfork.
 * It should be one of "byzantium", "constantinople", "petersburg", "istanbul", "muirGlacier", "berlin",
 * "london" and "arrowGlacier".
 *
 * Default value: "arrowGlacier".
 */
if (process.env.HARDFORK)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.networks!.hardhat!.hardfork = process.env.HARDFORK;

// Extra settings for `hardhat-gas-reporter`.
/*
 * CoinMarketCap requires an API key to access price data. The reporter uses an unprotected free key by default
 * (10K requests/mo). You can get your own API key (https://coinmarketcap.com/api/pricing/) and set it with the
 * option `coinmarketcap`.
 *
 * In case of a particular blockchain, the options `token` and `gasPriceApi` can be configured (API key rate
 * limit may apply).
 *
 * NOTE. HardhatEVM implements the Ethereum blockchain. To get accurate gas measurements for other chains it
 * may be necessary to run tests against development clients developed specifically for those networks.
 */
if (process.env.COIN_MARKET_CAP_API_KEY)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.gasReporter!.coinmarketcap = process.env.COIN_MARKET_CAP_API_KEY;
/*
 * Examples of the options `token` and `gasPriceApi`:
 * https://github.com/cgewecke/hardhat-gas-reporter#token-and-gaspriceapi-options-example.
 *
 * NOTE 1. These APIs have rate limits (https://docs.etherscan.io/support/rate-limits).
 * Depending on the usage, it might require an API key
 * (https://docs.etherscan.io/getting-started/viewing-api-usage-statistics).
 *
 * NOTE 2. Any gas price API call which returns a JSON-RPC response formatted like this is supported:
 * {"jsonrpc":"2.0","id":73,"result":"0x6fc23ac00"}.
 */
/*
 * For the Polygon blockchain:
 * `token`: "MATIC",
 * `gasPriceApi`: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice".
 */
if (process.env.GAS_REPORTER_TOKEN_SYMBOL)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.gasReporter!.token = process.env.GAS_REPORTER_TOKEN_SYMBOL; // Default value: "ETH".
// Default value: "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice" (Etherscan).
if (process.env.GAS_PRICE_API_URL)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.gasReporter!.gasPriceApi = process.env.GAS_PRICE_API_URL;

export default config;
