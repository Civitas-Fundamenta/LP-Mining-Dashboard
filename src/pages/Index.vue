<template>
<q-page>
    <div class="row text-center">
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <a href="/#/Mining">
        <q-card flat bordered class="cbg imgSize">
          <img src="../assets/miningPNG.png" />
          <q-card-section>
            <a href="/#/Mining">
            <h4>Liquidity Mining</h4>
            </a>
          </q-card-section>
        </q-card>
        </a>
      </div>
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <a href="/#/Staking">
        <q-card flat bordered class="cbg imgSize">
          <img src="../assets/stakingPNG.png" />
        <q-card-section>
          <a href="/#/Staking">
          <h4>Token Staking</h4>
          </a>
        </q-card-section>
        </q-card>
        </a>
      </div>
    </div>
</q-page>
</template>

<script>
export default {
  name: 'PageIndex',
};
</script>
