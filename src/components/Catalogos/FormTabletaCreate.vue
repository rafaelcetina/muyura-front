<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-toolbar color="grey darken-3" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Nueva Tableta</span>
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
              <v-select
                  :rules="[rules.required]"
                  v-model="formdata.marca"
                  :items="catalogos.marcas"
                  label="Marca"
                  clearable
              ></v-select>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                  v-model="formdata.modelo"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  label="Modelo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                  v-model="formdata.no_serie"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  label="No Serie"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                  v-model="formdata.mac"
                  v-uppercase
                  :rules="[rules.required, rules.regex('^[0-9A-z]{2}:[0-9A-z]{2}:[0-9A-z]{2}:[0-9A-z]{2}:[0-9A-z]{2}:[0-9A-z]{2}$')]"
                  autocomplete="off"
                  v-mask="'NN:NN:NN:NN:NN:NN'"
                  label="MAC"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                  v-model="formdata.imei"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  v-mask="'###############'"
                  label="IMEI"
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
  name: 'FormTableta',
  mixins: [RULES],
  data: () => ({
    catalogos: {
      marcas: [
          'APPLE','SAMSUNG','HUAWEI','LENOVO','XIAOMI','MICROSOFT','GOOGLE','LG','ASUS','ALCATEL','SONY','NOKIA','HTC','ACER','ZTE','LANIX'
      ]
    }
  })
})
</script>