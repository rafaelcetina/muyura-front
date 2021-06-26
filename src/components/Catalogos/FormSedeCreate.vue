<template>
  <v-dialog v-model="dialog" persistent fullscreen max-width="800px">
    <v-card>
      <v-toolbar color="#8784BF" dark>
        <v-toolbar-title class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Nueva Sede</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form">
        <v-card-text max-heigth="800px">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="formdata.nombre"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                  :rules="[rules.required]"
                  v-model="formdata.region_id"
                  :items="catalogos.regiones"
                  item-text="nombre"
                  item-value="id"
                  label="Region"
                  clearable
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="2"
            >
              <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="formdata.fecha_apertura"
                      label="Fecha Apertura"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    :max="formdata.fecha_cierre"
                    v-model="formdata.fecha_apertura"
                    @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="2"
            >
              <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="formdata.fecha_cierre"
                      label="Fecha Cierre"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    :min="formdata.fecha_apertura"
                    v-model="formdata.fecha_cierre"
                    @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div id="map-canvas" ref="map-canvas" style="width: 100%; height: 400px;"></div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                  v-model="formdata.codigo_postal"
                  v-mask="'#####'"
                  :counter="5"
                  :rules="[rules.required,rules.longDigit(5)]"
                  autocomplete="new-password"
                  :name="`cp-${Math.random()}`"
                  label="Código Postal"
                  clearable
                  @keyup="prellenarCP()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-autocomplete
                  v-model="formdata.municipio_id"
                  :items="catalogos.municipios"
                  :rules="[rules.required]"
                  autocomplete="new-password"
                  :name="`municipio-${Math.random()}`"
                  clearable
                  item-text="label"
                  item-value="id"
                  label="Municipio"
                  @click:clear="resetMunicipio()"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="5">
              <v-autocomplete
                  v-model="formdata.localidad_id"
                  :items="catalogos.localidades"
                  :rules="[rules.required]"
                  autocomplete="new-password"
                  :name="`localidad-${Math.random()}`"
                  clearable
                  item-text="label"
                  item-value="id"
                  label="Localidad"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-textarea
                  v-model="formdata.direccion"
                  v-uppercase
                  :rules="[rules.required]"
                  autocomplete="off"
                  label="Dirección"
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
import {googlemaps} from 'googlemaps';
import DomicilioService from "@/services/DomicilioService";
import {Sede} from "@/models/Sede";
import {CatalogoService} from "@/services/CatalogoService";


