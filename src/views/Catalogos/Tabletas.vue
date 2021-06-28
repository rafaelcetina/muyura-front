<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3">Tabletas</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="success" @click="openNew()">Nueva Tableta</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table fixed-header :headers="headers" :items="list" class="elevation-1"
                      :search="search" :items-per-page="10">
          <template v-slot:item.estatus="{item}">
            <span v-if="item.estatus===1">ACTIVA</span>
            <span v-else>INACTIVA</span>
          </template>
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
            <v-tooltip v-if="item.usuario_id==null" bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="asignar(item)">
                  <v-icon
                      v-on="on"
                  >
                    mdi-account-plus
                  </v-icon>
                </v-btn>
              </template>
              <span>Asignar Usuario</span>
            </v-tooltip>
            <v-tooltip v-else bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="desvincular(item.id)">
                  <v-icon
                      v-on="on"
                  >
                    mdi-account-minus
                  </v-icon>
                </v-btn>
              </template>
              <span>Desvincular Usuario</span>
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
    <form-asignar :tableta="element" :show="dialogT" @close-dialog="closeDialog"></form-asignar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Tableta, _Tableta} from "@/models/Tableta";
import FormCreate from '@/components/Catalogos/FormTabletaCreate.vue'
import FormAsignar from "@/components/Catalogos/FormAsignarUsuarioTableta.vue";
import {TabletaService} from "@/services/TabletaService";

export default Vue.extend({
  name: 'Tabletas',
  mixins: [],
  components: {
    FormCreate, FormAsignar
  },
  data: () => ({
    dialog: false,
    dialogT: false,
    service: new TabletaService(),
    list: [] as _Tableta[],
    element: new Tableta(),
    search: '',
    headers: [
      {text: 'Id', value: 'id', align: 'left', width: 100},
      {text: 'No Serie', value: 'no_serie', align: 'left', width: 150},
      {text: 'Marca', value: 'marca', align: 'left', width: 200},
      {text: 'Modelo', value: 'modelo', align: 'left'},
      {text: 'MAC', value: 'mac', align: 'left', width: 120},
      {text: 'IMEI', value: 'imei', align: 'left', width: 120},
      {text: 'Usuario', value: 'usuario.nombre_completo', align: 'left'},
      {text: 'Estatus', value: 'estatus', align: 'left', width: 100},
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
    asignar(item: any){
      this.element = Object.assign({}, item);
      this.dialogT = true;
    },
    async desvincular(tableta_id: any){
      let {data} = await this.service.desvincular(tableta_id);
      if(data.success) {
        this.$toast.success(`Tableta desvinculada exitosamente`);
        await this.cargar();
      }
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
      this.dialogT = false;
      if(reload)
        this.cargar();
    }
  }
})
</script>

