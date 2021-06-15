<template>
  <v-container fluid>
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-text-field
              :readonly="!editable"
              v-model="formUser.name"
              label="Nombre"></v-text-field>
          <v-text-field
              :readonly="!editable"
              v-model="formUser.email"
              label="Email"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="editable" :loading="loading" @click.native="cancelar()">
            <v-icon left dark>mdi-close</v-icon>
            Cancelar
          </v-btn>
          <v-btn v-if="editable" color="primary" :loading="loading" @click.native="update()">
            <v-icon left dark>mdi-check</v-icon>
            Guardar Cambios
          </v-btn>
          <v-btn v-else color="success" :loading="loading" @click.native="editar()">
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
export default Vue.extend({
  name: 'Perfil',
  data () {
    return {
      editable: false,
      formUser: {
        name: '',
        email: '',
      },
      formDefault: {
        name: '',
        email: '',
      },
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
      this.formDefault.name = data.data.name;
      this.formDefault.email = data.data.email;
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
      let response = await UserService.update(this.id, this.formUser);
      if(response.success) {
        await this.$store.dispatch('updateUser', this.formUser.name)
        this.formDefault = Object.assign({}, this.formUser);
      }
      this.editable = false;
    }
  }
})
</script>
