<template>
  <v-row class="mt-4" justify="center">
    <v-col cols="12">
      <v-form ref="formDireccion">
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
                v-model="formDom.codigo_postal"
                v-mask="'#####'"
                :counter="5"
                :rules="[rules.required,rules.longDigit(5)]"
                autocomplete="new-password"
                :name="`cp-${Math.random()}`"
                label="Código Postal"
                clearable
                @keyup="prellenarCP()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-autocomplete
                v-model="formDom.entidad_id"
                :items="catalogos.entidades"
                :rules="[rules.required]"
                autocomplete="new-password"
                :name="`entidad-${Math.random()}`"
                clearable
                item-text="nom_ent"
                item-value="cve_ent"
                label="Estado"
                @click:clear="resetEntidad()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="5" sm="12">
            <v-autocomplete
                v-model="formDom.municipio_id"
                :items="catalogos.municipios"
                :rules="[rules.required]"
                autocomplete="new-password"
                :name="`municipio-${Math.random()}`"
                clearable
                item-text="label"
                item-value="id"
                label="Municipio"
                @click:clear="resetMunicipio()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-autocomplete
                v-model="formDom.localidad_id"
                :items="catalogos.localidades"
                :rules="[rules.required]"
                autocomplete="new-password"
                :name="`localidad-${Math.random()}`"
                clearable
                item-text="label"
                item-value="id"
                label="Localidad"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-combobox
                v-model="formDom.asentamiento"
                :items="catalogos.asentamientos"
                :rules="[rules.required]"
                autocomplete="new-password"
                :name="`asentamiento-${Math.random()}`"
                :id="`asentamiento-${Math.random()}`"
                clearable
                label="Colonia/Asentamiento"
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
                v-model="formDom.vialidad"
                v-uppercase
                :rules="[rules.required]"
                autocomplete="new-password"
                :name="`vialidad-${Math.random()}`"
                label="Calle"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
                v-model="formDom.numero_exterior"
                v-uppercase
                :rules="[rules.required]"
                autocomplete="new-password"
                :name="`num_ext-${Math.random()}`"
                label="Número Exterior"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
                v-model="formDom.numero_interior"
                v-uppercase
                autocomplete="new-password"
                :name="`num_int-${Math.random()}`"
                label="Número Interior"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
                v-model="formDom.cruzamiento1"
                v-uppercase
                autocomplete="new-password"
                :name="`cru1-${Math.random()}`"
                label="Cruzamiento 1"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
                v-model="formDom.cruzamiento2"
                v-uppercase
                autocomplete="new-password"
                :name="`cru2-${Math.random()}`"
                label="Cruzamiento 2"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
                v-model="formDom.cruzamiento3"
                v-uppercase
                autocomplete="new-password"
                :name="`cru3-${Math.random()}`"
                label="Cruzamiento 3"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import RULES from "@/mixins/rules"
import {Domicilio, _Domicilio} from "@/models/Domicilio";
import DomicilioService from "@/services/DomicilioService";
import {VForm} from "@/types/formvalidate";

export default Vue.extend({
  name: 'Direccion',
  props: ['beneficiario', 'domicilio', 'original'],
  mixins: [RULES],
  directives: {},
  data: () => ({
    showForm: false,
    catalogos: {
      entidades: [],
      municipios: [],
      localidades: [],
      asentamientos: [],
      entidadDefault: 14,
      municipioDefault: null,
      localidadDefault: null,
      prellenar: false,
    },
    formDom: new Domicilio(),
    formDefault: new Domicilio(),
  }),
  created() {
  },
  mounted() {
    console.log(this.domicilio);
    this.formDom = this.domicilio
    this.cargarDirecciones();
  },
  computed: {
    form(): VForm {
      return this.$refs.formDireccion as VForm
    },
  },
  watch: {
    /*'user': {
        handler(val) {
            if(val!=null){
                this.defaultItem.user_id = this.user.id;
                this.cargarDirecciones();
            }
        },
        immediate: true,
        deep: true
    },*/
    'formDom.entidad_id': {
        handler(){
          if (!this.catalogos.prellenar && this.formDom.entidad_id != null)
            this.cargarMunicipios(this.formDom.entidad_id);
        },
      immediate: true
    },
    'formDom.municipio_id': function () {
      if (!this.catalogos.prellenar && this.formDom.municipio_id != null)
        this.cargarLocalidades(this.formDom.entidad_id, this.formDom.municipio_id);
    },
    'formDom.localidad_id': function () {
      this.formDom.asentamiento = '';
    }
  },
  methods: {
    validate() {
      return this.form.validate();
    },
    resetValidation() {
      return this.form.resetValidation();
    },
    update() {
      this.$emit('update',this.formDom)
    },
    async cargarDirecciones() {
      let {data} = await DomicilioService.getEntidades();
      this.catalogos.entidades = data
      /*axios.get(LaravelRoute('account.locations',{user_id: this.user.id})).then(response => {
          if(response.data!=null)
              this.editarDireccion(response.data);
      });*/
    },
    prellenarCP() {
      if (this.formDom.codigo_postal != '') {
        if (this.formDom.codigo_postal.length == 5) {
          return new Promise((resolve, reject) => {
            this.cargarCP(this.formDom.codigo_postal).then(r => {
              if(r!=null){
                this.formDom.entidad_id = this.catalogos.entidadDefault;
                this.cargarMunicipios(this.catalogos.entidadDefault).then(r => {
                  this.formDom.municipio_id = this.catalogos.municipioDefault;
                  this.cargarLocalidades(this.catalogos.entidadDefault, this.catalogos.municipioDefault).then(r => {
                    this.formDom.localidad_id = this.catalogos.localidadDefault;
                  });
                }).then(r => {
                  this.catalogos.prellenar = false;
                  resolve(1);
                });
              }
            });
          });
        }
      }
    },
    cargarCP(cp: string) {
      return new Promise((resolve, reject) => {
        DomicilioService.getAsentamientos(cp).then(response => {
          let {data} = response;
          if (data.length > 0) {
            this.catalogos.asentamientos = data.map((item: any) => {
              return item.label;
            });
            this.catalogos.prellenar = true;
            this.catalogos.entidadDefault = data[0].cve_ent;
            this.catalogos.municipioDefault = data[0].cve_mun;
            this.catalogos.localidadDefault = data[0].cve_loc;
            this.formDom.asentamiento = '';
            resolve(data[0]);
          } else{
            //this.formDom.codigo_postal = '';
            resolve(null);
          }
        }).catch(error => {
          reject(0);
        });
      })
    },
    cargarMunicipios(entidad_id: number | null) {
      return new Promise((resolve, reject) => {
        if (entidad_id != null) {
          DomicilioService.getMunicipios(entidad_id).then(response => {
            let {data} = response;
            this.catalogos.municipios = data;
            resolve(data);
          });
        }
      });
    },
    cargarLocalidades(entidad_id: number | null, municipio_id: number | null) {
      return new Promise((resolve, reject) => {
        if (entidad_id != null && municipio_id != null) {
          DomicilioService.getLocalidades(entidad_id, municipio_id).then(response => {
            let {data} = response;
            this.catalogos.localidades = data;
            resolve(data);
          });
        }
      });
    },
  }
})
</script>
