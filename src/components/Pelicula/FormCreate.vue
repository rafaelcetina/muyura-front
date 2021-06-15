<template>
    <v-dialog v-model="dialog" fullscreen persistent>
            <v-card>
                <v-toolbar color="#8784BF" dark>
                    <v-toolbar-title class="ml-0 pl-4">
                        <span class="hidden-sm-and-down">Nueva Pelicula</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-form ref="form">
                    <v-card-text max-heigth="800px">
                        <v-row>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    v-uppercase
                                        :rules="[rules.required]"
                                        v-model="formPelicula.p_nombre"
                                        label="Nombre"
                                        aria-autocomplete="none"
                                        autocomplete="off"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-text-field
                                        :rules="[rules.required]"
                                        v-model="formPelicula.p_duracion"
                                        label="Duración (2h 20m)"
                                        aria-autocomplete="none"
                                        autocomplete="off"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-select
                                    :rules="[rules.required]"
                                    v-model="formPelicula.p_genero"
                                    :items="catalogo.genero"
                                    label="Género"
                                    clearable
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-select
                                    :rules="[rules.required]"
                                    v-model="formPelicula.p_clasificacion"
                                    :items="catalogo.clasificacion"
                                    label="Clasificación"
                                    clearable
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-dialog ref="modal" v-model="modal" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="formPelicula.p_fecha_publicacion" label="F. Publicación"
                                                      prepend-inner-icon="mdi-calendar" :rules="[rules.required]" readonly
                                                      v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="formPelicula.p_fecha_publicacion" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false">
                                            Aceptar
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="12">
                                <form-image @update-file="changeFile"></form-image>
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
import PeliculaService from '@/services/PeliculaService'
import Pelicula from '@/models/Pelicula'
import RULES from '@/mixins/rules'
import {VForm} from '@/types/formvalidate'
import FormImage from "@/components/Pelicula/FormImage.vue";

export default Vue.extend({
    name: 'FormPelicula',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        pelicula: {
          type: Object as () => Pelicula,
          default: null,
          required: false,
        }
    },
    mixins: [RULES],
    directives: {},
    components: { FormImage },
    data: () => ({
        dialog: false,
        modal: false,
        catalogo: {
            genero: ['Acción','Aventuras','Ciencia Ficción','Comedia','Documental','Drama','Fantasía','Musical'],
            clasificacion: ['AA','A','B','B15','C','D'],
        },
        formPelicula: {
            id: null,
            p_nombre: '',
            uuid: ''
        },
        formDefault: {
            id: null,
            p_nombre: '',
            uuid: ''
        },
        currentStatus: -1,
        file: null,
    }),
    mounted() {
    },
    computed: {
        form(): VForm {
            return this.$refs.form as VForm
        },
    },
    watch: {
        pelicula: {
            immediate: true,
            deep: true,
            handler(val){
                if(val!=null){
                    this.formPelicula = Object.assign({}, val);
                }else
                    this.formPelicula = Object.assign({}, this.formDefault)
            }
        },
        show: {
            immediate: true,
            handler(val){
                this.dialog = val;
                this.reset();
            }
        }
    },
    methods: {
        reset() {
            this.file = null;
        },
        close(reload: boolean = false){
            this.form.resetValidation();
            this.$emit('close-dialog', reload);
        },
        async save(){
            let pelicula_id = this.formPelicula.id;
            if(this.form.validate()){
                if(this.formPelicula.id!=null)
                  await PeliculaService.update(this.formPelicula.id, this.formPelicula);
                else {
                    let {data} = await PeliculaService.create(this.formPelicula);
                    pelicula_id = data.data.id;
                }

                if(this.file!=null){
                    await PeliculaService.uploadImage(pelicula_id, this.file);
                }

                this.formPelicula = Object.assign({}, this.formDefault);
                this.close(true);
            }
        },
        changeFile(file: any) {
            this.file = file;
        }
    }
})
</script>