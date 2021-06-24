import Vue from 'vue'

export default Vue.extend({
    data: function(){
        return {
            rules: {
              size: (v: { size: number; }) => !v || v.size < 5000000 || 'El tamaño debe ser menor a 5 MB!',
              required: (v: number) => (!!v || v===0) || 'El campo es requerido',
              email: (v: string) => {
                  if((v || '').length==0){
                      return true;
                  }else{
                      return /.+@.+\..+/.test(v) || 'Correo no válido'
                  }
              },
              regex(expresion: string | RegExp){
                  return (v: string) => {
                      if((v || '').length==0){
                          return true;
                      }else{
                          return new RegExp(expresion).test(v) || 'Formato inválido'
                      }
                  }
              },
              notCero: (v: string) => v=='0.00' || 'Ingrese un valor mayor a 0',
              mayor(number: string | number){ return (v: string) => Number.parseFloat(v)>number || 'Ingrese un valor mayor a '+number },
              mayorIgual(number: string | number){ return (v: string) => Number.parseFloat(v)>=number || 'Ingrese un valor mayor o igual a '+number },
              menor(number: string | number){ return (v: string) => Number.parseFloat(v)<number || 'Ingrese un valor menor a '+number },
              menorIgual(number: string | number){ return (v: string) => Number.parseFloat(v)<=number || 'Ingrese un valor menor o igual a '+number },
              longDigit(number: string|number){
                return (v: any) => (v || '').length == number || 'Debe proporcionar '+number+' digitos/caracteres';
              },
              min(number: string | number){
                return (v: any) => (v || '').length >= number || 'Mínimo '+number+' caracteres';
              },
              max(number: string | number){
                return (v: any) => (v || '').length <= number || 'Máximo: '+number+' caracteres';
              },
              notCeroMoney: (v: string) => v!="0.00" || 'Monto no válido',
              notequal(string: any){
                return (v: any) => v!=string || 'Valor no válido';
              },
              match: (value: any[]) => {
                if(value[0]!=value[1])
                  return false || 'No coincide';
                else
                  return true;
              },
              requiredif(condition: boolean){
                  return (v: any) => (condition)?(!!v || 'Requerido'):true;
              },
            },
        }
    },
});