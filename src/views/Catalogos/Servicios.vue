<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3">Servicios</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="success" @click="openNew()">Nuevo Servicio</v-btn>
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
            <v-tooltip v-if="!item.estatus" bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="activar(item)">
                  <v-icon
                      v-on="on"
                  >
                    mdi-lock-open
                  </v-icon>
                </v-btn>
              </template>
              <span>Activar</span>
            </v-tooltip>
            <v-tooltip v-else bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="desactivar(item)">
                  <v-icon
                      v-on="on"
                  >
                    mdi-lock
                  </v-icon>
                </v-btn>
              </template>
              <span>Desactivar</span>
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
import {Servicio, _Servicio} from "@/models/Servicio";
import {CatalogoService} from "@/services/CatalogoService";
import FormCreate from "@/components/Catalogos/FormServicioCreate.vue";

export default Vue.extend({
  name: 'Servicios',
  mixins: [],
  components: {
    FormCreate,
  },
  data: () => ({
    dialog: false,
    service: new CatalogoService('servicios'),
    list: [] as _Servicio[],
    element: new Servicio(),
    search: '',
    headers: [
      {text: 'Id', value: 'id', align: 'left', width: 150},
      {text: 'Nombre', value: 'servicio_nombre', align: 'left'},
      {text: '', value: 'action', width: 240, sortable: false},
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
