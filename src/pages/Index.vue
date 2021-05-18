<template>
<q-page>
    <div class="row text-center">
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card flat bordered class="cbg">
          <i class="fas fa-coins fa-10x" style="padding: 25%;"></i>
          <q-card-section>
            <a href="/#/Mining">
            <img src="../assets/miningPNG.png" />
            </a>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card flat bordered class="cbg">
          <img src="../assets/stakingPNG.png">
        <q-card-section>
          <a href="/#/Staking">
            <q-btn color="white" text-color="black" label="Token Staking" />
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
};
</script>
