import store from "@/store";
export default async (to, from, next) => {
    let sess = store.state.session;
    if(sess){
        next({ name: 'Full' });
        return false;
    }
}
