<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'app',
})
</script>
<style>
.v-application--wrap {
    min-height: auto !important;
}
html {
    overflow: auto;
}
</style>
