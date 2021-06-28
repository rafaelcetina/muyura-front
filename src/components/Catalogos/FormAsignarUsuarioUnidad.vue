<template>
  <v-dialog v-model="dialog" persistent fullscreen>
    <v-card>
      <v-toolbar color="#8784BF" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Gestión de Usuarios en Unidad</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form">
        <v-card-text class="px-12" max-heigth="800px">
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                  readonly
                  :value="unidad.unidad_nombre"
                  label="Unidad"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  readonly
                  :value="unidad.unidad_clave"
                  label="Clave"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <v-autocomplete
                  v-model="usuario"
                  :items="usuarios"
                  :rules="[rules.required]"
                  autocomplete="new-password"
                  :name="`user-${Math.random()}`"
                  clearable
                  item-text="nombre_completo"
                  item-value="id"
                  label="Usuario"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4" class="pt-5">
              <v-btn color="cyan darken-4" dark @click="save()">Asignar</v-btn>
              <v-btn color="cyan darken-4" class="ml-6" text @click="close()">Cancelar</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span class="title">Usuarios asignados</span>
            </v-col>
            <v-col cols="12">
              <v-data-table fixed-header :headers="headers" :items="asignados" class="elevation-1"
                            :search="search" :items-per-page="10">
                <template v-slot:item.tipo_usuario="{item}">
                  {{item.tipo_usuario.toUpperCase()}}
                </template>
                <template v-slot:item.action="{ item }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon @click="desvincular(item.id)">
                        <v-icon
                            v-on="on"
                        >
                          mdi-account-minus
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Desvincular</span>
                  </v-tooltip>
                </template>
                <template v-slot:no-data>
                  Sin registros
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
      <v-card-actions>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import RULES from '@/mixins/rules'
import {VForm} from '@/types/formvalidate'
import {_Usuario} from "@/models/Usuario";
import UserService from "@/services/UserService";
import {_Unidad} from "@/models/Unidad";

export default Vue.extend({
  name: 'FormAsignarUsuarioTableta',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    unidad: {
      type: Object as () => _Unidad,
      default: null,
      required: true,
    }
  },
  mixins: [RULES],
  directives: {},
  data: () => ({
    dialog: false,
    modal: false,
    search: '',
    asignados: [] as _Usuario[],
    usuarios: [] as _Usuario[],
    usuario: null,
    headers: [
      {text: 'Id', value: 'id', align: 'left', width: 100},
      {text: 'Rol', value: 'tipo_usuario', align: 'left', width: 200},
      {text: 'Servicio', value: 'servicio.servicio_nombre', align: 'left', width: 300},
      {text: 'Nombre', value: 'nombre_completo', align: 'left'},
      {text: '', value: 'action', width: 80, sortable: false},
    ]
  }),
  mounted() {
  },
  computed: {
    form(): VForm {
      return this.$refs.form as VForm
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.dialog = val;
        if (val)
          this.cargarUsuarios();
      }
    }
  },
  methods: {
    close(reload: boolean = false) {
      this.usuario = null
      this.form.resetValidation();
      this.$emit('close-dialog', reload);
    },
    async cargarUsuarios() {
      let {data: {data}} = await UserService.withoutUnit();
      this.usuarios = data;
      let response = await UserService.fromUnit(this.unidad.id);
      let {data: {data: dataFromUnit}} = response;
      this.asignados = dataFromUnit;
    },
    async save() {
      if (this.form.validate()) {
        let {data} = await UserService.addToUnit(this.usuario, this.unidad.id);
        if (data.success) {
          this.$toast.success(`Usuario asignado exitosamente`);
          this.cargarUsuarios();
        } else {
          this.$toast.error(data.message);
        }
      }
    },
    async desvincular(user_id: any){
      let {data} = await UserService.removeFromUnit(user_id);
      if (data.success) {
        this.$toast.success(`Usuario desvinculado exitosamente`);
        await this.cargarUsuarios();
      } else {
        this.$toast.error(data.message);
      }
    }
  }
})
</script>