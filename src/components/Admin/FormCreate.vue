<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-toolbar color="grey darken-3" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Nueva Pelicula</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form">
        <v-card-text max-heigth="800px">
          <v-row>
            <v-col cols="12" md="8" sm="12">
              <v-text-field
                  v-uppercase
                  :rules="[rules.required]"
                  v-model="formUser.name"
                  label="Nombre"
                  aria-autocomplete="none"
                  autocomplete="off"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  aria-autocomplete="none"
                  autocomplete="off"
                  :rules="[rules.required, rules.email]"
                  v-model="formUser.email"
                  label="Correo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="formUser.id==null">
              <v-text-field
                  v-model="formUser.password"
                  :append-icon="showNip ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min(8)]"
                  :type="showNip ? 'text' : 'password'"
                  name="input-10-1"
                  label="Nueva"
                  hint=""
                  counter
                  @click:append="showNip = !showNip"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="formUser.id==null">
              <v-text-field
                  v-model="formUser.c_password"
                  :append-icon="showNip2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min(8),rules.match([formUser.password,formUser.c_password])]"
                  :type="showNip2 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Confirmar"
                  hint=""
                  counter
                  @click:append="showNip2 = !showNip2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cyan darken-4" text @click="close()">Cancelar</v-btn>
        <v-btn color="cyan darken-4" dark @click="save()">Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import UserService from '@/services/UserService'
import Usuario from '@/models/Usuario'
import RULES from '@/mixins/rules'
import {VForm} from '@/types/formvalidate'

export default Vue.extend({
  name: 'FormAdmin',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    usuario: {
      type: Object as () => Usuario,
      default: null,
      required: false,
    }
  },
  mixins: [RULES],
  directives: {},
  data: () => ({
    dialog: false,
    modal: false,
    showNip: false,
    showNip2: false,
    formUser: {
      id: null,
      name: '',
      email: '',
      password: '',
      c_password: '',
    },
    formDefault: {
      id: null,
      name: '',
      email: '',
      password: '',
      c_password: '',
    },
  }),
  mounted() {
  },
  computed: {
    form(): VForm {
      return this.$refs.form as VForm
    }
  },
  watch: {
    usuario: {
      immediate: true,
      deep: true,
      handler(val){
        if(val!=null){
          this.formUser = Object.assign({}, val);
        }else
          this.formUser = Object.assign({}, this.formDefault)
      }
    },
    show: {
      immediate: true,
      handler(val) {
        console.log(val);
        this.dialog = val;
      }
    }
  },
  methods: {
    close(reload: boolean = false) {
      this.form.resetValidation();
      this.$emit('close-dialog', reload);
    },
    async save() {
      if (this.form.validate()) {
        if(this.formUser.id!=null)
          await UserService.update(this.formUser.id, this.formUser);
        else
          await UserService.create(this.formUser);
        this.formUser = Object.assign({}, this.formDefault);
        this.close(true);
      }
    }
  }
})
</script>