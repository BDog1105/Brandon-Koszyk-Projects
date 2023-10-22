import {d, u as _, o, c as n, b as e, e as i, f as u, F as f, r as m} from "./index.7efa5cbb.js";
import {_ as k, a as p} from "./DisplayWorkoutItem.vue_vue_type_script_setup_true_lang.3490cacb.js";
const v = e("h1", {
    class: "title"
}, "Friends Activity", -1)
  , h = {
    class: "columns"
}
  , F = {
    class: "column is-half is-offset-one-quarter"
}
  , w = e("br", null, null, -1)
  , $ = d({
    __name: "FriendsActivity",
    setup(y) {
        const t = _();
        function c(r) {
            t.delete(r)
        }
        return (r,a)=>(o(),
        n("div", null, [v, e("div", h, [e("div", F, [i(k, {
            onNewWorkout: a[0] || (a[0] = s=>u(t).add(s))
        }), w, (o(!0),
        n(f, null, m(u(t).list, (s,l)=>(o(),
        n("div", {
            key: l
        }, [i(p, {
            workout: s,
            onDelete: B=>c(l)
        }, null, 8, ["workout", "onDelete"])]))), 128))])])]))
    }
});
export {$ as default};
