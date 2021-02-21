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
        <div class="col-xs-12 col-sm-4" style="padding: 2%;">
          <div class="shadow-5">
            <q-card bordered class="cbg">
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Total amount of rewards paid to connected wallet (will show 0 if nothing staked)
              </q-tooltip>
              <q-card-section class="b">
                Rewards Paid
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ rewardCalc.toLocaleString() }}
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6" style="padding: 2%;">
          <div class="shadow-5">
            <q-card bordered class="cbg">
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Current number of blocks needed between rewards withdrawals
              </q-tooltip>
              <q-card-section class="b">
                Stake Removal Window | Pending Rewards Window (blocks)
              </q-card-section>
              <q-card-section class="q-pt-none">
                13000 | {{ rewardsWindow.toLocaleString() }}
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
                Stake Unlock Height | Rewards Unlock Height
              </q-card-section>
              <div v-if="isStakeholder === true">
                <q-card-section class="q-pt-none">
                  {{ lastWdheight.toLocaleString() }}
                </q-card-section>
              </div>
              <div v-if="isStakeholder === false">
                <q-card-section class="q-pt-none">
                  0 | 0
                </q-card-section>
              </div>
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
                <div class="text-center">
                  <br>
                  <q-banner inline-actions class="text-white bg-red">
                    Stake lock Period is 13000 blocks (48 hours). This is reset every
                    <br>
                    Time you withdraw pending rewards or remove stake. Pending rewards
                    <br>
                    are also withdrawn when removing stake.
                  </q-banner>
                </div>
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

                <div v-if="pendingRewards != 0">
                    <q-banner inline-actions class="text-white bg-red">
                    MUST WITHDRAW PENDING REWARDS TO ADD TO STAKED POSITION
                    </q-banner>
                </div>
                <div v-else>
                <q-card-section>
                  <q-btn  style="background: #93979A" @click="addStake" text-color="white" label="Add Stake">
                    <q-tooltip anchor="bottom left" self="top middle" transition-show="flip-right" transition-hide="flip-left">
                      Add a new staking position!. Stake Cap is {{ stakeCap.toLocaleString() }}
                    </q-tooltip>
                  </q-btn>
                </q-card-section>
                </div>
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
                  <div class="text-center">
                    <br>
                    <q-banner inline-actions class="text-white bg-red">
                      Stake lock Period is 13000 blocks (48 hours). This is reset every
                      <br>
                      Time you withdraw pending rewards or remove stake. Pending rewards
                      <br>
                      are also withdrawn when removing stake.
                    </q-banner>
                  </div>
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
  <q-dialog v-model="pending">
      <q-card dark>
        <q-card-section>
          <div class="text-h6">Hey! You have {{ pendingRewards }} FMTA pending withdrawal!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Stake lock Period is 13000 blocks (48 hours). <br /><br /> This is reset every Time you withdraw pending rewards or remove stake. <br /> <br /> Pending rewards
          are also withdrawn when removing.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Dismiss" color="white" v-close-popup />
          <q-btn flat label="Withdraw Rewards" color="white" @click="withdrawStake" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</q-page>
</template>

<script>
import ABI from '../assets/staking-abi.json';

const stakingAddress = '0x4d1c6fe8cce907ac9d884b7562452467f5c7ea3f';

