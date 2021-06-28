<template>
  <v-container fluid>
    <v-layout column>
      <v-card>
        <v-card-text class="pa-12">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                  readonly
                  v-model="formUser.nombre"
                  label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  readonly
                  v-model="formUser.apellido1"
                  label="Primer Apellido"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  readonly
                  v-model="formUser.apellido2"
                  label="Segundo Apellido"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                  readonly
                  v-uppercase
                  :rules="[rules.required,rules.regex('^[A-z]{4}[0-9]{6}[0-9A-z]{3}$')]"
                  v-mask="'AAAA######NNN'"
                  v-model="formUser.rfc"
                  label="RFC"
                  autocomplete="new-password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                  :readonly="!editable"
                  :rules="[rules.required]"
                  v-uppercase
                  v-mask="'(###) ### ####'"
                  v-model="formUser.telefono"
                  label="Telefono"
                  aria-autocomplete="none"
                  autocomplete="off"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                  :readonly="!editable"
                  v-model="formUser.email"
                  label="Email"></v-text-field>
            </v-col>


          </v-row>
        </v-card-text>
        <v-card-actions class="px-12 pb-12">
          <v-btn v-if="editable" @click.native="cancelar()">
            <v-icon left dark>mdi-close</v-icon>
            Cancelar
          </v-btn>
          <v-btn v-if="editable" color="primary" @click.native="update()">
            <v-icon left dark>mdi-check</v-icon>
            Guardar Cambios
          </v-btn>
          <v-btn v-else color="success" @click.native="editar()">
            <v-icon left dark>mdi-pencil</v-icon>
            Editar Perfil
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import UserService from "@/services/UserService";
import {mapGetters} from "vuex";
import {Usuario} from "@/models/Usuario";
import RULES from '@/mixins/rules'
import UnMask from '@/common/unmask'

export default Vue.extend({
  name: 'Perfil',
  mixins: [RULES],
  data () {
    return {
      loading: false,
      editable: false,
      formUser: new Usuario(),
      formDefault: new Usuario(),
    }
  },
  computed: {
    ...mapGetters({
      usuario: 'usuario', id: 'id'
    })
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(){
      let {data} = await UserService.get(this.id);
      data.data.telefono = Vue.filter('VMask')(data.data.telefono, '(###) ### ####'); // this.$options.filters.VMask(data.data.telefono, '(###) ### ####');
      this.formDefault = data.data;
      this.formUser = Object.assign({}, this.formDefault);
    },
    editar(){
      this.editable = true;
    },
    cancelar(){
      this.formUser = Object.assign({}, this.formDefault);
      this.editable = false;
    },
    async update(){
      let formdata = Object.assign({}, this.formUser);
      if(formdata.telefono!=null && formdata.telefono!='')
        formdata.telefono = UnMask.unmask(formdata.telefono, '(###) ### ####')
      let {data} = await UserService.update(this.id, formdata);
      if(data.success) {
        this.$toast.success('Perfil actualizado exitosamente');
        await this.$store.dispatch('updateUser', this.formUser.nombre)
        this.formDefault = Object.assign({}, this.formUser);
      }
      this.editable = false;
    }
  }
})
</script>
