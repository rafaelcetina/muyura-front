<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-toolbar color="#8784BF" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Nuevo Municipio</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form">
        <v-card-text max-heigth="800px">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                  v-model="formdata.nombre"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-textarea
                  v-model="formdata.descripcion"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  label="Descripción"
                  auto-grow
              ></v-textarea>
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
  name: 'FormMunicipio',
  mixins: [RULES],
})
</script>