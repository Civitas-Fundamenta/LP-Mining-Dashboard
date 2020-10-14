<template>
<q-page>
    <div class="row text-center">
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card class="cbg">
          <img src="../assets/mine.gif">
          <q-card-section>
            <a href="/#/Mining">
            <q-btn color="white" @click="getApproval" text-color="black" label="Liquidity Mining" />
            </a>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card flat bordered class="cbg">
          <img src="../assets/mcduck.gif">
        <q-card-section>
          <a href="/#/Staking">
            <q-btn color="white" @click="selectPool" text-color="black" label="Token Staking" />
          </a>
        </q-card-section>
        </q-card>
      </div>
    </div>
</q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {};
  },
};
</script>
