<template>
<q-page class="fc">
  <!-- Staking Enabled -->
  <div v-if="off === false">
    <div v-if="paused === false">
      <div class="row text-center">
        <div class="col-xs-6 col-sm-4" style="padding: 2%;">
          <div class="shadow-5">
            <q-card bordered class="cbg">
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Total amount of FMTA Staked on the network
              </q-tooltip>
              <q-card-section class="b">
                FMTA Staked
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ totalStakes.toLocaleString() }}
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col-xs-6 col-sm-4" style="padding: 2%;">
          <div class="shadow-5">
            <q-card bordered class="cbg">
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Maximum amount of FMTA that can be staked per address
              </q-tooltip>
              <q-card-section class="b">
                Maximum Stake
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ stakeCap.toLocaleString() }}
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col-xs-6 col-sm-4" style="padding: 2%;">
          <div class="shadow-5">
            <q-card bordered class="cbg">
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Total amount of rewards paid to connected wallet (will show 0 if nothing staked)
              </q-tooltip>
              <q-card-section class="b">
                Rewards Paid
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ totalRewardsPaid.toLocaleString() }}
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col-xs-6 col-sm-6 BOTTOM RIGHT" style="padding: 2%;">
          <div class="shadow-5">
            <q-card bordered class="cbg">
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Current number of blocks needed between rewards withdrawals
              </q-tooltip>
              <q-card-section class="b">
                Reward Window
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ rewardsWindow.toLocaleString() }}
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6" style="padding: 2%;">
          <div class="shadow-5">
            <q-card bordered class="cbg">
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Number of blocks blocks until you can withdraw.
              </q-tooltip>
              <q-card-section class="b">
                Withdrawal Availability
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ lastWdheight.toLocaleString() }}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <br>
      <!-- if User Doesn't have a stake -->
      <div v-if="isStakeholder === false" class="row text-center justify-center">
        <div class="col-8" style="padding: 2%;">
          <!-- Add New Stake Card -->
          <div class="shadow-5">
            <q-card bordered class="my-card cbg">
              <q-card-section class="">
                <div class="text-h6">Add Stake</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input dark color="white" v-model="addStakeAmount" type="number" max="30000" label="Enter Amount to Stake">
                  <q-tooltip anchor="bottom left" self="top middle" transition-show="flip-right" transition-hide="flip-left">
                    Add a new staking position!. Stake Cap is {{ stakeCap.toLocaleString() }}
                  </q-tooltip>
                </q-input>
              </q-card-section>

              <q-card-section>
                <q-btn style="background: #93979A" @click="addStake" text-color="white" label="Add Stake">
                  <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                    ENGAGE!
                  </q-tooltip>
                </q-btn>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <!-- If User Has Stake -->
      <div v-if="isStakeholder === true">
        <div class="row text-center">
          <div class="col-xs-12 col-sm-6" style="padding: 2%;">
            <!-- Add Stake Card -->
            <div class="shadow-5">
              <q-card bordered class="my-card cbg">
                <q-card-section class="">
                  <div class="text-h6">Add Stake - Currently Staking: {{ stakeOf.toLocaleString() }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input dark color="white" v-model="addStakeAmount" type="number" max="30000" label="Enter Amount to Stake" />
                </q-card-section>

                <q-card-section>
                  <q-btn style="background: #93979A" @click="addStake" text-color="white" label="Add Stake">
                    <q-tooltip anchor="bottom left" self="top middle" transition-show="flip-right" transition-hide="flip-left">
                      Add a new staking position!. Stake Cap is {{ stakeCap.toLocaleString() }}
                    </q-tooltip>
                  </q-btn>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6" style="padding: 2%;">
            <!-- Remove Stake Card -->
            <div class="shadow-5">
              <q-card bordered class="my-card cbg">
                <q-card-section class="">
                  <div class="text-h6">Remove Stake - Currently Staking: {{ stakeOf.toLocaleString() }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input dark color="white" v-model="removeStakeAmount" type="number" max="30000" label="Enter Amount to Remove from Staking" />
                </q-card-section>

                <q-card-section>
                  <q-btn style="background: #93979A;" @click="removeStake" text-color="white" label="Remove Stake">
                    <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                      Remove Your Stakes. You will withdraw any pending rewards also.
                    </q-tooltip>
                  </q-btn>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div class="row text-center justify-center">
          <div class="col-xs-12 col-sm-6" style="padding: 2%;">
            <!-- Remove Stake Card -->
            <div class="shadow-5">
              <q-card bordered class="my-card cbg">
                <q-card-section class="">
                  <div class="text-h6">Pending Rewards: {{ pendingRewards.toLocaleString() }}</div>
                </q-card-section>

                <q-card-section>
                  <q-btn style="background: #93979A;" @click="withdrawStake" text-color="white" label="Withdraw">
                    <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                      GIMME DAT SWEET REWARD
                    </q-tooltip>
                  </q-btn>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- Staking Off-->
  <div v-if="off === true" style="padding: 2%;" class="text-center">
    <br>
    <div class="row text-center">
      <div class="col" style="padding: 2%;">
        <q-banner inline-actions class="text-white bg-red">
          Staking is currently disabled, You may still remove your stake.
        </q-banner>
      </div>
    </div>
    <div class="row text-center">
      <div class="col" style="padding: 2%;">
        <!-- Remove Stake Card -->
        <q-card bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Remove Stake - Currently Staking: {{ stakeOf.toLocaleString() }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input v-model="removeStakeAmount" type="number" max="30000" label="Enter Amount to Remove from Staking" />
          </q-card-section>

          <q-card-section>
            <q-btn color="red" @click="removeStake" text-color="white" label="Remove Stake">
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Remove Your Stakes. You will withdraw any pending rewards also.
              </q-tooltip>
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <!-- Staking Disabled/Paused -->
  <div v-if="paused === true" style="padding: 2%;" class="text-center">
    <br>
    <q-banner inline-actions class="text-white bg-red">
      The Contract is Currently Paused, Please check back later.
    </q-banner>
  </div>

</q-page>
</template>

<script>
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import ABI from '../assets/staking-abi.json';

const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
};

if (!ethEnabled()) {
  alert('Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!');
}

const stakingAddress = '0xc959eE7196762fb12EA4475ABCFc37F99a8b9140';
const staking = new window.web3.eth.Contract(ABI, stakingAddress);

export default {
  name: 'PageIndex',
  data() {
    return {
      off: '',
      paused: '',
      totalStakes: '',
      totalRewardsPaid: '',
      stakeCap: '',
      isStakeholder: '',
      rewardOf: '',
      stakeOf: '',
      rewardsWindow: '',
      addStakeAmount: '',
      lastWdheight: '',
      removeStakeAmount: null,
      pendingRewards: '',
    };
  },
  created() {
    this.CheckChainData();
    this.checkForWithdraw();
    setInterval(this.checkForWithdraw, 60 * 1000);
  },
  methods: {
    async CheckChainData() {
      const provider = await detectEthereumProvider();
      if (provider) {
        const userAccount = await provider.request({
          method: 'eth_requestAccounts',
        });
        staking.methods.stakingOff().call().then((response) => {
          this.off = response;
        });
        staking.methods.paused().call().then((response) => {
          this.paused = response;
        });
        staking.methods.totalStakes().call().then((response) => {
          this.totalStakes = (response / 1000000000000000000);
        });
        staking.methods.totalRewardsPaid().call().then((response) => {
          this.totalRewardsPaid = (response / 1000000000000000000);
        });
        staking.methods.stakeCap().call().then((response) => {
          this.stakeCap = (response / 1000000000000000000);
        });
        staking.methods.rewardsWindow().call().then((response) => {
          this.rewardsWindow = response;
        });
        staking.methods.isStakeholder(userAccount[0]).call().then((response) => {
          // eslint-disable-next-line
            this.isStakeholder = response[0];
          if (this.isStakeholder === true) {
            staking.methods.rewardOf(userAccount[0]).call().then((respond) => {
              this.rewardOf = (respond / 1000000000000000000);
            });
            staking.methods.stakeOf(userAccount[0]).call().then((resp) => {
              this.stakeOf = (resp / 1000000000000000000);
            });
            staking.methods.rewardsAccrued().call({
              from: userAccount[0],
            }).then((resp) => {
              this.pendingRewards = (resp / 1000000000000000000);
            });
          }
        });
      } else {
        this.$q.notify('Metamask not dectected. Please Install Metamask.');
      }
    },
    async checkForWithdraw() {
      const provider = await detectEthereumProvider();
      const userAccount = await provider.request({
        method: 'eth_requestAccounts',
      });
      staking.methods.lastWdHeight().call({
        from: userAccount[0],
      }).then((response) => {
        const lastWithdraw = response;
        window.web3.eth.getBlockNumber().then((blockHeight) => {
          const currentBlock = blockHeight;
          const withdrawable = currentBlock - lastWithdraw;
          if (withdrawable === currentBlock) {
            this.lastWdheight = 'Nothing Staked';
          } else if (withdrawable > this.rewardsWindow) {
            this.lastWdheight = 'Withdrawal Available';
            this.$q.notify('You Have a withdrawal Available');
          } else {
            const remaining = this.rewardsWindow - withdrawable;
            this.lastWdheight = `${remaining} blocks.`;
          }
        });
      });
    },
    async addStake() {
      const provider = await detectEthereumProvider();
      const userAccount = await provider.request({
        method: 'eth_requestAccounts',
      });
      const amountInt = window.web3.utils.toWei(this.addStakeAmount, 'ether');
      const amount = window.web3.eth.abi.encodeParameter('uint256', amountInt);
      staking.methods.createStake(amount).send({
        from: userAccount[0],
      }).then((response) => {
        const hash = response.transactionHash;
        this.$q.notify(`Stake Added - Transaction Hash: ${hash}`);
        setTimeout(() => {
          this.$router.go();
        }, 3000);
      });
    },
    async removeStake() {
      const provider = await detectEthereumProvider();
      const userAccount = await provider.request({
        method: 'eth_requestAccounts',
      });
      const amountInt = window.web3.utils.toWei(this.removeStakeAmount, 'ether');
      const amount = window.web3.eth.abi.encodeParameter('uint256', amountInt);
      staking.methods.removeStake(amount).send({
        from: userAccount[0],
      }).then((response) => {
        const hash = response.transactionHash;
        this.$q.notify(`Stake Removed - Transaction Hash: ${hash}`);
        setTimeout(() => {
          this.$router.go();
        }, 3000);
      });
    },
    async withdrawStake() {
      const provider = await detectEthereumProvider();
      const userAccount = await provider.request({
        method: 'eth_requestAccounts',
      });
      staking.methods.withdrawReward().send({
        from: userAccount[0],
      }).then((response) => {
        const hash = response.transactionHash;
        this.$q.notify(`Rewards Withdrawn - Transaction Hash: ${hash}`);
        setTimeout(() => {
          this.$router.go();
        }, 3000);
      });
    },
  },
};
</script>
