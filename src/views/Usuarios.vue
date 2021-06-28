<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3">Usuarios</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="success" @click="openNew()">Nuevo Usuario</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table fixed-header :headers="headers" :items="usuarios" class="elevation-1"
                      :search="search" :items-per-page="10">
          <template v-slot:item.tipo_usuario="{item}">
            {{item.tipo_usuario.toUpperCase()}}
          </template>
          <template v-slot:item.estatus="{item}">
            <span v-if="item.estatus===1">ACTIVO</span>
            <span v-else>INACTIVO</span>
          </template>
          <template v-slot:item.tableta_count="{item}">
            <span v-if="item.tableta!=null">SI</span>
            <span v-else>NO</span>
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
            <template v-if="['profesionista','brigadista'].includes(item.tipo_usuario)">
              <v-tooltip bottom v-if="item.tableta!=null">
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="desvincular(item.tableta.id)">
                    <v-icon
                        v-on="on"
                    >
                      mdi-cellphone-erase
                    </v-icon>
                  </v-btn>
                </template>
                <span>Desvincular Tableta</span>
              </v-tooltip>
              <v-tooltip bottom v-else>
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="asignar(item)">
                    <v-icon
                        v-on="on"
                    >
                      mdi-cellphone-arrow-down
                    </v-icon>
                  </v-btn>
                </template>
                <span>Asignar Tableta</span>
              </v-tooltip>
            </template>
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
    <form-create :usuario="usuario" :show="dialog" @close-dialog="closeDialog"></form-create>
    <form-asignar-tableta :usuario="usuario" :show="dialogT" @close-dialog="closeDialog"></form-asignar-tableta>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import UserService from '@/services/UserService'
import {_Usuario, Usuario} from '@/models/Usuario'
import FormCreate from '@/components/Usuarios/FormCreate.vue'
import FormAsignarTableta from "@/components/Usuarios/FormAsignarTableta.vue";
import {TabletaService} from "@/services/TabletaService";

export default Vue.extend({
  name: 'Usuarios',
  mixins: [],
  components: {
    FormCreate, FormAsignarTableta
  },
  data: () => ({
    dialog: false,
    dialogT: false,
    usuarios: [] as _Usuario[],
    usuario: new Usuario(),
    search: '',
    headers: [
      { text: 'Id', value: 'id', align: 'left', width: 100  },
      { text: 'RFC', value: 'rfc', align: 'left', width: 150  },
      { text: 'Nombre', value: 'nombre_completo', align: 'left'  },
      { text: 'Rol', value: 'tipo_usuario', align: 'left'  },
      { text: 'Email', value: 'email', align: 'center'  },
      { text: 'Estatus', value: 'estatus', align: 'center', width: 120  },
      { text: 'Tableta', value: 'tableta_count', align: 'center', width: 120  },
      { text: '', value: 'action', width: 240, sortable: false },
    ]
  }),
  mounted() {
    this.cargar();
  },
  computed: {},
  watch: {},
  methods: {
    async cargar(){
      let {data} = await UserService.getAll();
      if(data.success)
        this.usuarios = data.data;
    },
    openNew(){
      this.dialog = true;
    },
    editar(item: any){
      this.usuario = Object.assign({}, item);
      this.dialog = true;
    },
    asignar(item: any){
      this.usuario = Object.assign({}, item);
      this.dialogT = true;
    },
    async desvincular(tableta_id: any){
      let service = new TabletaService();
      let {data} = await service.desvincular(tableta_id);
      if(data.success) {
        this.$toast.success(`Tableta desvinculada exitosamente`);
        this.cargar();
      }
    },
    async eliminar(item: { id: any }){
      let {data} = await UserService.delete(item.id);
      if(data.success)
        await this.cargar();
    },
    activar(item: { id: any; estatus: number }) {
      UserService.activar(item.id).then(res => {
        if (res.data.success)
          this.cargar();
      });
    },
    desactivar(item: { id: any; estatus: number }) {
      UserService.desactivar(item.id).then(res => {
        if (res.data.success)
          this.cargar();
      });
    },
    closeDialog(reload: boolean){
      this.dialog = false;
      this.dialogT = false;
      this.usuario = new Usuario();
      if(reload)
        this.cargar();
    }
  }
})
</script>
