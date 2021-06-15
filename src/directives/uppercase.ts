
function findVModelName(vnode: { context?: any; data?: any; }) {
    return vnode.data.model.expression;
}
function setVModelValue(value: any, vnode: { context: any; }) {
    return new Promise((resolve, reject) => {
        new Function('obj', 'v', `obj.${findVModelName(vnode)} = v`)(vnode.context,value);
        resolve(1)
    });
}
function setModelObjectValue(binding: { value: any; },e: { target: { value: string; }; }){
    return new Promise((resolve, reject) => {
        new Function('obj', 'v', `obj.${binding.value.label} = v`)(binding.value.raiz, e.target.value.toUpperCase());
        resolve(1)
    });
}

export default {
    inserted: function(el: any, binding: any, vnode: any) {
        el.addEventListener('input', (e: { target: any; }) => {
            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;
            if(binding.value!=undefined){
                setModelObjectValue(binding,e).then(r => {
                    e.target.setSelectionRange(start, end);
                });
            }else{
                setVModelValue(e.target.value.toUpperCase(),vnode).then(r => {
                    e.target.setSelectionRange(start, end);
                });
            }
        })
    }
}