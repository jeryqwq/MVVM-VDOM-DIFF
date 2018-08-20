class Watcher{
    constructor(vm,expr,cb){
this.vm=vm;
this.expr=expr;
this.cb=cb;
this.value=this.get();
    }
    getVal(vm,expr){
        let exp= expr.split('.');
         return exp.reduce((prev,next)=>{
            return prev[next];
         },vm.$data)
     };
     get(){
         Dep.target=this;
        let value= this.getVal(this.vm,this.expr);
        console.log(value);
        
        Dep.target=null;
        return value;
     };
     update(){
let newValue=this.getVal(this.vm,this.expr);
let newValue="chenjie123123"
let oldValue=this.value;
console.log(newValue,oldValue,this.expr)
if(oldValue!==newValue){
    this.cb(newValue);
}
     }
}