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
                                :value="tableta.marca"
                                label="Marca"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                readonly
                                :value="tableta.modelo"
                                label="Modelo"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                readonly
                                :value="tableta.no_serie"
                                label="No de Serie"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-autocomplete
                                v-model="usuario"
                                :items="usuarios"
                                :rules="[rules.required]"
                                autocomplete="new-password"
                                :name="`user-${Math.random()}`"
                                clearable
                                item-text="nombre_completo"
                                item-value="id"
                                label="Usuario"
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
import UserService from "@/services/UserService";

export default Vue.extend({
    name: 'FormAsignarUsuarioTableta',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        tableta: {
          type: Object as () => _Tableta,
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
        usuarios: [] as _Usuario[],
        usuario: null
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
                  this.cargarUsuarios();
            }
        }
    },
    methods: {
        close(reload: boolean = false){
            this.usuario = null
            this.form.resetValidation();
            this.$emit('close-dialog', reload);
        },
        async cargarUsuarios(){
            let {data: {data}} = await UserService.withoutTablet();
            this.usuarios = data;
        },
        async save(){
            if(this.form.validate()){
                let {data} = await this.service.vincular(this.tableta.id, this.usuario)
                if(data.success){
                  this.$toast.success(`Usuario asignado exitosamente`);
                  this.close(true);
                }else{
                  this.$toast.error(data.message);
                }

            }
        }
    }
})
</script>