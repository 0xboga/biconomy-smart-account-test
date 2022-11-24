import {
    ChainId
  } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import { ethers } from 'ethers';
import HDWalletProvider from "@truffle/hdwallet-provider";


const pKey = "some-private-key"; // evm private key
const rpcUrl = "https://data-seed-prebsc-2-s1.binance.org:8545"; // bsc testnet rpc
const dappAPIKey = "api-key-from-biconomy-dashboard"; // api key for dapp registered in the dashboard

const testBiconomy = async () => {
    const provider = new HDWalletProvider(pKey, rpcUrl);
    const walletProvider = new ethers.providers.Web3Provider(provider);
    
    const options = {
      activeNetworkId: ChainId.BSC_TESTNET,
      supportedNetworksIds: [ ChainId.BSC_TESTNET ],
      networkConfig: [
          {
          chainId: ChainId.BSC_TESTNET,
          dappAPIKey: dappAPIKey,
        }
      ]
    }
  
    let smartAccount = new SmartAccount(walletProvider, options);
    smartAccount = await smartAccount.init();    
    
    console.log('BICONOMY SMART ACCOUNT', smartAccount);

    const tx = {
      to: '0xfabFf3c87e037Ea0332077C70c569E02DcFD0533', // our smart contract
      data: '0x0a5936f1', // function signature
      value: '0x0' // empty value 
    }

    const txResponse = await smartAccount.sendGasLessTransaction({ transaction: tx });

    console.log(txResponse);
}

testBiconomy();