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
      await this.$axios.get('https://api.fundamenta.network/circulating_supply').then((result) => {
        this.circulatingSupply = result.data;
      });
      this.getMarketCap();
    },
    async getMarketCap() {
      this.$axios.get('https://api.coingecko.com/api/v3/simple/price?ids=fundamenta&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false').then((result) => {
        this.price = result.data.fundamenta.usd;
        console.log(this.price);
        console.log(this.circulatingSupply);
        this.marketCap = (this.circulatingSupply * this.price);
        console.log(this.circulatingSupply, this.price);
        console.log(this.marketCap);
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
