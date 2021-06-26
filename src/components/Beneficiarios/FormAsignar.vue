<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
            <v-card>
                <v-toolbar color="#8784BF" dark>
                    <v-toolbar-title class="ml-0 pl-4">
                        <span class="hidden-sm-and-down">Asignar Pulsera</span>
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
                                :value="beneficiario.nombre_completo"
                                label="Beneficiario"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                readonly
                                :value="beneficiario.curp"
                                label="CURP Beneficiario"
                            ></v-text-field>
                          </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-uppercase
                                    v-model="folio"
                                    label="Folio"
                                    aria-autocomplete="none"
                                    autocomplete="off"
                                ></v-text-field>
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
import {_Beneficiario} from "@/models/Beneficiario";
import BeneficiarioService from "@/services/BeneficiarioService";

export default Vue.extend({
    name: 'FormTurnos',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        beneficiario: {
          type: Object as () => _Beneficiario,
          default: null,
          required: true,
        }
    },
    mixins: [RULES],
    directives: {},
    data: () => ({
        dialog: false,
        modal: false,
        folio: ''
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
            }
        }
    },
    methods: {
        close(reload: boolean = false){
            this.$emit('close-dialog', reload);
        },
        async save(){
            if(this.form.validate()){
                let {data} = await BeneficiarioService.asignarPulsera(this.beneficiario.id,{folio: this.folio})
                if(data.success){
                  this.$toast.success(`Pulsera asignada exitosamente`);
                  this.folio = '';
                  this.close(true);
                }else{
                  this.$toast.error(data.message);
                }

            }
        }
    }
})
</script>