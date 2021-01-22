import Vue from 'vue';
import axios from 'axios';
import Web3 from 'web3';

const API = {};

API.Web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9b35dedcca93433d8cba4b8dd762ed45'),
);

Vue.prototype.$API = API;
Vue.prototype.$axios = axios;
