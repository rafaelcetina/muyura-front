<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-toolbar color="grey darken-3" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Nuevo Turno</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form">
        <v-card-text max-heigth="800px">
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="formTurno.t_hora"
                  persistent
                  width="400px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="formTurno.t_hora"
                      label="Hora"
                      prepend-icon="mdi-clock"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                    v-if="modal"
                    v-model="formTurno.t_hora"
                    :allowed-minutes="allowedStep"
                    full-width
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="$refs.dialog.save(formTurno.t_hora)">Aceptar</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox
                  v-model="formTurno.estatus"
                  label="¿Activo?"
              ></v-checkbox>
            </v-col>

          </v-row>
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
import TurnoService from '@/services/TurnoService'
import Turno from '@/models/Turno'
import RULES from '@/mixins/rules'
import {VForm} from '@/types/formvalidate'

export default Vue.extend({
  name: 'FormPelicula',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    turno: {
      type: Object as () => Turno,
      default: null,
      required: false,
    }
  },
  mixins: [RULES],
  directives: {},
  data: () => ({
    dialog: false,
    modal: false,
    formTurno: {
      id: null,
      t_hora: '',
      estatus: true,
    },
    formDefault: {
      id: null,
      t_hora: '',
      estatus: true,
    },
  }),
  mounted() {
  },
  computed: {
    form(): VForm {
      return this.$refs.form as VForm
    }
  },
  watch: {
    turno: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val != null) {
          this.formTurno = Object.assign({}, val);
        } else
          this.formTurno = Object.assign({}, this.formDefault)
      }
    },
    show: {
      immediate: true,
      handler(val) {
        console.log(val);
        this.dialog = val;
      }
    }
  },
  methods: {
    allowedStep: (m: number) => m % 15 === 0,
    close(reload: boolean = false) {
      this.form.resetValidation();
      this.$emit('close-dialog', reload);
    },
    async save() {
      if (this.form.validate()) {
        if(this.formTurno.id!=null)
          await TurnoService.update(this.formTurno.id, this.formTurno);
        else
          await TurnoService.create(this.formTurno);
        this.formTurno = Object.assign({}, this.formDefault);
        this.close(true);
      }
    }
  }
})
</script>