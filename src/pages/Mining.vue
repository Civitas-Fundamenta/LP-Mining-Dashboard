<template>
<q-page>
  <div v-if="paused === true">
    <h1>Currently Paused</h1>
  </div>
  <div v-if="paused === false">
    <div class="row text-center">
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card bordered class="cbg">
          <q-card-section>
            <div class="text-h6">Open A Position</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input v-model="positionAmount" dark label-color="white" color="white" type="number" label="Enter Amount to Add" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <br />
            <p style="text-align: left;">Select Token</p>
            <br />
            <q-select filled v-model="tokenOptions" color="white" dark :options="tokens" label="Select Token" />
          </q-card-section>

          <q-card-section>
            <br />
            <p style="text-align: left;">Select Lock Period</p>
            <br />
            <q-slider v-model="lockPeriod" markers :min="5" :max="15" :step="5" label />
          </q-card-section>

          <q-card-section>
            <q-btn color="white" @click="getApproval" text-color="black" label="Approve" />
            <q-btn color="white" style="margin-left: 1%;" @click="createPosition" text-color="black" label="Create Position" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card flat bordered class="cbg">
          <q-card-section>
            Remove Position/Withdraw Yield
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-select filled v-model="tokenOptions" dark color="white" :options="tokens" label="Select Pool" />
            <br />
            <q-btn color="white" @click="selectPool" text-color="black" label="Look For Open Positions" />
          </q-card-section>
          <!-- Has A Position -->
          <q-card-section class="q-pt-none" v-if="HasPosition === true">
            <q-card class="my-card cbg">
              <q-card-section class="bg-primary text-white">
                <div class="text-h6">Current Position:</div>
                <div class="text-subtitle2">
                  Unlock Height: {{ countDown }} | Locked:
                  {{ LockedAmount }} LP Tokens
                </div>
                <div class="text-subtitle2">
                  Lock Period: {{ Days }} Days | DPY (User BP): {{ UserBP }}
                </div>
                <div class="text-subtitle2">
                  Total Rewards Paid: {{ TotalRewardsPaid }} FMTA
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="center">
                <q-btn label="Withdraw Yield Only" flat @click="withdrawOnly"></q-btn>
                <q-btn label="Withdraw & Add" flat @click="withdrawAndAdd"></q-btn>
                <q-btn label="Remove Entire Position" @click="removeEntirePosition" flat></q-btn>
              </q-card-actions>

              <q-card-section class="bg-primary text-white" v-if="withdrew === true">
                <q-input v-model="withdrawAmount" type="number" dark label-color="white" color="white" label="Enter Amount to Add" />
                <q-btn text-color="black" color="white" @click="finalWithdraw" label="Approve" />
              </q-card-section>
            </q-card>
          </q-card-section>
          <!-- No Position -->
          <q-card-section class="q-pt-none" v-if="HasPosition === false">
            <q-banner inline-actions class="text-white bg-red" rounded>
              We Couldn't Find Any Open Positions.
            </q-banner>
          </q-card-section>
          <q-card-section>
            <q-banner inline-actions class="text-white bg-red">
              WITHDRAW YIELD ONLY AND WITHDRAW AND ADD WILL RELOCK YOUR
              POSITION FOR THE SAME PERIOD IT WAS PREVIOUSLY LOCKED FOR
            </q-banner>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
