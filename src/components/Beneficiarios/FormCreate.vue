<template>
  <v-dialog v-model="dialog" fullscreen persistent>
    <v-card>
      <v-toolbar color="#8784BF" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Nuevo Beneficiario</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark icon @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form">
        <v-card-text class="pa-12">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                  v-model="formdata.curp"
                  v-mask="'AAAA######AAAAAAN#'"
                  v-uppercase
                  :rules="[rules.required,rules.regex('^[A-z]{4}[0-9]{6}[H,M,X,h,m,x][A-z]{5}[0-9A-z]{1}[0-9]{1}$')]"
                  autocomplete="new-password"
                  label="CURP"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                  v-model="formdata.nombre"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="new-password"
                  label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                  v-model="formdata.apellido1"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  label="Primer Apellido"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                  v-model="formdata.apellido2"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="new-password"
                  label="Segundo Apellido"
              ></v-text-field>
            </v-col>
          </v-row>
          <direccion ref="formDireccion" :domicilio="formdata.domicilio" :original="formdata.domicilio"></direccion>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cyan darken-4" text @click="close()">Cancelar</v-btn>
        <v-btn color="cyan darken-4" dark @click="save()">Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import BeneficiarioService from '@/services/BeneficiarioService'
import RULES from '@/mixins/rules'
import {VForm} from '@/types/formvalidate'
import {_Beneficiario, Beneficiario} from "@/models/Beneficiario"
import Direccion from "@/components/Beneficiarios/Direccion.vue";

export default Vue.extend({
  name: 'FormBeneficiario',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    beneficiario: {
      type: Object as () => _Beneficiario,
      default: null,
      required: false,
    }
  },
  components: {
    Direccion
  },
  mixins: [RULES],
  directives: {},
  data: () => ({
    dialog: false,
    modal: false,
    formdata: new Beneficiario(),
    formDefault: new Beneficiario(),
  }),
  mounted() {
  },
  computed: {
    form(): VForm {
      return this.$refs.form as VForm
    },
    formDir(): VForm {
      return this.$refs.formDireccion as VForm
    }
  },
  watch: {
    beneficiario: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val != null) {
          this.formdata = Object.assign({}, val);
        } else
          this.formdata = Object.assign({}, this.formDefault)
      }
    },
    show: {
      immediate: true,
      handler(val) {
        this.dialog = val;
        this.reset();
      }
    }
  },
  methods: {
    reset() {
    },
    close(reload: boolean = false) {
      this.form.resetValidation();
      this.formDir.resetValidation();
      this.$emit('close-dialog', reload);
    },
    async save() {
      let beneficiario_id = this.formdata.id;
      let validDir = this.formDir.validate();
      if (this.form.validate() && validDir) {
        if (this.formdata.id != null)
          await BeneficiarioService.update(this.formdata.id, this.formdata);
        else {
          console.log(this.formdata);
          let {data} = await BeneficiarioService.create(this.formdata);
          beneficiario_id = data.data.id;
        }

        this.formdata = Object.assign({}, this.formDefault);
        this.$toast.success(`Beneficiario registrado exitosamente`);
        this.close(true);
      } else
        this.$toast.error(`Por favor ingrese la información en los campos marcados`);
    },
  }
})
</script>