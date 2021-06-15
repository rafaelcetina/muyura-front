<template>
    <v-app>
        <v-overlay :value="overlay" :z-index="9999">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-container class="fill-height ma-0 pa-0" fluid no-gutters>
          <v-col class="fill-height d-none d-sm-block pr-bg bg-color"></v-col>
          <v-col cols="12" sm="6" md="6" lg="6" class="fill-height pa-0" align="center" justify="center" >
            <router-view></router-view>
          </v-col>
        </v-container>
    </v-app>
</template>
<script lang="ts">
    import Vue from 'vue'
    import EventBus from '@/plugins/event-bus'

    export default Vue.extend({
        name: 'FullLogin',
        data: () => ({
            dialog: false,
            overlay: false,
        }),
        created(){
            EventBus.$on('before-request', (record: any) => {
                this.overlay = true;
            });
            EventBus.$on('after-response', (record: any) => {
                this.overlay = false;
            });
            EventBus.$on('response-error', (record: any) => {
                this.overlay = false;
            });
        },
    })
</script>

<style>
.bg-color{
  background-color: #9578D4;
}
.primary-color{
  color: #1F82B9;
}
.pr-bg {
  background-image: url("~@/assets/main-login.jpg");
  background-repeat: no-repeat !important;
  -webkit-background-size: contain !important;
  -moz-background-size: contain !important;
  -o-background-size: contain !important;
  background-size: contain !important;
  background-position: center !important;
}
.pr-bg-login {
  background-image: linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 0%), url("~@/assets/main-h.png");
  background-repeat: no-repeat !important;
  -webkit-background-size: contain !important;
  -moz-background-size: contain !important;
  -o-background-size: contain !important;
  background-size: contain !important;
  background-position: top !important;
}
.header-login {
  position: absolute;
  width: 100%;
  height: 21vh;
  left: 0px;
  top: 0px;
}
.active-bc {
  color: #000;
  padding-bottom: 3px;
  padding-left:10px;
  padding-right:10px;
  box-shadow: inset 0 0px 0 white, inset 0 -3px 0 #1F82B9
}
</style>