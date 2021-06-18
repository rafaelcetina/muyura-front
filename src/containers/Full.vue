<template>
    <v-app>
        <v-overlay :value="overlay" :z-index="9999">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <sidebar></sidebar>
        <v-main>
            <v-container fluid style="max-width: 100%">
                <router-view></router-view>
            </v-container>
        </v-main>
        <v-footer dark color="#0167B1" class="caption" app>
          <v-row>
            <v-col class="caption text-right">
              All rigth reserved - 2021
            </v-col>
          </v-row>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Sidebar from './Sidebar.vue';
import EventBus from '@/plugins/event-bus';

export default Vue.extend({
    name: 'Full',
      data: () => ({
        bus: EventBus,
        dialog: false,
        overlay: false,
      }),
      created(){
        EventBus.$on('before-request', () => {
            this.overlay = true;
        });
        EventBus.$on('after-response', () => {
            this.overlay = false;
        });
          EventBus.$on('response-error', () => {
              this.overlay = false;
          });
        EventBus.$on('request-error', () => {
          this.overlay = false;
        });
      },
      components: {
        Sidebar
      }
})
</script>
