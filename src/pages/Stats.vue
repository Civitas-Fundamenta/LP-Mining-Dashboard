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
import fetch from 'isomorphic-fetch';

export default {
  name: 'PageIndex',
  data() {
    return {
      totalSupply: 0,
      marketCap: 0,
      circulatingSupply: 0,
      price: 0,
      amountOfStake: 0,
      days: 0,
      showReward: false,
      finalReward: 0,
      rewardUsd: 0,
    };
  },
  mounted() {
    this.calculateCirculatingSupply();
  },
  methods: {
    async calculateCirculatingSupply() {
      this.$axios.get('https://api.fundamenta.network/circulating_supply').then((result) => {
        this.circulatingSupply = result.data;
      });
      this.getMarketCap();
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
