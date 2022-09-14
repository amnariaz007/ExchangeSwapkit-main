import { InjectedConnector } from "@web3-react/injected-connector";

export const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
    supportedChainIds: [ 56 ]
});

export const RPC_URLS = {
    56: "https://bsc-dataseed.binance.org/"
    // 97: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    // 3:"https://ropsten.infura.io/v3/84842078b09946638c03157f83405213"
};
//connectors