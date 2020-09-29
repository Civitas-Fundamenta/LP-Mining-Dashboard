<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="../assets/logo.svg">
        </q-avatar>
        <q-toolbar-title>
          Fundamenta Staking Dashboard
        </q-toolbar-title>

        <div>
          <MetamaskChecker>
        <div id="err" slot="errored" slot-scope="{ error }">
          {{ error.message || 'Unexpected error' }}
        </div>

        <div id="app" slot="checked" slot-scope="{ provider, selectedAccount, selectedNetwork }">
          Active Account: {{ selectedAccount }} On Network ID: {{ selectedNetwork }}
        </div>

        <div id="loader">
          Loading Data
        </div>
      </MetamaskChecker>
    </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MetamaskChecker from '@metamask-checker/vue';

export default {
  name: 'MainLayout',
  components: {
    MetamaskChecker,
  },
  data() {
    return {};
  },
};
</script>
