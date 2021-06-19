<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3">Beneficiarios</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="success" @click="openNew()">Nuevo Registro</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="beneficiarios" :items-per-page="10" :search="search"
                      class="elevation-1" fixed-header>
          <template v-slot:item.edad="{item}">
            {{item.edad}} años
          </template>
          <template v-slot:item.folio_pulsera="{item}">
            <span v-if="item.folio_pulsera==null">NO ASIGNADA</span>
            <span v-else>{{item.folio_pulsera}}</span>
          </template>
          <template v-slot:item.estatus="{item}">
            <span v-if="item.estatus==1">ACTIVO</span>
            <span v-else>BAJA</span>
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="asignar(item)">
                  <v-icon
                      v-on="on"
                  >
                    mdi-menu
                  </v-icon>
                </v-btn>
              </template>
              <span>Asignar Pulsera</span>
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
              <span>Reactivar</span>
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
              <span>Suspender</span>
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
    <form-create :beneficiario="beneficiario" :show="dialog" @close-dialog="closeDialog"></form-create>
    <form-turnos :show="dialogT" @close-dialog="closeDialog"></form-turnos>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import BeneficiarioService from '@/services/BeneficiarioService'
import FormCreate from '@/components/Beneficiarios/FormCreate.vue'
import FormTurnos from "@/components/Beneficiarios/FormTurnos.vue";
import {_Beneficiario, Beneficiario} from "@/models/Beneficiario";

export default Vue.extend({
  name: 'Beneficiarios',
  mixins: [],
  components: {
    FormCreate, FormTurnos
  },
  data: () => ({
    dialog: false,
    dialogT: false,
    beneficiarios: [] as _Beneficiario[],
    beneficiario: new Beneficiario(),
    search: '',
    headers: [
      {text: 'Id', value: 'id', align: 'left'},
      {text: 'CURP', value: 'curp', align: 'left'},
      {text: 'Beneficiario', value: 'nombre_completo', align: 'left'},
      {text: 'Edad', value: 'edad', align: 'left', width: 120},
      {text: 'Pulsera', value: 'folio_pulsera', align: 'left'},
      {text: 'Estatus', value: 'estatus', align: 'center'},
      {text: '', value: 'action', width: 240, sortable: false},
    ],
  }),
  mounted() {
    this.cargar();
  },
  computed: {},
  watch: {},
  methods: {
    async cargar() {
      let {data} = await BeneficiarioService.getAll();
      if (data.success)
        this.beneficiarios = data.data;
    },
    openNew() {
      this.dialog = true;
    },
    editar(item: any) {
      this.beneficiario = Object.assign({}, item);
      this.dialog = true;
    },
    asignar(item: any) {
      //this.pelicula = Object.assign({}, item);
      this.dialogT = true;
    },
    activar(item: { id: any; estatus: number }) {
      BeneficiarioService.activar(item.id).then(res => {
        if (res.data.success)
          this.cargar();
      });
    },
    desactivar(item: { id: any; estatus: number }) {
      BeneficiarioService.desactivar(item.id).then(res => {
        if (res.data.success)
          this.cargar();
      });
    },
    async eliminar(item: { id: any }) {
      let {data} = await BeneficiarioService.delete(item.id);
      if (data.success)
        await this.cargar();
    },
    closeDialog(reload: boolean) {
      this.dialog = false;
      this.dialogT = false;
      this.beneficiario = new Beneficiario();
      if (reload)
        this.cargar();
    },
  }
})
</script>
