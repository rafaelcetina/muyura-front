<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-toolbar color="#8784BF" dark>
                    <v-toolbar-title class="ml-0 pl-4">
                        <span class="hidden-sm-and-down">Asignar Tableta</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-form ref="form">
                    <v-card-text max-heigth="800px">
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                                readonly
                                :value="usuario.nombre_completo"
                                label="Usuario"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                readonly
                                :value="usuario.rfc"
                                label="RFC"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-autocomplete
                                v-model="tableta"
                                :items="tabletas"
                                :rules="[rules.required]"
                                autocomplete="new-password"
                                :name="`device-${Math.random()}`"
                                clearable
                                item-text="descripcion"
                                item-value="id"
                                label="Dispositivo"
                            ></v-autocomplete>
                          </v-col>

                        </v-row>
                    </v-card-text>
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="cyan darken-4" text @click="close()">Cancelar</v-btn>
                    <v-btn color="cyan darken-4" dark @click="save()">Asignar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import RULES from '@/mixins/rules'
import {VForm} from '@/types/formvalidate'
import {_Usuario} from "@/models/Usuario";
import {_Tableta} from "@/models/Tableta";
import {TabletaService} from "@/services/TabletaService";

export default Vue.extend({
    name: 'FormTurnos',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        usuario: {
          type: Object as () => _Usuario,
          default: null,
          required: true,
        }
    },
    mixins: [RULES],
    directives: {},
    data: () => ({
        dialog: false,
        modal: false,
        service: new TabletaService(),
        tabletas: [] as _Tableta[],
        tableta: null
    }),
    mounted() {
    },
    computed: {
        form(): VForm {
            return this.$refs.form as VForm
        }
    },
    watch: {
        show: {
            immediate: true,
            handler(val){
                this.dialog = val;
                if(val)
                  this.cargarTabletas();
            }
        }
    },
    methods: {
        close(reload: boolean = false){
            this.tableta = null
            this.form.resetValidation();
            this.$emit('close-dialog', reload);
        },
        async cargarTabletas(){
            let {data: {data}} = await this.service.availables();
            this.tabletas = data;
        },
        async save(){
            if(this.form.validate()){
                let {data} = await this.service.vincular(this.tableta, this.usuario.id)
                if(data.success){
                  this.$toast.success(`Tableta asignada exitosamente`);
                  this.close(true);
                }else{
                  this.$toast.error(data.message);
                }

            }
        }
    }
})
</script>