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
            <q-slider v-model="lockPeriod" markers :min="5" :max="15" :step="5" label dark />
          </q-card-section>

          <q-card-section>
            <q-btn color="white" v-if="notApproved === true" @click="getApproval" text-color="black" label="Approve" />
            <q-btn color="white" v-if="notApproved === false" style="margin-left: 1%;" @click="createPosition" text-color="black" label="Create Position" />
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
                <q-btn color="white" v-if="notApproved === true" @click="finalWithdraw" text-color="black" label="Approve" />
                <q-btn color="white" v-if="notApproved === false" style="margin-left: 1%;" @click="withdrawFinal" text-color="black" label="Withdraw" />
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
import usABI from '../assets/usabi.json';
import ethABI from '../assets/ethabi.json';
import uniswapETHFTMAABI from '../assets/uniswapETHFTMAABI.json';
import pools from '../assets/pools.json';

export default {
  name: 'PageIndex',
  data() {
    return {
      paused: false,
      positionAmount: 0,
      tokenOptions: null,
      tokens: pools,
      lockPeriod: 5,
      HasPosition: false,
      UnlockHeight: '',
      LockedAmount: '',
      Days: '',
      UserBP: '',
      TotalRewardsPaid: '',
      withdrew: false,
      withdrawAmount: '',
      removeAll: '',
      uniswapETHFTMA: '',
      uniswapETHFTMAContract: '',
      contractAddress: '0x3A80a7C271450802D9a9E689A7a1D80EF727dfCb',
      contract: '',
      countDown: 'Loading...',
      notApproved: false,
      networkId: 56,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      if (this.$API.userAccount === undefined) {
        await this.$API.init(this.networkId);
        this.CheckChainData();
      } else {
        this.CheckChainData();
      }
    },
    async CheckChainData() {
      this.contract = new this.$API.web3.eth.Contract(ethABI, this.contractAddress);
      this.contract.methods.paused().call().then((response) => {
        this.paused = response;
      });
      this.uniswapETHFTMA = '0xD6ad33F95dFcef3760De2889758E9fe5E3d5b12B'; // USDC/FMTA Pool UNI-V2 Token
      this.uniswapETHFTMAContract = new this.$API.web3.eth.Contract(uniswapETHFTMAABI, this.uniswapETHFTMA);
      this.uniswapETHFTMAContract.methods.allowance(this.$API.userAccount[0], '0x3A80a7C271450802D9a9E689A7a1D80EF727dfCb').call({
        from: this.$API.userAccount[0],
      }).then((receipt) => {
        if (receipt === '115792089237316195423570985008687907853269984665640564039457584007913129639935') {
          console.log(receipt);
          this.notApproved = false;
        } else {
          this.notApproved = true;
          console.log(receipt);
        }
      });
    },
    async getApproval() {
      const amounts = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
      const amount = this.$API.web3.eth.abi.encodeParameter('uint256', amounts);
      const poolAddress = this.contractAddress;
      this.contract = new this.$API.web3.eth.Contract(usABI, this.contractAddress);
      this.uniswapETHFTMA = '0xD6ad33F95dFcef3760De2889758E9fe5E3d5b12B'; // USDC/FMTA Pool UNI-V2 Token
      this.uniswapETHFTMAContract = new this.$API.web3.eth.Contract(uniswapETHFTMAABI, this.uniswapETHFTMA);
      this.uniswapETHFTMAContract.methods.approve(poolAddress, amount).send({
        from: this.$API.userAccount[0],
      }).then((receipt) => {
        this.$q.notify(`Stake Added - Transaction Hash: ${receipt.hash}`);
        this.CheckChainData();
      });
    },
    async createPosition() {
      this.contract = new this.$API.web3.eth.Contract(usABI, this.contractAddress);
      const amountInt = this.$API.web3.utils.toWei(this.positionAmount, 'ether');
      const amount = this.$API.web3.eth.abi.encodeParameter('uint256', amountInt);
      const poolId = this.$API.web3.eth.abi.encodeParameter('uint256', this.tokenOptions.pid);
      const lockInPeriod = this.$API.web3.eth.abi.encodeParameter('uint256', this.lockPeriod);
      this.contract.methods.addPosition(amount, lockInPeriod, poolId).send({
        from: this.$API.userAccount[0],
      });
    },
    async countDownFunc() {
      const poolId = this.$API.web3.eth.abi.encodeParameter('uint256', this.tokenOptions.pid);
      this.contract.methods.hasPosition(this.$API.userAccount[0], poolId).call({
        from: this.$API.userAccount[0],
      }).then((receipt) => {
        this.HasPosition = receipt;
        this.contract.methods.provider(poolId, this.$API.userAccount[0]).call().then((response) => {
          this.UnlockHeight = response.UnlockHeight;
          this.$API.web3.eth.getBlockNumber().then((blockHeight) => {
            const currentBlock = blockHeight;
            this.countDown = this.UnlockHeight - currentBlock;
            if (this.countDown < 0) {
              this.countDown = 'Unlocked';
            }
          });
        });
      });
    },
    async selectPool() {
      this.contract = new this.$API.web3.eth.Contract(usABI, this.contractAddress);
      const poolId = this.$API.web3.eth.abi.encodeParameter('uint256', this.tokenOptions.pid);
      this.contract.methods.hasPosition(this.$API.userAccount[0], poolId).call({
        from: this.$API.userAccount[0],
      }).then((receipt) => {
        this.HasPosition = receipt;
        this.contract.methods.provider(poolId, this.$API.userAccount[0]).call().then((response) => {
          this.LockedAmount = response.LockedAmount / 1000000000000000000;
          this.Days = response.Days;
          this.UserBP = response.UserBP;
          this.TotalRewardsPaid = response.TotalRewardsPaid / 1000000000000000000;
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
      const amountToWithdraw = this.$API.web3.utils.toWei(this.withdrawAmount, 'ether');
      const amount = this.$API.web3.eth.abi.encodeParameter('uint256', amountToWithdraw);
      this.contract = new this.$API.web3.eth.Contract(usABI, this.contractAddress);
      this.uniswapETHFTMA = '0xD6ad33F95dFcef3760De2889758E9fe5E3d5b12B'; // USDC/FMTA Pool UNI-V2 Token
      this.uniswapETHFTMAContract = new this.$API.web3.eth.Contract(uniswapETHFTMAABI, this.uniswapETHFTMA);
      this.uniswapETHFTMAContract.methods.approve('0x980c1aad0cabb7b8d445d2a96da1ec252bcc2274', amount).send({
        from: this.$API.userAccount[0],
      }).then((receipt) => {
        this.$q.notify(`Approved - Transaction Hash: ${receipt.hash}`);
        this.withdrawFinal();
      });
    },
    async withdrawFinal() {
      const poolId = this.$API.web3.eth.abi.encodeParameter('uint256', this.tokenOptions.pid);
      const amountToWithdraw = this.$API.web3.utils.toWei(this.withdrawAmount, 'ether');
      const amount = this.$API.web3.eth.abi.encodeParameter('uint256', amountToWithdraw);
      if (this.tokenOptions.label === 'FMTA/BNB') {
        this.contract = new this.$API.web3.eth.Contract(usABI, this.contractAddress);
      }
      this.contract.methods.withdrawAccruedYieldAndAdd(poolId, amount).send({
        from: this.$API.userAccount[0],
      });
    },
    async withdrawOnly() {
      this.contract = new this.$API.web3.eth.Contract(usABI, this.contractAddress);
      const poolId = this.$API.web3.eth.abi.encodeParameter('uint256', this.tokenOptions.pid);
      const amount = this.$API.web3.eth.abi.encodeParameter('uint256', 0);
      this.contract.methods.withdrawAccruedYieldAndAdd(poolId, amount).send({
        from: this.$API.userAccount[0],
      });
    },
    async removeEntirePosition() {
      this.contract = new this.$API.web3.eth.Contract(usABI, this.contractAddress);
      const poolId = this.$API.web3.eth.abi.encodeParameter('uint256', this.tokenOptions.pid);
      this.contract.methods.provider(poolId, this.$API.userAccount[0]).call().then((response) => {
        const entirePosition = response.LockedAmount;
        const entirePositionFinal = this.$API.web3.eth.abi.encodeParameter('uint256', entirePosition);
        this.contract.methods.removePosition(entirePositionFinal, poolId).send({
          from: this.$API.userAccount[0],
        });
      });
    },
  },
};
</script>
