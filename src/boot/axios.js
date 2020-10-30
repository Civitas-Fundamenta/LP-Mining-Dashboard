import Vue from 'vue';
import axios from 'axios';
import Web3 from 'web3';

const API = {};

API.Web3 = new Web3(
  new Web3.providers.HttpProvider('https://api.infura.io/v1/jsonrpc/mainnet'),
);

Vue.prototype.$API = API;
Vue.prototype.$axios = axios;
