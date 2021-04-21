<template>
<q-page>
  <div>
    <div class="row text-center">
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card bordered class="cbg">
          <q-card-section>
            <div class="text-h6">Market Cap (USD)</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <h6> {{ marketCap.toLocaleString()}} </h6>
          </q-card-section>

        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card bordered class="cbg">
          <q-card-section>
            <div class="text-h6">Circulating Supply</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <h6> {{ circulatingSupply.toLocaleString()}} FMTA </h6>
          </q-card-section>

        </q-card>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-xs-12 col-sm-12" style="padding: 2%;">
        <q-card bordered class="cbg">
          <q-card-section>
            <div class="text-h6">Daily Staking Reward Calculator:</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row text-center">
              <q-input filled v-model="amountOfStake" class="col-xs-6 col-sm-6" label="Enter Amount of FMTA to Stake" max="30" dark />
              <q-input filled v-model="days" class="col-xs-3 col-sm-3" style="margin-left: 2%;" label="The Amount of Days to stake for" dark />
              <q-btn style="background: #93979A; margin-left: 2%;" class="col-xs-2 col-sm-2" @click="calculateStake" text-color="white" label="Calculate"></q-btn>
              <div v-if="showReward === true" class="col-xs-12 col-sm-12">
                <br>
                <q-banner inline-actions rounded class="bg-green text-white">
                  Estimated FMTA Reward: {{ finalReward.toLocaleString() }} FMTA
                  <br>
                  Estimated Reward in USD (Based on Current Price): ${{ rewardUsd.toFixed(5) }}
                </q-banner>
              </div>
            </div>
          </q-card-section>

        </q-card>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import Web3 from 'web3';
import fetch from 'isomorphic-fetch';
import ABI from '../assets/staking-abi.json';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7921c78422994d2f82ac15663d975937'),
);

export default {
  name: 'PageIndex',
  data() {
    return {
      totalSupply: '',
      marketCap: '',
      circulatingSupply: '',
      price: '',
      amountOfStake: '',
      days: '',
      showReward: false,
      finalReward: '',
      rewardUsd: 0,
    };
  },
  created() {
    this.calculateCirculatingSupply();
  },
  methods: {
    async calculateCirculatingSupply() {
      const stakingAddress = '0x4d1c6fe8cce907ac9d884b7562452467f5c7ea3f';
      const staking = new web3.eth.Contract(ABI, stakingAddress);
      this.$axios.get('https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xaa9d866666c2a3748d6b23ff69e63e52f08d9ab4&apikey=X5BTPZKK1GAQ66FWQP24X53PW98YC5BD4J')
        .then((supplyData) => {
          const tSupply = supplyData.data.result / 10e17;
          this.$axios.get('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xaa9d866666c2a3748d6b23ff69e63e52f08d9ab4&address=0xa0b72536ba6496aec721400b5f0e1e65caf4be77&tag=latest&apikey=X5BTPZKK1GAQ66FWQP24X53PW98YC5BD4J').then((fundingAlloc) => {
            const fundingEmissionAlloc = fundingAlloc.data.result / 10e17;
            this.$axios.get('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xaa9d866666c2a3748d6b23ff69e63e52f08d9ab4&address=0xa4dda4edfb34222063c77dfe2f50b30f5df39870&tag=latest&apikey=X5BTPZKK1GAQ66FWQP24X53PW98YC5BD4J').then((vesting) => {
              const vestingAddr = vesting.data.result / 10e17;
              this.$axios.get('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xaa9d866666c2a3748d6b23ff69e63e52f08d9ab4&address=0x22a68bb25bf760d954c7e67ff06dc85297356068&tag=latest&apikey=X5BTPZKK1GAQ66FWQP24X53PW98YC5BD4J').then((hotWallet) => {
                const fundingHot = hotWallet.data.result / 10e17;
                staking.methods.totalStakes().call().then((response) => {
                  const totalStakes = (response / 10e17);
                  this.circulatingSupply = tSupply - (fundingEmissionAlloc + vestingAddr + fundingHot) + totalStakes;
                  this.getMarketCap();
                });
              });
            });
          });
        });
    },
    async getMarketCap() {
      fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
              pair(id: "0x650e8b9d20293a276f76be24da4ce25f2d0090fb")
            {
              token0Price
            }
          }`,
        }),
      }).then((ress) => ress.json()).then((result) => {
        this.price = parseFloat(result.data.pair.token0Price);
        this.marketCap = (this.circulatingSupply * this.price);
      });
    },
    async calculateStake() {
      const dailyReward = this.amountOfStake / 500;
      this.finalReward = dailyReward * this.days;
      this.rewardUsd = this.finalReward * this.price;
      this.showReward = true;
    },
  },
};
</script>