export default Catalogo.extend({
  name: 'FormSede',
  mixins: [RULES],
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.dialog = val;
        if(val){
          this.$nextTick(()=>{
            this.inicializacion();
          })
        }
      }
    },
    'formdata.municipio_id': function () {
      if (!this.catalogos.prellenar && this.formdata.municipio_id != null)
        this.cargarLocalidades(this.formdata.entidad_id, this.formdata.municipio_id);
    },
  },
  data: () => ({
    menu1: false,
    menu2: false,
    defaultLatitud: 20.670741093822055,
    defaultLongitud: -103.35155639767375,
    catalogos: {
      regiones: [],
      entidades: [],
      municipios: [],
      localidades: [],
      entidadDefault: 14,
      municipioDefault: null,
      localidadDefault: null,
      prellenar: false,
    },
    formdata: new Sede()
  }),
  mounted() {
    this.cargar();
  },
  created() {
  },
  methods: {
    async cargar() {
      if(this.catalogos.municipios.length==0){
        let response = await DomicilioService.getMunicipios(14);
        this.catalogos.municipios = response.data
      }
      if(this.catalogos.regiones.length==0){
        let service_region = new CatalogoService('regiones');
        let {data: {data}} = await service_region.getAll();
        this.catalogos.regiones = data;
      }

      await this.cargarCP(this.formdata.codigo_postal);
    },
    prellenarCP() {
      if (this.formdata.codigo_postal != '') {
        if (this.formdata.codigo_postal.length == 5) {
          return new Promise((resolve, reject) => {
            this.cargarCP(this.formdata.codigo_postal).then(r => {
              if(r!=null){
                this.formdata.entidad_id = this.catalogos.entidadDefault;
                this.formdata.municipio_id = this.catalogos.municipioDefault;
                this.cargarLocalidades(this.catalogos.entidadDefault, this.catalogos.municipioDefault).then(r => {
                  this.formdata.localidad_id = this.catalogos.localidadDefault;
                }).then(r => {
                  this.catalogos.prellenar = false;
                  resolve(1);
                });
              }
            });
          });
        }
      }
    },
    cargarCP(cp: string) {
      return new Promise((resolve, reject) => {
        if (this.formdata.codigo_postal != '') {
          if (this.formdata.codigo_postal.length == 5) {
            DomicilioService.getAsentamientos(cp).then(response => {
              let {data} = response;
              if (data.length > 0) {
                this.catalogos.prellenar = true;
                this.catalogos.entidadDefault = data[0].cve_ent;
                this.catalogos.municipioDefault = data[0].cve_mun;
                this.catalogos.localidadDefault = data[0].cve_loc;
                resolve(data[0]);
              } else {
                resolve(null);
              }
            }).catch(error => {
              reject(0);
            });
          }
        }
      })
    },
    cargarLocalidades(entidad_id: number | null, municipio_id: number | null) {
      return new Promise((resolve, reject) => {
        if (entidad_id != null && municipio_id != null) {
          DomicilioService.getLocalidades(entidad_id, municipio_id).then(response => {
            let {data} = response;
            this.catalogos.localidades = data;
            resolve(data);
          });
        }
      });
    },
    inicializacion() {
      let latitud = (this.formdata.latitud!==0)?this.formdata.latitud:this.defaultLatitud;
      let longitud = (this.formdata.longitud!==0)?this.formdata.longitud:this.defaultLongitud;

      var mapOptions = {
        center: new google.maps.LatLng(latitud,longitud),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        disableDoubleClickZoom: true,
      };

      var mapa = new google.maps.Map(document.getElementById("map-canvas")!);
      mapa.setOptions(mapOptions);

      var marcador: any = null;
      var initialLocationuser  = null;
      let defaultInit = false;

      if (navigator.geolocation && this.formdata.latitud===0){
        navigator.geolocation.getCurrentPosition(position => {
              initialLocationuser = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
              mapa.setCenter(initialLocationuser);
              marcador = new google.maps.Marker({
                position: initialLocationuser,
                map:mapa
              });
            },
            () => {
              initialLocationuser = new google.maps.LatLng(latitud,longitud);
              mapa.setCenter(initialLocationuser);
              marcador = new google.maps.Marker({
                position: initialLocationuser,
                map:mapa
              });
            }
        );
      }else{
        initialLocationuser = new google.maps.LatLng(latitud,longitud);
        mapa.setCenter(initialLocationuser);
        marcador = new google.maps.Marker({
          position: initialLocationuser,
          map:mapa
        });
      }

      var geocoder = new google.maps.Geocoder;
      var infowindow = new google.maps.InfoWindow;

      google.maps.event.addListener(mapa, "click", (evento: any) => {
        if(marcador!=null)
          marcador.setMap(null);
        //Obtengo las coordenadas separadas
        var latitud = evento.latLng.lat();
        var longitud = evento.latLng.lng();

        this.formdata.latitud = latitud;
        this.formdata.longitud = longitud;

        var coordenadas = new google.maps.LatLng(latitud, longitud);
        marcador = new google.maps.Marker({
          position: coordenadas,
          map: mapa,
          animation: google.maps.Animation.DROP,
          title:"Sede"
        });
        var latlng = {lat: parseFloat(latitud), lng: parseFloat(longitud)};
        geocoder.geocode({'location': latlng}, (results: any, status: any) => {
          if (status === 'OK') {
            if (results[0]) {
              mapa.setZoom(14);

              let address = results[0].address_components;

              let cp = address.filter((item: any) => item.types[0] == "postal_code");
              if(cp.length>0){
                this.formdata.codigo_postal = cp[0].short_name;
                this.prellenarCP();
              }

              this.formdata.direccion = results[0].formatted_address.toUpperCase();

              infowindow.setContent(results[0].formatted_address);
              infowindow.open(mapa, marcador);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      });
    },
  }
})
</script>