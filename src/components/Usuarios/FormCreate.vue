<template>
  <v-dialog v-model="dialog" persistent fullscreen>
    <v-card>
      <v-toolbar color="#8784BF" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Nuevo Usuario</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form">
        <v-card-text class="pa-12">
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                  :rules="[rules.required]"
                  v-model="formUser.tipo_usuario"
                  :items="catalogos.tipo_usuarios"
                  item-value="id"
                  item-text="label"
                  label="Tipo de Usuario"
                  clearable
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  v-uppercase
                  :rules="[rules.required,rules.regex('^[A-z]{4}[0-9]{6}[0-9A-z]{3}$')]"
                  v-mask="'AAAA######NNN'"
                  v-model="formUser.rfc"
                  label="RFC"
                  autocomplete="new-password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                  :rules="[rules.required]"
                  v-model="formUser.sexo"
                  :items="catalogos.sexo"
                  item-value="id"
                  item-text="label"
                  label="Sexo"
                  clearable
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                  v-uppercase
                  :rules="[rules.required]"
                  v-model="formUser.nombre"
                  label="Nombre"
                  autocomplete="new-password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  v-uppercase
                  :rules="[rules.required]"
                  v-model="formUser.apellido1"
                  label="Primer Apellido"
                  autocomplete="off"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  v-uppercase
                  :rules="[rules.required]"
                  v-model="formUser.apellido2"
                  label="Segundo Apellido"
                  autocomplete="new-password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  v-uppercase
                  :rules="[rules.required]"
                  v-mask="'(###) ### ####'"
                  v-model="formUser.telefono"
                  label="Telefono"
                  aria-autocomplete="none"
                  autocomplete="off"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                  aria-autocomplete="none"
                  autocomplete="off"
                  :rules="[rules.required, rules.email]"
                  v-model="formUser.email"
                  label="Correo"
              ></v-text-field>
            </v-col>
            <template v-if="isProfesionista">
              <v-col cols="12" md="4">
                <v-select
                    :rules="[rules.required]"
                    v-model="formUser.servicio_id"
                    :items="catalogos.servicios"
                    item-value="id"
                    item-text="label"
                    label="Servicio"
                    clearable
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                    v-uppercase
                    :rules="[rules.required]"
                    v-model="formUser.cedula"
                    label="Cédula"
                    aria-autocomplete="none"
                    autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                    v-uppercase
                    :rules="[rules.required]"
                    v-model="formUser.institucion"
                    label="Institución/Universidad"
                    aria-autocomplete="none"
                    autocomplete="off"
                ></v-text-field>
              </v-col>
            </template>
            <v-col cols="12" md="4">
              <v-text-field
                  :rules="[rules.required]"
                  v-model="formUser.username"
                  label="Usuario"
                  aria-autocomplete="none"
                  autocomplete="off"
                  :name="`username_${Math.random()}`"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" v-if="formUser.id==null">
              <v-text-field
                  v-model="formUser.password"
                  :append-icon="showNip ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min(8)]"
                  :type="showNip ? 'text' : 'password'"
                  name="input-10-1"
                  label="Nueva"
                  hint=""
                  counter
                  @click:append="showNip = !showNip"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" v-if="formUser.id==null">
              <v-text-field
                  v-model="formUser.c_password"
                  :append-icon="showNip2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min(8),rules.match([formUser.password,formUser.c_password])]"
                  :type="showNip2 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Confirmar"
                  hint=""
                  counter
                  @click:append="showNip2 = !showNip2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cyan darken-4" text @click="close()">Cancelar</v-btn>
        <v-btn color="cyan darken-4" dark @click="save()">
          <span v-if="formUser.id==null">Registrar</span>
          <span v-else>Actualizar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import UserService from '@/services/UserService'
import {_Usuario,Usuario} from '@/models/Usuario'
import RULES from '@/mixins/rules'
import {VForm} from '@/types/formvalidate'
import UnMask from '@/common/unmask'

export default Vue.extend({
  name: 'FormAdmin',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    usuario: {
      type: Object as () => _Usuario,
      default: null,
      required: false,
    }
  },
  mixins: [RULES],
  directives: {},
  data: () => ({
    catalogos: {
      tipo_usuarios: [
        {id: 'administrador', label: 'Administrador'},
        {id: 'operativo', label: 'Operativo'},
        {id: 'profesionista', label: 'Profesionista'},
        {id: 'brigadista', label: 'Brigadista'},
      ],
      servicios: [
        {id: 1, label: 'Medicina General'},
        {id: 2, label: 'Psicología'},
        {id: 3, label: 'Podología'},
        {id: 4, label: 'Nutrición'},
        {id: 5, label: 'Activación Física'},
      ],
      sexo: [
        {id:'H', label: 'Hombre'},
        {id:'M', label: 'Mujer'},
      ]
    },
    dialog: false,
    modal: false,
    showNip: false,
    showNip2: false,
    formUser: new Usuario(),
    formDefault: new Usuario(),
  }),
  mounted() {
  },
  computed: {
    isProfesionista(){
      return this.formUser.tipo_usuario==='profesionista';
    },
    form(): VForm {
      return this.$refs.form as VForm
    }
  },
  watch: {
    usuario: {
      immediate: true,
      deep: true,
      handler(val){
        if(val!=null){
          this.formUser = Object.assign({}, val);
        }else
          this.formUser = Object.assign({}, this.formDefault)
      }
    },
    show: {
      immediate: true,
      handler(val) {
        this.dialog = val;
      }
    }
  },
  methods: {
    close(reload: boolean = false) {
      this.form.resetValidation();
      this.$emit('close-dialog', reload);
    },
    async save() {
      if (this.form.validate()) {
        let data = Object.assign({},this.formUser);
        data.telefono = UnMask.unmask(data.telefono, '(###) ### ####')
        if(this.formUser.id!=null)
          await UserService.update(this.formUser.id, data);
        else
          await UserService.create(data);
        this.formUser = Object.assign({}, this.formDefault);
        this.$toast.success(`Usuario registrado exitosamente`);
        this.close(true);
      }else
        this.$toast.error(`Por favor ingrese la información en los campos marcados`);
    }
  }
})
</script>