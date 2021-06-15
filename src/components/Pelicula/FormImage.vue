<template>
    <v-row>
        <v-col cols="12" v-if="preview!=null">
            <v-img height="200" contain :src="preview"></v-img>
        </v-col>
        <v-col cols="12">
            <div class="dropbox">
                <input type="file" name="p_image" @change="onFileChange"
                       accept="image/*" class="input-file">
                <p v-if="url==''">
                    Click o Arrastre Aquí
                </p>
                <div v-else id="preview">
                    <v-img @click="reset()" height="200" contain :src="url"></v-img>
                </div>
            </div>
            <div v-if="url!=''">Haga click en la imagen para descartarla</div>
        </v-col>
    </v-row>
</template>
<script lang="ts">
    import Vue from 'vue'
    const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
    export default Vue.extend({
        name: 'FormImage',
        props: {
            preview: {
                type: String,
                default: null,
                required: false,
            },
        },
        directives: {},
        data: () => ({
            dialog: false,
            currentStatus: -1,
            url: '',
            file: null,
        }),
        mounted() {
            this.reset();
        },
        computed: {
            isInitial() {
                return this.currentStatus === STATUS_INITIAL;
            },
            isSaving() {
                return this.currentStatus === STATUS_SAVING;
            },
            isSuccess() {
                return this.currentStatus === STATUS_SUCCESS;
            },
            isFailed() {
                return this.currentStatus === STATUS_FAILED;
            }
        },
        watch: {
            preview: function(val){
               this.reset();
            }
        },
        methods: {
            reset() {
                this.file = null;
                this.currentStatus = STATUS_INITIAL;
                this.url = '';
            },
            onFileChange(e: { target: { files: any[] } }) {
                this.file = e.target.files[0];
                this.url = URL.createObjectURL(this.file);
                this.$emit('update-file', this.file);
            }
        }
    })
</script>
<style lang="scss">
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        height: 220px;
        min-height: 220px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 220px;
        position: absolute;
        cursor: pointer;
    }

    .dropbox:hover {
        background: lightblue; /* when mouse over to the drop zone, change color */
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }
</style>