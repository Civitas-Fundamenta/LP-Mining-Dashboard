import Vue from 'vue';
import axios from 'axios';
import Web3 from 'web3';

const API = {};

API.Web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7921c78422994d2f82ac15663d975937'),
);

Vue.prototype.$API = API;
Vue.prototype.$axios = axios;