export default {
  name: 'PageIndex',
  data() {
    return {
      off: '',
      paused: '',
      totalStakes: '',
      stakeCap: '',
      isStakeholder: '',
      rewardCalc: 0,
      stakeOf: '',
      rewardsWindow: '',
      addStakeAmount: '',
      lastWdheight: '',
      removeStakeAmount: null,
      pendingRewards: '',
      withdrawable: '',
      userAccount: [],
      staking: {},
      pending: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$API.onboard.walletSelect();
      await this.$API.onboard.walletCheck();
      this.userAccount = await this.$API.web3.eth.getAccounts();
      this.staking = new this.$API.web3.eth.Contract(ABI, stakingAddress);
      this.CheckChainData();
    },
    async CheckChainData() {
      this.staking.methods.stakingOff().call().then((response) => {
        this.off = response;
      });
      this.staking.methods.paused().call().then((response) => {
        this.paused = response;
      });
      this.staking.methods.totalStakes().call().then((response) => {
        this.totalStakes = (response / 1000000000000000000);
      });
      this.staking.methods.stakeCap().call().then((response) => {
        this.stakeCap = (response / 1000000000000000000);
      });
      this.staking.methods.rewardsWindow().call().then((response) => {
        this.rewardsWindow = response;
      });
      this.staking.methods.isStakeholder(this.userAccount[0]).call().then((response) => {
        // eslint-disable-next-line
        this.isStakeholder = response[0];
        if (this.isStakeholder === true) {
          this.staking.methods.totalRewardsOf(this.userAccount[0]).call().then((respond) => {
            this.rewardCalc = (respond / 1000000000000000000);
          });
          this.staking.methods.stakeOf(this.userAccount[0]).call().then((resp) => {
            this.stakeOf = (resp / 1000000000000000000);
          });
          this.staking.methods.rewardsAccrued().call({
            from: this.userAccount[0],
          }).then((resp) => {
            this.pendingRewards = (resp / 1000000000000000000);
            if (this.pendingRewards !== 0) {
              this.pending = true;
            }
          });
          this.checkForWithdraw();
          setInterval(this.checkForWithdraw, 60 * 1000);
        } else {
          this.withdrawable = 0;
        }
      });
    },
    async checkForWithdraw() {
      this.staking.methods.lastWdHeight().call({
        from: this.userAccount[0],
      }).then((response) => {
        const lastWithdraw = Number(response) + 13000;
        const rewardsUnlock = Number(response) + 6500;
        this.$API.web3.eth.getBlockNumber().then((blockHeight) => {
          const currentBlock = Number(blockHeight);
          const withdrawable = Number(currentBlock) - Number(lastWithdraw);
          const sWithdrawable = Number(lastWithdraw) - Number(currentBlock);
          const rWithdrawable = Number(rewardsUnlock) - Number(currentBlock);
          if (withdrawable === currentBlock) {
            this.lastWdheight = 'Nothing Staked';
          } else if (rWithdrawable < 1 && sWithdrawable < 1) {
            this.lastWdheight = 'Unlocked | Unlocked';
          } else if (rWithdrawable < 1) {
            this.lastWdheight = `${lastWithdraw - currentBlock} | Unlocked`;
          } else {
            this.lastWdheight = `${lastWithdraw - currentBlock} | ${rewardsUnlock - currentBlock}`;
          }
        });
      });
    },
    async addStake() {
      const amountInt = this.$API.web3.utils.toWei(this.addStakeAmount, 'ether');
      const amount = this.$API.web3.eth.abi.encodeParameter('uint256', amountInt);
      this.staking.methods.createStake(amount).send({
        from: this.userAccount[0],
      }).then((response) => {
        const hash = response.transactionHash;
        this.$q.notify(`Stake Added - Transaction Hash: ${hash}`);
        setTimeout(() => {
          this.CheckChainData();
        }, 3000);
      });
    },
    async removeStake() {
      const amountInt = this.$API.web3.utils.toWei(this.removeStakeAmount, 'ether');
      const amount = this.$API.web3.eth.abi.encodeParameter('uint256', amountInt);
      this.staking.methods.removeStake(amount).send({
        from: this.userAccount[0],
      }).then((response) => {
        const hash = response.transactionHash;
        this.$q.notify(`Stake Removed - Transaction Hash: ${hash}`);
        setTimeout(() => {
          this.CheckChainData();
        }, 3000);
      });
    },
    async withdrawStake() {
      this.staking.methods.withdrawReward().send({
        from: this.userAccount[0],
      }).then((response) => {
        const hash = response.transactionHash;
        this.$q.notify(`Rewards Withdrawn - Transaction Hash: ${hash}`);
        setTimeout(() => {
          this.CheckChainData();
        }, 3000);
      });
    },
  },
};
</script>
