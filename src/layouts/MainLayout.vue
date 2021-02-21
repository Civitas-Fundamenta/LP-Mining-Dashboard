<template>
<div class="bg font">
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <a href="/#/">
        <q-avatar>
          <img src="../assets/logocf.svg">
        </q-avatar>
        </a>
        <q-toolbar-title v-if="!$q.platform.is.mobile">
          Fundamenta Staking and Liquidity Mining
        </q-toolbar-title>

        <div>
          Version: 2.0.0
        </div>

      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" :width="200" :breakpoint="500" bordered dark style="text-decoration: none;">
      <q-scroll-area class="fit">
        <q-list>
          <router-link to="/">
            <q-item v-ripple>
              <q-item-section avatar>
                <q-icon name="fas fa-home" />
              </q-item-section>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>
          </router-link>
          <q-separator />
          <router-link to="/Staking">
            <q-item v-ripple>
              <q-item-section avatar>
                <q-icon name="fas fa-money-bill-wave" />
              </q-item-section>
              <q-item-section>
                Staking Dashboard
              </q-item-section>
            </q-item>
          </router-link>
          <q-separator />
          <router-link to="/Mining">
            <q-item v-ripple>
              <q-item-section avatar>
                <q-icon name="fas fa-coins" />
              </q-item-section>
              <q-item-section>
                Liquidity Mining Dashboard
              </q-item-section>
            </q-item>
          </router-link>
          <q-separator />
          <router-link to="/Stats">
            <q-item v-ripple>
              <q-item-section avatar>
                <q-icon name="fas fa-hammer" />
              </q-item-section>
              <q-item-section>
                Stats and Tools
              </q-item-section>
            </q-item>
          </router-link>
          <q-separator />

        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
<style>
.bg {
  background-color: black;
}
</style>
