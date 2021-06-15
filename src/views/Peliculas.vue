<template>
    <v-container>
        <v-row>
            <v-col>
                <h1 class="text-h3">Beneficiarios</h1>
            </v-col>
            <v-col class="text-right">
                <v-btn color="success" @click="openNew()">Nueva Registro</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table fixed-header :headers="headers" :items="peliculas" class="elevation-1"
                        :search="search" :items-per-page="10">
                    <template v-slot:item.p_imagen="{item}">
                        <v-hover v-slot:default="{ hover }">
                            <v-avatar size="40" color="light-green darken-2" class="mt-1 mb-1">
                                <v-img
                                        :eager="true"
                                        :src="`http://apptest-global.sytes.net/api/cover/movie/${item.uuid}?`"
                                >
                                    <template v-slot:placeholder>
                                        <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                        >
                                            <v-progress-circular indeterminate
                                                                 color="grey lighten-5"></v-progress-circular>
                                        </v-row>
                                    </template>
                                    <v-expand-transition>
                                        <div
                                                v-if="hover"
                                                class="d-flex transition-fast-in-fast-out blue-grey darken-4 v-card--reveal display-3 white--text"
                                                style="height: 100%;"
                                        >
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn
                                                            v-on="on"
                                                            icon
                                                            color="white"
                                                            @click="openImage(item)"
                                                    >
                                                        <v-icon
                                                                :class="{ 'show-btns': hover }"
                                                        >
                                                            mdi-camera
                                                        </v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Cambiar imagen</span>
                                            </v-tooltip>
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                            </v-avatar>
                        </v-hover>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon @click="editar(item)">
                                    <v-icon
                                        v-on="on"
                                    >
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon @click="asignar(item)">
                                    <v-icon
                                        v-on="on"
                                    >
                                        mdi-menu
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Asignar Turno</span>
                        </v-tooltip>
                        <v-tooltip v-if="!item.estatus" bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon @click="activar(item)">
                                    <v-icon
                                        v-on="on"
                                    >
                                        mdi-lock-open
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Activar</span>
                        </v-tooltip>
                        <v-tooltip v-else bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon @click="desactivar(item)">
                                    <v-icon
                                        v-on="on"
                                    >
                                        mdi-lock
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Desactivar</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon @click="eliminar(item)">
                                    <v-icon
                                        v-on="on"
                                    >
                                        mdi-trash-can-outline
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Eliminar</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:no-data>
                        Sin registros
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <form-create :pelicula="pelicula" :show="dialog" @close-dialog="closeDialog"></form-create>
        <form-turnos :pelicula="pelicula" :show="dialogT" @close-dialog="closeDialog"></form-turnos>
        <v-dialog v-model="dialogImage" fullscreen persistent max-width="800px">
            <v-card>
                <v-toolbar color="grey darken-3" dark>
                    <v-toolbar-title class="ml-0 pl-4">
                        <span class="hidden-sm-and-down">Cargar Imagen</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="closeImage()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text max-heigth="800px">
                    <form-image :preview="image.url" @update-file="fileChange"></form-image>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="cyan darken-4" text @click="closeImage()">Cancelar</v-btn>
                    <v-btn color="cyan darken-4" dark @click="saveImage()">Actualizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PeliculaService from '@/services/PeliculaService'
import Pelicula from '@/models/Pelicula'
import FormCreate from '@/components/Pelicula/FormCreate.vue'
import FormTurnos from "@/components/Pelicula/FormTurnos.vue";
import FormImage from "@/components/Pelicula/FormImage.vue";

export default Vue.extend({
    name: 'Home',
    mixins: [],
    components: {
        FormCreate, FormTurnos, FormImage
    },
    data: () => ({
        dialog: false,
        dialogT: false,
        dialogImage: false,
        peliculas: [] as Pelicula[],
        pelicula: {} as Pelicula,
        search: '',
        headers: [
            { text: 'Id', value: 'id', align: 'left'  },
            { text: 'Nombre', value: 'p_nombre', align: 'left'  },
            { text: 'Apellidos', value: 'p_genero', align: 'left', width: 120  },
            { text: 'Edad', value: 'p_clasificacion', align: 'left', width: 120  },
            { text: 'Pulsera', value: 'p_imagen', align: 'left'  },
            { text: 'Estatus', value: 'estatus_label', align: 'center'  },
            { text: '', value: 'action', width: 240, sortable: false },
        ],
        image: {
            file: null,
            pelicula_id: -1,
            url: '',
        }
    }),
    mounted() {
        this.cargarPeliculas();
    },
    computed: {},
    watch: {},
    methods: {
        async cargarPeliculas(){
            console.log("cargando");
            let {data} = await PeliculaService.getAll();
            if(data.success)
                this.peliculas = data.data;
        },
        openNew(){
            this.dialog = true;
        },
        editar(item: any){
            this.pelicula = Object.assign({}, item);
            this.dialog = true;
        },
        asignar(item: any){
            this.pelicula = Object.assign({}, item);
            this.dialogT = true;
        },
        activar(item: { id: any; estatus: number }){
            PeliculaService.activar(item.id).then(res => {
                if(res.data.success)
                    this.cargarPeliculas();
            });
        },
        desactivar(item: { id: any; estatus: number }){
            PeliculaService.desactivar(item.id).then(res => {
                if(res.data.success)
                    this.cargarPeliculas();
            });
        },
        async eliminar(item: { id: any }){
            let {data} = await PeliculaService.delete(item.id);
            if(data.success)
                await this.cargarPeliculas();
        },
        closeDialog(reload: boolean){
            this.dialog = false;
            this.dialogT = false;
            this.pelicula = {} as Pelicula;
            if(reload)
                this.cargarPeliculas();
        },
        openImage(item: Pelicula){
            this.image.url = `http://apptest-global.sytes.net/api/cover/movie/${item.uuid}`;
            this.image.pelicula_id = item.id;
            this.image.file = null;
            this.dialogImage = true;
        },
        fileChange(file: any){
            this.image.file = file;
        },
        async saveImage() {
            if (this.image.file != null) {
                let {data} = await PeliculaService.uploadImage(this.image.pelicula_id, this.image.file);
                if(data.success){
                    var pelicula = this.peliculas.filter(p => p.id == this.image.pelicula_id)[0];
                    const uuid = pelicula.uuid;
                    pelicula.uuid = Math.random().toString();
                    setTimeout(()=>{
                        pelicula.uuid = uuid;
                        this.closeImage();
                    },100)
                }
            }
        },
        closeImage(){
            this.image.pelicula_id = -1;
            this.image.file = null;
            this.image.url = '';
            this.dialogImage = false;
        }
    }
})
</script>
