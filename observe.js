class Observe {
    constructor(data) {
        this.observe(data);
    }
    observe(data) {
        if (!data || typeof data !== "object") {
            return;
        }
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key]);
            this.observe(data[key])
        });
    }
    defineReactive(data, key, value) {
        let self=this;
        let dep=new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            set(newValue) {
                if (newValue !== value) {
                    self.observe(newValue);
                    value = newValue;
                    dep.notify();
                }
            },
            get() {
               Dep.target &&  dep.addSub(Dep.target)
                return value
            },
           

        })
    }
}
class Dep{
    constructor(){
        this.subs=[];
    }
    addSub(watcher){
        this.subs.push(watcher);
    }
    notify(){
        this.subs.forEach(watcher=>{
            console.log(watcher);
            watcher.update()
        })
    }
}