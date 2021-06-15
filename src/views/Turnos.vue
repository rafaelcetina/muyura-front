<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3">Turnos</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="success" @click="openNew()">Nuevo Turno</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table fixed-header :headers="headers" :items="turnos" class="elevation-1"
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
    <form-create :turno="turno" :show="dialog" @close-dialog="closeDialog"></form-create>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TurnoService from '@/services/TurnoService'
import Turno from '@/models/Turno'
import FormCreate from '@/components/Turno/FormCreate.vue'

export default Vue.extend({
  name: 'Home',
  mixins: [],
  components: {
    FormCreate,
  },
  data: () => ({
    dialog: false,
    turnos: [] as Turno[],
    turno: {} as Turno,
    search: '',
    headers: [
      {text: 'Id', value: 'id', align: 'left'},
      {text: 'Hora', value: 't_hora', align: 'left'},
      {text: 'Estado', value: 'estatus_label', align: 'center'},
      {text: '', value: 'action', width: 240, sortable: false},
    ]
  }),
  mounted() {
    this.cargarTurnos();
  },
  computed: {},
  watch: {},
  methods: {
    async cargarTurnos() {
      let {data} = await TurnoService.getAll();
      if (data.success)
        this.turnos = data.data;
    },
    openNew() {
      this.dialog = true;
    },
    editar(item: any) {
      this.turno = Object.assign({}, item);
      this.dialog = true;
    },
    activar(item: { id: any; estatus: number }) {
      TurnoService.activar(item.id).then(res => {
        if (res.data.success)
          this.cargarTurnos();
      });
    },
    desactivar(item: { id: any; estatus: number }) {
      TurnoService.desactivar(item.id).then(res => {
        if (res.data.success)
          this.cargarTurnos();
      });
    },
    async eliminar(item: { id: any }) {
      let {data} = await TurnoService.delete(item.id);
      if (data.success)
        await this.cargarTurnos();
    },
    closeDialog(reload: boolean) {
      this.dialog = false;
      this.turno = {} as Turno;
      if (reload)
        this.cargarTurnos();
    }
  }
})
</script>
