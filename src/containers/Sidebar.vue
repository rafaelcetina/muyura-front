<template>
    <div>
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                dark
                color="#8784BF"
        >
            <img class="mr-3" :src="require('@/assets/logo-white.png')" height="40"/>
            <v-app-bar-nav-icon @click.stop="mini = !mini"/>
            <v-toolbar-title
                    class="ml-0"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text" style="text-shadow: 2px 3px 5px #0E0653;">
                    Usuario: {{usuario}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="caption white--text" style="text-shadow: 2px 3px 5px #0E0653;">
                    Unidad: <span></span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-toolbar-title>
            <v-spacer/>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon @click="logout()">
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
            dark
            fixed
            hide-overlay
            :expand-on-hover="mini"
            stateless
            color="#9578D4"
        >
            <v-list dense class="mb-12 pb-12">
              <template v-for="item in modules">
                <v-list-group
                    color="#FFF"
                    :value="$route.path.includes(item.module_route)"
                    v-if="item.children.length"
                    :key="item.text"
                    :prepend-icon="item.model ? item.icon : item['icon-alt']"
                    no-action
                >
                  <template v-slot:activator>
                    <v-list-item-action>
                      <v-icon>{{ item.module_icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.module_name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item
                      v-for="(child, i) in item.children"
                      :key="i"
                      link
                      :to="{name: child.module_route}"
                  >
                    <v-list-item-action>
                      <v-icon>{{ child.module_icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ child.module_name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
                <v-list-item
                    v-else
                    :key="item.module_name"
                    link
                    :to="{name: item.module_route}"
                >
                  <v-list-item-action>
                    <v-icon>{{ item.module_icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.module_name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
                <v-list-item key="perfil" :to="{name: 'perfil'}" link>
                  <v-list-item-action>
                    <v-icon> mdi-account</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Perfil
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item key="cerrar-sesion" @click="logout()" link>
                    <v-list-item-action>
                        <v-icon> mdi-lock</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Cerrar Sesión
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <div v-if="!mini" style="position: absolute; width: 100%; bottom: 0px; text-align: center">
              <img :src="require('@/assets/footer.png')" height="70"/>
            </div>
            <div v-else style="position: absolute; width: 100%; bottom: 0px; text-align: center">
              <img :src="require('@/assets/jalisco.svg')" height="40"/>
            </div>
        </v-navigation-drawer>

    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import LoginService from "@/services/LoginService";
import {mapGetters} from "vuex";
export default Vue.extend({
    name: 'Sidebar',
    data: () => ({
        drawer: true,
        mini: false,
    }),
    mounted() {
    },
    computed: {
      ...mapGetters({
        usuario: 'usuario', modules: 'modules'
      })
    },
    watch: {
        
    },
    methods: {
        logout(){
          LoginService.logout().then(response => {
            if(response.data.success){
              this.$store.dispatch('logout');
              this.$router.push({name: 'FullLogin'});
            }
          });
        }
    }
})
</script>
