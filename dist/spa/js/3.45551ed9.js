(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{1:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},5:function(t,e){},6:function(t,e){},7:function(t,e){},8:function(t,e){},9:function(t,e){},b06b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"fc"},[!1===t.off?a("div",[!1===t.paused?a("div",[a("div",{staticClass:"row text-center"},[a("div",{staticClass:"col-xs-6 col-sm-4",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"cbg",attrs:{bordered:""}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                Total amount of FMTA Staked on the network\n              ")]),a("q-card-section",{staticClass:"b"},[t._v("\n                FMTA Staked\n              ")]),a("q-card-section",{staticClass:"q-pt-none"},[t._v("\n                "+t._s(t.totalStakes.toLocaleString())+"\n              ")])],1)],1)]),a("div",{staticClass:"col-xs-6 col-sm-4",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"cbg",attrs:{bordered:""}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                Maximum amount of FMTA that can be staked per address\n              ")]),a("q-card-section",{staticClass:"b"},[t._v("\n                Maximum Stake\n              ")]),a("q-card-section",{staticClass:"q-pt-none"},[t._v("\n                "+t._s(t.stakeCap.toLocaleString())+"\n              ")])],1)],1)]),a("div",{staticClass:"col-xs-6 col-sm-4",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"cbg",attrs:{bordered:""}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                Total amount of rewards paid to connected wallet (will show 0 if nothing staked)\n              ")]),a("q-card-section",{staticClass:"b"},[t._v("\n                Rewards Paid\n              ")]),a("q-card-section",{staticClass:"q-pt-none"},[t._v("\n                "+t._s(t.totalRewardsPaid.toLocaleString())+"\n              ")])],1)],1)]),a("div",{staticClass:"col-xs-6 col-sm-6 BOTTOM RIGHT",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"cbg",attrs:{bordered:""}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                Current number of blocks needed between rewards withdrawals\n              ")]),a("q-card-section",{staticClass:"b"},[t._v("\n                Reward Window\n              ")]),a("q-card-section",{staticClass:"q-pt-none"},[t._v("\n                "+t._s(t.rewardsWindow.toLocaleString())+"\n              ")])],1)],1)]),a("div",{staticClass:"col-xs-12 col-sm-6",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"cbg",attrs:{bordered:""}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                Number of blocks blocks until you can withdraw.\n              ")]),a("q-card-section",{staticClass:"b"},[t._v("\n                Withdrawal Availability\n              ")]),a("q-card-section",{staticClass:"q-pt-none"},[t._v("\n                "+t._s(t.lastWdheight.toLocaleString())+"\n              ")])],1)],1)])]),a("br"),!1===t.isStakeholder?a("div",{staticClass:"row text-center justify-center"},[a("div",{staticClass:"col-8",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"my-card cbg",attrs:{bordered:""}},[a("q-card-section",{},[a("div",{staticClass:"text-h6"},[t._v("Add Stake")])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{dark:"",color:"white",type:"number",max:"30000",label:"Enter Amount to Stake"},model:{value:t.addStakeAmount,callback:function(e){t.addStakeAmount=e},expression:"addStakeAmount"}},[a("q-tooltip",{attrs:{anchor:"bottom left",self:"top middle","transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                    Add a new staking position!. Stake Cap is "+t._s(t.stakeCap.toLocaleString())+"\n                  ")])],1)],1),a("q-card-section",[a("q-btn",{staticStyle:{background:"#93979A"},attrs:{"text-color":"white",label:"Add Stake"},on:{click:t.addStake}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                    ENGAGE!\n                  ")])],1)],1)],1)],1)])]):t._e(),!0===t.isStakeholder?a("div",[a("div",{staticClass:"row text-center"},[a("div",{staticClass:"col-xs-12 col-sm-6",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"my-card cbg",attrs:{bordered:""}},[a("q-card-section",{},[a("div",{staticClass:"text-h6"},[t._v("Add Stake - Currently Staking: "+t._s(t.stakeOf.toLocaleString()))])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{dark:"",color:"white",type:"number",max:"30000",label:"Enter Amount to Stake"},model:{value:t.addStakeAmount,callback:function(e){t.addStakeAmount=e},expression:"addStakeAmount"}})],1),a("q-card-section",[a("q-btn",{staticStyle:{background:"#93979A"},attrs:{"text-color":"white",label:"Add Stake"},on:{click:t.addStake}},[a("q-tooltip",{attrs:{anchor:"bottom left",self:"top middle","transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                      Add a new staking position!. Stake Cap is "+t._s(t.stakeCap.toLocaleString())+"\n                    ")])],1)],1)],1)],1)]),a("div",{staticClass:"col-xs-12 col-sm-6",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"my-card cbg",attrs:{bordered:""}},[a("q-card-section",{},[a("div",{staticClass:"text-h6"},[t._v("Remove Stake - Currently Staking: "+t._s(t.stakeOf.toLocaleString()))])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{dark:"",color:"white",type:"number",max:"30000",label:"Enter Amount to Remove from Staking"},model:{value:t.removeStakeAmount,callback:function(e){t.removeStakeAmount=e},expression:"removeStakeAmount"}})],1),a("q-card-section",[a("q-btn",{staticStyle:{background:"#93979A"},attrs:{"text-color":"white",label:"Remove Stake"},on:{click:t.removeStake}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                      Remove Your Stakes. You will withdraw any pending rewards also.\n                    ")])],1)],1)],1)],1)])]),a("div",{staticClass:"row text-center justify-center"},[a("div",{staticClass:"col-xs-12 col-sm-6",staticStyle:{padding:"2%"}},[a("div",{staticClass:"shadow-5"},[a("q-card",{staticClass:"my-card cbg",attrs:{bordered:""}},[a("q-card-section",{},[a("div",{staticClass:"text-h6"},[t._v("Pending Rewards: "+t._s(t.pendingRewards.toLocaleString()))])]),a("q-card-section",[a("q-btn",{staticStyle:{background:"#93979A"},attrs:{"text-color":"white",label:"Withdraw"},on:{click:t.withdrawStake}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                      GIMME DAT SWEET REWARD\n                    ")])],1)],1)],1)],1)])])]):t._e()]):t._e()]):t._e(),!0===t.off?a("div",{staticClass:"text-center",staticStyle:{padding:"2%"}},[a("br"),a("div",{staticClass:"row text-center"},[a("div",{staticClass:"col",staticStyle:{padding:"2%"}},[a("q-banner",{staticClass:"text-white bg-red",attrs:{"inline-actions":""}},[t._v("\n          Staking is currently disabled, You may still remove your stake.\n        ")])],1)]),a("div",{staticClass:"row text-center"},[a("div",{staticClass:"col",staticStyle:{padding:"2%"}},[a("q-card",{staticClass:"my-card",attrs:{bordered:""}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Remove Stake - Currently Staking: "+t._s(t.stakeOf.toLocaleString()))])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{type:"number",max:"30000",label:"Enter Amount to Remove from Staking"},model:{value:t.removeStakeAmount,callback:function(e){t.removeStakeAmount=e},expression:"removeStakeAmount"}})],1),a("q-card-section",[a("q-btn",{attrs:{color:"red","text-color":"white",label:"Remove Stake"},on:{click:t.removeStake}},[a("q-tooltip",{attrs:{"transition-show":"flip-right","transition-hide":"flip-left"}},[t._v("\n                Remove Your Stakes. You will withdraw any pending rewards also.\n              ")])],1)],1)],1)],1)])]):t._e(),!0===t.paused?a("div",{staticClass:"text-center",staticStyle:{padding:"2%"}},[a("br"),a("q-banner",{staticClass:"text-white bg-red",attrs:{"inline-actions":""}},[t._v("\n      The Contract is Currently Paused, Please check back later.\n    ")])],1):t._e()])},s=[],i=(a("e6cf"),a("f9f8")),o=a.n(i),r=a("99e5"),l=a.n(r),d=a("fdea");const u=()=>!!window.ethereum&&(window.web3=new l.a(window.ethereum),window.ethereum.enable(),!0);u()||alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");const c="0xc959eE7196762fb12EA4475ABCFc37F99a8b9140",p=new window.web3.eth.Contract(d,c);var y={name:"PageIndex",data(){return{off:"",paused:"",totalStakes:"",totalRewardsPaid:"",stakeCap:"",isStakeholder:"",rewardOf:"",stakeOf:"",rewardsWindow:"",addStakeAmount:"",lastWdheight:"",removeStakeAmount:null,pendingRewards:""}},created(){this.CheckChainData(),this.checkForWithdraw(),setInterval(this.checkForWithdraw,6e4)},methods:{async CheckChainData(){const t=await o()();if(t){const e=await t.request({method:"eth_chainId"}),a=await t.request({method:"eth_requestAccounts"});"0x05"===e||this.$q.platform.is.mobile?this.$q.platform.is.mobile&&"0x5"!==e?this.$q.notify("Please Switch To Goerli Network & Refresh the page."):(p.methods.stakingOff().call().then((t=>{this.off=t})),p.methods.paused().call().then((t=>{this.paused=t})),p.methods.totalStakes().call().then((t=>{this.totalStakes=t/1e18})),p.methods.totalRewardsPaid().call().then((t=>{this.totalRewardsPaid=t/1e18})),p.methods.stakeCap().call().then((t=>{this.stakeCap=t/1e18})),p.methods.rewardsWindow().call().then((t=>{this.rewardsWindow=t})),p.methods.isStakeholder(a[0]).call().then((t=>{this.isStakeholder=t[0],!0===this.isStakeholder&&(p.methods.rewardOf(a[0]).call().then((t=>{this.rewardOf=t/1e18})),p.methods.stakeOf(a[0]).call().then((t=>{this.stakeOf=t/1e18})),p.methods.rewardsAccrued().call({from:a[0]}).then((t=>{this.pendingRewards=t/1e18})))}))):this.$q.notify("Please Switch To Goerli Network & Refresh the page.")}else this.$q.notify("Metamask not dectected. Please Install Metamask.")},async checkForWithdraw(){const t=await o()(),e=await t.request({method:"eth_requestAccounts"});p.methods.lastWdHeight().call({from:e[0]}).then((t=>{const e=t;window.web3.eth.getBlockNumber().then((t=>{const a=t,n=a-e;if(n===a)this.lastWdheight="Nothing Staked";else if(n>this.rewardsWindow)this.lastWdheight="Withdrawal Available",this.$q.notify("You Have a withdrawal Available");else{const t=this.rewardsWindow-n;this.lastWdheight=t+" blocks."}}))}))},async addStake(){const t=await o()(),e=await t.request({method:"eth_requestAccounts"}),a=window.web3.utils.toWei(this.addStakeAmount,"ether"),n=window.web3.eth.abi.encodeParameter("uint256",a);p.methods.createStake(n).send({from:e[0]}).then((t=>{const e=t.transactionHash;this.$q.notify("Stake Added - Transaction Hash: "+e),setTimeout((()=>{this.$router.go()}),3e3)}))},async removeStake(){const t=await o()(),e=await t.request({method:"eth_requestAccounts"}),a=window.web3.utils.toWei(this.removeStakeAmount,"ether"),n=window.web3.eth.abi.encodeParameter("uint256",a);p.methods.removeStake(n).send({from:e[0]}).then((t=>{const e=t.transactionHash;this.$q.notify("Stake Removed - Transaction Hash: "+e),setTimeout((()=>{this.$router.go()}),3e3)}))},async withdrawStake(){const t=await o()(),e=await t.request({method:"eth_requestAccounts"});p.methods.withdrawReward().send({from:e[0]}).then((t=>{const e=t.transactionHash;this.$q.notify("Rewards Withdrawn - Transaction Hash: "+e),setTimeout((()=>{this.$router.go()}),3e3)}))}}},m=y,h=a("2877"),b=Object(h["a"])(m,n,s,!1,null,null,null);e["default"]=b.exports},fdea:function(t){t.exports=JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_STAKING","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stake","type":"uint256"}],"name":"createStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWDoff","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stake","type":"uint256"}],"name":"emergencyWithdrawRewardAndStakes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"isStakeholder","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastWdHeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stake","type":"uint256"}],"name":"removeStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeholder","type":"address"}],"name":"rewardOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsAccrued","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsWindow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_emergencyWD","type":"bool"}],"name":"setEmergencyWDoff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newWindow","type":"uint256"}],"name":"setRewardsWindow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stakeCalc","type":"uint256"}],"name":"setStakeCalc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stakeCap","type":"uint256"}],"name":"setStakeCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newMultiplier","type":"uint256"}],"name":"setStakeMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeCalc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeLockMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeholder","type":"address"}],"name":"stakeOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_stakingOff","type":"bool"}],"name":"stakeOff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeUnlockWindow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingOff","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawReward","outputs":[],"stateMutability":"nonpayable","type":"function"}]')}}]);