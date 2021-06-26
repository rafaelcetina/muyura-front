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
                                    v-uppercase
                                        readonly
                                        :value="formPelicula.p_nombre"
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
                    <v-btn color="cyan darken-4" dark @click="save()">Registrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import RULES from '@/mixins/rules'
import {VForm} from '@/types/formvalidate'

export default Vue.extend({
    name: 'FormTurnos',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        pelicula: {
          type: Object,
          default: null,
          required: false,
        }
    },
    mixins: [RULES],
    directives: {},
    data: () => ({
        dialog: false,
        modal: false,
        catalogo: {
            turnos: []
        },
        turnos: [],
        formPelicula: {
            id: null,
            p_nombre: '',
            p_fecha_publicacion: moment().format("YYYY-MM-DD"),
            p_genero: null,
            p_clasificacion: null,
            p_duracion: '',
            p_imagen: ''
        },
        formDefault: {
            id: null,
            p_nombre: '',
            p_fecha_publicacion: moment().format("YYYY-MM-DD"),
            p_genero: null,
            p_clasificacion: null,
            p_duracion: '',
            p_imagen: ''
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
        pelicula: {
            immediate: true,
            deep: true,
            handler(val){
                if(val!=null){
                    this.turnos = val.turnos;
                    this.formPelicula = Object.assign({}, val);
                }
            }
        },
        show: {
            immediate: true,
            handler(val){
                if(val)
                    this.cargar();
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
                //let {data} = await PeliculaService.setHorarrios(this.pelicula.id, {turnos: this.turnos});
                this.formPelicula = Object.assign({}, this.formDefault);
                this.close(true);
            }
        }
    }
})
</script>