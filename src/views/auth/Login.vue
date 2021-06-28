<template>
  <v-main align="center" justify="center">
    <v-row class="pa-0 ma-0">
      <v-col class="d-flex d-sm-none pr-bg-login header-login"></v-col>
    </v-row>
    <v-container class="fill-height px-8" fluid style="height:100vh">

      <v-row align="center" justify="center" class>
        <v-col xs="10" xl="8">
          <v-container offset="1" cols="10">
            <v-img :src="require('@/assets/logo2.png')" contain class="mt-0" :height="$vuetify.breakpoint.xs?100:150"></v-img>
            <v-card flat>
              <h3 class="ma-0 mt-6 primary-color font-weight-bold letter-spacing-2">INICIAR SESIÓN</h3>

              <v-form ref="signin">
                <v-row no-gutters>
                  <v-col no-gutters>
                    <v-text-field v-model="formLogin.username" :rules="[rules.required]"
                                  label="Usuario"></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col no-gutters>
                    <v-text-field
                        v-model="formLogin.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required]"
                        :type="showPassword ? 'text' : 'password'"
                        label="Contraseña"
                        @click:append="showPassword = !showPassword"
                        @keypress.enter="login"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-0">
                    <v-checkbox v-model="formLogin.remember" light="light" label="Recordarme" class="mt-0" ></v-checkbox>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col align="right" justify="right">
                    <v-btn
                        block
                        class="mt-2 pa-6 text-none"
                        min-width=100
                        color="primary"
                        dark
                        @click="login"
                    >Acceder</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p class="caption">
                      <router-link to="" class="pl-1">
                        Recuperar contraseña
                      </router-link>
                    </p>

                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
    import Vue from 'vue'
    import RULES from "@/mixins/rules";
    import {VForm} from "@/types/formvalidate";
    import LoginService from "@/services/LoginService";

    export default Vue.extend({
        name: 'LoginForm',
        mixins: [RULES],
        directives: {},
        components: {},
        data: () => ({
            vista: 0,
            showPassword: false,
            showPass1: false,
            showPass2: false,
            formLogin: {
                username: '',
                email: '',
                password: '',
                remember: false,
            },
        }),
        created() {
        },
        mounted() {
        },
        computed: {
            form(): VForm {
                return this.$refs.signin as VForm
            },
        },
        watch: {
        },
        methods: {
            async login(){
                if(this.form.validate()){
                    let {data} = await LoginService.login(this.formLogin);
                    if(data.success){
                        await this.$store.dispatch('setToken', data.data);
                        await this.$router.push({name: 'Full'});
                    }else
                      this.$toast.error(`Datos de acceso incorrectos`);
                }
            },
        }
    })
</script>
<style>
    .top-border {
      border-top: 5px solid #149070 !important;
    }
    .text-input-center input{
        text-align: center;
        font-size: 22px;
        width: 100px;
    }
    .no-upper .v-btn__content{
        text-transform: none !important;
    }
    .bg {
        background: url( '/img/fondo.jpg') no-repeat center center;
        background-size: cover;
        transform: scale(1.1);
    }
</style>