/* eslint-disable */
import usABI from "../assets/usabi.json";
import ethABI from "../assets/ethabi.json";
import uniswapETHFTMAABI from "../assets/uniswapETHFTMAABI.json";
import uniswapETHABI from "../assets/uniswapETHABI.json";

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
      HasPosition: "",
      UnlockHeight: "",
      LockedAmount: "",
      Days: "",
      UserBP: "",
      TotalRewardsPaid: "",
      withdrew: "",
      withdrawAmount: "",
      removeAll: "",
      uniswapETHFTMA: "",
      uniswapETHFTMAContract: "",
      contractAddress: "",
      contract: "",
      countDown: "Loading...",
      userAccount: []
    };
  },
  mounted() {
    // do something after mounting vue instance
    this.init();
  },
  methods: {
    async init() {
      await this.$API.onboard.walletSelect();
      await this.$API.onboard.walletCheck();
      this.userAccount = await this.$API.web3.eth.getAccounts();
      this.CheckChainData();
    },
    async CheckChainData() {
      this.contractAddress = "0xF6de2B6eAB93d3A0AEC5863e3190b319602A1e70"; // Liquidity Mining Contract
      this.contract = new this.$API.web3.eth.Contract(
        ethABI,
        this.contractAddress
      );
      this.contract.methods
        .paused()
        .call()
        .then(response => {
          this.paused = response;
        });
    },
    async getApproval() {
      const amountInt = this.$API.web3.utils.toWei(
        this.positionAmount,
        "ether"
      );
      const amount = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        amountInt
      );
      const poolAddress = this.tokenOptions.address;
      if (this.tokenOptions.label === "FMTA/USDC") {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          usABI,
          this.contractAddress
        );
        this.uniswapETHFTMA = "0x650e8b9d20293a276f76be24da4ce25f2d0090fb"; // USDC/FMTA Pool UNI-V2 Token
        this.uniswapETHFTMAContract = new this.$API.web3.eth.Contract(
          uniswapETHFTMAABI,
          this.uniswapETHFTMA
        );
        console.log(this.uniswapETHFTMAContract);
      } else {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          ethABI,
          this.contractAddress
        );
        this.uniswapETHFTMA = "0x8f6BcB61836F43cFDb7DE46e2244d363D90527Ef"; // ETH/FMTA Pool UNI-V2 Token
        this.uniswapETHFTMAContract = new this.$API.web3.eth.Contract(
          uniswapETHABI,
          this.uniswapETHFTMA
        );
        console.log(this.uniswapETHFTMAContract);
      }
      this.uniswapETHFTMAContract.methods.approve(poolAddress, amount).send({
        from: this.userAccount[0]
      }).then(receipt => {
        this.$q.notify(`Stake Added - Transaction Hash: ${receipt.hash}`);
      });
    },
    async createPosition() {
      if (this.tokenOptions.label === "FMTA/USDC") {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          usABI,
          this.contractAddress
        );
      } else {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          ethABI,
          this.contractAddress
        );
      }
      const amountInt = this.$API.web3.utils.toWei(
        this.positionAmount,
        "ether"
      );
      const amount = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        amountInt
      );
      const poolId = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        this.tokenOptions.pid
      );
      const lockInPeriod = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        this.lockPeriod
      );
      this.contract.methods.addPosition(amount, lockInPeriod, poolId).send({
        from: this.userAccount[0]
      });
    },
    async countDownFunc() {
      const poolId = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        this.tokenOptions.pid
      );
      this.contract.methods
        .hasPosition(this.userAccount[0], poolId)
        .call({
          from: this.userAccount[0]
        })
        .then(receipt => {
          this.HasPosition = receipt;
          this.contract.methods
            .provider(poolId, this.userAccount[0])
            .call()
            .then(response => {
              this.UnlockHeight = response.UnlockHeight;
              this.$API.web3.eth.getBlockNumber().then(blockHeight => {
                const currentBlock = blockHeight;
                this.countDown = this.UnlockHeight - currentBlock;
                if (this.countDown < 0) {
                  this.countDown = "Unlocked";
                }
                console.info(this.countDown);
              });
            });
        });
    },
    async selectPool() {
      if (this.tokenOptions.label === "FMTA/USDC") {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          usABI,
          this.contractAddress
        );
      } else {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          ethABI,
          this.contractAddress
        );
      }
      const poolId = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        this.tokenOptions.pid
      );
      this.contract.methods
        .hasPosition(this.userAccount[0], poolId)
        .call({
          from: this.userAccount[0]
        })
        .then(receipt => {
          this.HasPosition = receipt;
          this.contract.methods
            .provider(poolId, this.userAccount[0])
            .call()
            .then(response => {
              this.LockedAmount = response.LockedAmount / 1000000000000000000;
              this.Days = response.Days;
              this.UserBP = response.UserBP;
              this.TotalRewardsPaid =
                response.TotalRewardsPaid / 1000000000000000000;
            });
        });
      setInterval(() => {
        this.countDownFunc();
      }, 15000);
    },
    async withdrawAndAdd() {
      this.withdrew = true;
    },
    async finalWithdraw() {
      const poolId = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        this.tokenOptions.pid
      );
      const amountToWithdraw = this.$API.web3.utils.toWei(
        this.withdrawAmount,
        "ether"
      );
      const amount = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        amountToWithdraw
      );
      if (this.tokenOptions.label === "FMTA/USDC") {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          usABI,
          this.contractAddress
        );
        this.uniswapETHFTMA = "0x650e8b9d20293a276f76be24da4ce25f2d0090fb"; // USDC/FMTA Pool UNI-V2 Token
        this.uniswapETHFTMAContract = new this.$API.web3.eth.Contract(
          uniswapETHFTMAABI,
          this.uniswapETHFTMA
        );
      } else {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          ethABI,
          this.contractAddress
        );
        this.uniswapETHFTMA = "0x8f6BcB61836F43cFDb7DE46e2244d363D90527Ef"; // ETH/FMTA Pool UNI-V2 Token
        this.uniswapETHFTMAContract = new this.$API.web3.eth.Contract(
          uniswapETHABI,
          this.uniswapETHFTMA
        );
      }
      this.uniswapETHFTMAContract.methods
        .approve(this.tokenOptions.address, amount)
        .send({
          from: this.userAccount[0]
        })
        .then(receipt => {
          this.withdrawFinal();
        });
    },
    async withdrawFinal() {
      const poolId = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        this.tokenOptions.pid
      );
      const amountToWithdraw = this.$API.web3.utils.toWei(
        this.withdrawAmount,
        "ether"
      );
      const amount = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        amountToWithdraw
      );
      if (this.tokenOptions.label === "FMTA/USDC") {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          usABI,
          this.contractAddress
        );
      } else {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          ethABI,
          this.contractAddress
        );
      }
      this.contract.methods.withdrawAccruedYieldAndAdd(poolId, amount).send({
        from: this.userAccount[0]
      });
    },
    async withdrawOnly() {
      if (this.tokenOptions.label === "FMTA/USDC") {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          usABI,
          this.contractAddress
        );
      } else {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          ethABI,
          this.contractAddress
        );
      }
      const poolId = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        this.tokenOptions.pid
      );
      //const amountToWithdraw = this.$API.web3.utils.toWei(this.withdrawAmount, "ether");
      const amount = this.$API.web3.eth.abi.encodeParameter("uint256", 0);
      this.contract.methods.withdrawAccruedYieldAndAdd(poolId, amount).send({
        from: this.userAccount[0]
      });
    },
    async removeEntirePosition() {
      if (this.tokenOptions.label === "FMTA/USDC") {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          usABI,
          this.contractAddress
        );
      } else {
        this.contractAddress = this.tokenOptions.address; // Liquidity Mining Contract
        this.contract = new this.$API.web3.eth.Contract(
          ethABI,
          this.contractAddress
        );
      }
      const poolId = this.$API.web3.eth.abi.encodeParameter(
        "uint256",
        this.tokenOptions.pid
      );
      this.contract.methods
        .provider(poolId, this.userAccount[0])
        .call()
        .then(response => {
          const entirePosition = response.LockedAmount;
          const entirePositionFinal = this.$API.web3.eth.abi.encodeParameter(
            "uint256",
            entirePosition
          );
          console.log(entirePosition + " Entire Position as Wei");
          console.log(entirePositionFinal + " Entire Position as uint256");
          this.contract.methods
            .removePosition(entirePositionFinal, poolId)
            .send({
              from: this.userAccount[0]
            });
        });
    }
  }
};
</script>
