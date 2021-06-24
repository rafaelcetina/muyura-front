<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3">Municipios</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="success" @click="openNew()">Nuevo Municipio</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table fixed-header :headers="headers" :items="list" class="elevation-1"
                      :search="search" :items-per-page="10">
          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="editar(item)">
                  <v-icon
                      v-on="on"
                  >
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="eliminar(item)">
                  <v-icon
                      v-on="on"
                  >
                    mdi-trash-can-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
          <template v-slot:no-data>
            Sin registros
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <form-create :model="element" :service="service" :show="dialog" @close-dialog="closeDialog"></form-create>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Municipio, _Municipio} from "@/models/Municipio";
import {CatalogoService} from "@/services/CatalogoService";
import FormCreate from '@/components/Catalogos/FormMunicipioCreate.vue'

export default Vue.extend({
  name: 'Municipios',
  mixins: [],
  components: {
    FormCreate,
  },
  data: () => ({
    dialog: false,
    service: new CatalogoService('municipios'),
    list: [] as _Municipio[],
    element: new Municipio(),
    search: '',
    headers: [
      {text: 'Entidad', value: 'entidad', align: 'left', width: 200},
      {text: 'Clave', value: 'cve_mun', align: 'left', width: 150},
      {text: 'Municipio', value: 'nom_mun', align: 'left'},
      {text: '', value: 'action', width: 120, sortable: false},
    ]
  }),
  mounted() {
    this.cargar();
  },
  computed: {},
  watch: {},
  methods: {
    async cargar(){
      let {data} = await this.service.getAll();
      if (data.success)
        this.list = data.data;
    },
    editar(item: any) {
      this.element = Object.assign({}, item);
      this.dialog = true;
    },
    activar(item: { id: any; estatus: number }) {
      this.service.activar(item.id).then(res => {
        if (res.data.success)
          this.cargar();
      });
    },
    desactivar(item: { id: any; estatus: number }) {
      this.service.desactivar(item.id).then(res => {
        if (res.data.success)
          this.cargar();
      });
    },
    async eliminar(item: { id: any }) {
      let {data} = await this.service.delete(item.id);
      if (data.success)
        await this.cargar();
    },
    openNew() {
      this.dialog = true;
    },
    closeDialog(reload: boolean) {
      this.dialog = false;
      if(reload)
        this.cargar();
    }
  }
})
</script>

