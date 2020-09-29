<template>
<q-page>
  <div v-if="paused === true">
    <h1>Currently Paused</h1>
  </div>
  <div v-if="paused === false">
    <div class="row text-center">
      <div class="col" style="padding: 2%;">
        <q-card>
          <q-card-section>
            <div class="text-h6">Open A Position</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input v-model="positionAmount" type="number" label="Enter Amount to Add" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <br />
            <p style="text-align: left;">Select Token</p>
            <br />
            <q-select filled v-model="tokenOptions" :options="tokens" label="Select Token" />
          </q-card-section>

          <q-card-section>
            <br />
            <p style="text-align: left;">Select Lock Period</p>
            <br />
            <q-slider v-model="lockPeriod" markers :min="1" :max="5" :step="2" label />
            <!--<q-btn color="white" @click="" text-color="black" label="Add Stake" />-->
          </q-card-section>

          <q-card-section>
            <q-btn color="white" @click="getApproval" text-color="black" label="Open Position" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col" style="padding: 2%;">
        <q-card flat bordered>
          <q-card-section>
            Maximum Stake:
          </q-card-section>
          <q-card-section class="q-pt-none"> </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
/* eslint-disable */
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import ABI from "../assets/abi.json";
import uniswapETHFTMAABI from "../assets/uniswapETHFTMAABI.json";

const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
};
if (!ethEnabled()) {
  alert(
    "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
  );
}
const contractAddress = "0xA8DFb731d14e08068ebd233b56936F2AAa22B518";
const contract = new window.web3.eth.Contract(ABI, contractAddress);
const uniswapETHFTMA = "0xa1e9246db65237c6465e8f2ee96c7816b46394c4";
const uniswapETHFTMAContract = new window.web3.eth.Contract(
  uniswapETHFTMAABI,
  uniswapETHFTMA
);

import pools from "../assets/pools.json";

export default {
  name: "PageIndex",
  data() {
    return {
      paused: "",
      positionAmount: "",
      tokenOptions: null,
      tokens: pools,
      lockPeriod: 1,
    };
  },
  created() {
    this.CheckChainData();
  },
  methods: {
    async CheckChainData() {
      const provider = await detectEthereumProvider();
      if (provider) {
        const chainId = await provider.request({
          method: "eth_chainId"
        });
        const userAccount = await provider.request({
          method: "eth_requestAccounts"
        });
        contract.methods
          .paused()
          .call()
          .then(response => {
            this.paused = response;
          });
      }
    },
    async getApproval() {
      const provider = await detectEthereumProvider();
      if (provider) {
        const chainId = await provider.request({
          method: "eth_chainId"
        });
        const userAccount = await provider.request({
          method: "eth_requestAccounts"
        });
        const amountInt = window.web3.utils.toWei(this.positionAmount, "ether");
        const amount = window.web3.eth.abi.encodeParameter(
          "uint256",
          amountInt
        );
        console.log('Approval Amount: ' + amountInt);
        uniswapETHFTMAContract.methods
          .approve('0xA8DFb731d14e08068ebd233b56936F2AAa22B518', amount)
          .send({
            from: userAccount[0]
          }).then((receipt) => {
            console.log(receipt);
            const amountInt = window.web3.utils.toWei(this.positionAmount, "ether");
            const amount = window.web3.eth.abi.encodeParameter(
              "uint256",
              amountInt
            );
            console.log('Position Amount: ' + amountInt);
            const lockInPeriod = window.web3.eth.abi.encodeParameter(
              "uint256",
              this.lockPeriod
            );
            console.log('Selected Lock in Period: ' + this.lockPeriod);
            const poolId = window.web3.eth.abi.encodeParameter(
              "uint256",
              this.tokenOptions.pid
            );
            console.log('Pool ID of Selection: ' + this.tokenOptions.pid);
            contract.methods
              .addPosition(amount, lockInPeriod, poolId)
              .send({
                from: userAccount[0]
              })
          });
      }
    },
  }
};
</script>
