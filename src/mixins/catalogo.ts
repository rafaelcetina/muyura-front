import Vue from 'vue'
import {VForm} from "@/types/formvalidate";

export default Vue.extend({
    props: {
        show: {
            type: Boolean,
            default: false
        },
        model: {
            type: Object,
            default: null,
            required: true,
        },
        service: {
            type: Object,
            default: null,
            required: true,
        },
    },
    directives: {},
    data: () => ({
        dialog: false,
        modal: false,
        formdata: {
            id: ''
        },
        formdefault: {
            id: ''
        },
    }),
    mounted() {
        this.formdata = JSON.parse(JSON.stringify(this.model));
        this.formdefault = JSON.parse(JSON.stringify(this.model));
    },
    computed: {
        form(): VForm {
            return this.$refs.form as VForm
        }
    },
    watch: {
        model: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val != null) {
                    this.formdata = Object.assign({}, val);
                } else
                    this.formdata = Object.assign({}, this.formdefault)
            }
        },
        show: {
            immediate: true,
            handler(val) {
                this.dialog = val;
            }
        }
    },
    methods: {
        close(reload: boolean = false) {
            this.formdata = Object.assign({}, this.formdefault);
            this.form.resetValidation();
            this.$emit('close-dialog', reload);
        },
        async save() {
            if (this.form.validate()) {
                if(this.formdata.id!=null)
                    await this.service.update(this.formdata.id, this.formdata);
                else
                    await this.service.create(this.formdata);
                this.formdata = Object.assign({}, this.formdefault);
                this.close(true);
            }
        }
    }
});