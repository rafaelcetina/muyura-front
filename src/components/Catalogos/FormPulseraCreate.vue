<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-toolbar color="#8784BF" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Nueva Pulsera</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form">
        <v-card-text max-heigth="800px">
          <v-row>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                  v-model="formdata.lote"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  label="Lote"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="3"
            >
              <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="formdata.fecha_registro"
                      label="Fecha Llegada"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="formdata.fecha_registro"
                    @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                  v-model="formdata.folio_inicial"
                  v-numeric
                  :rules="[rules.required,rules.mayor(0)]"
                  autocomplete="off"
                  label="Folio Inicial"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                  v-model="formdata.folio_final"
                  v-numeric
                  :rules="[rules.required,rules.mayor(0)]"
                  autocomplete="off"
                  label="Folio Final"
              ></v-text-field>
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
import Catalogo from '@/mixins/catalogo'
import RULES from '@/mixins/rules'

export default Catalogo.extend({
  name: 'FormPulseras',
  mixins: [RULES],
  data: () => ({
    menu: false
  })
})
</script>