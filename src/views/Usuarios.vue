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
    <form-create :usuario="usuario" :show="dialog" @close-dialog="closeDialog"></form-create>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import UserService from '@/services/UserService'
import {_Usuario, Usuario} from '@/models/Usuario'
import FormCreate from '@/components/Usuarios/FormCreate.vue'

export default Vue.extend({
  name: 'Usuarios',
  mixins: [],
  components: {
    FormCreate,
  },
  data: () => ({
    dialog: false,
    usuarios: [] as _Usuario[],
    usuario: new Usuario(),
    search: '',
    headers: [
      { text: 'Id', value: 'id', align: 'left', width: 120  },
      { text: 'RFC', value: 'rfc', align: 'left', width: 150  },
      { text: 'Nombre', value: 'nombre_completo', align: 'left'  },
      { text: 'Username', value: 'username', align: 'left'  },
      { text: 'Rol', value: 'tipo_usuario', align: 'left'  },
      { text: 'Email', value: 'email', align: 'center'  },
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
      //this.usuario.setData(item);
      this.usuario = Object.assign({}, item);
      this.dialog = true;
    },
    async eliminar(item: { id: any }){
      let {data} = await UserService.delete(item.id);
      if(data.success)
        await this.cargar();
    },
    closeDialog(reload: boolean){
      this.dialog = false;
      this.usuario = new Usuario();
      if(reload)
        this.cargar();
    }
  }
})
</script>
