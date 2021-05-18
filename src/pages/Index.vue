<template>
<q-page>
    <div class="row text-center">
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card flat bordered class="cbg">
          <img src="../assets/miningPNG.png" class="img" style="margin-top: 1%; width: 30%; height: 30%;"/>
        <q-card-section>
          <a href="/#/Mining">
            <q-btn color="white" text-color="black" label="Mining" />
          </a>
        </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6" style="padding: 2%;">
        <q-card flat bordered class="cbg">
          <img src="../assets/stakingPNG.png" class="img" style="margin-top: 1%; width: 30%; height: 30%"/>
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
<style>
img {
display: block;
width: 60%;
margin-left: auto;
margin-right: auto;
}
</style>
