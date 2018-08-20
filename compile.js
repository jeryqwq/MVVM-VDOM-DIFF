class Compile{
    constructor(el,vm){
        this.el=this.NodeType(el)===3?el:document.querySelector(el);
        this.vm=vm;
        let fragment;
        if(this.el){
            fragment= this.nodeToFragment(this.el);
        }else{
            throw new TypeError("can't find the document or Not a node")
        };
        this.compile(fragment);
        this.el.appendChild(fragment)
    };
   
    NodeType(node){
    return node.nodeType;//节点
    };
compileElement(node){
let attrs=node.attributes;
Array.from(attrs).forEach((attr)=>{
   let attrName=attr.name
   let [,type]=attrName.split('-')
    if(this.isDirective(attrName)){
        let expr=attr.value;
CompileUtil[type](node,this.vm,expr);
// console.log(attr.value)
//todo .....
            }
        })
    };
  
compileText(node){
let exp=node.textContent;
let reg=/\{\{([^}]+)\}\}/g;
if(reg.test(exp)){
    //todo....
    CompileUtil["text"](node,this.vm,exp)
}
};
isDirective(name){
return name.includes('v-');
};
    compile(fragment){
     let childNodes=fragment.childNodes;
     Array.from(childNodes).forEach(element => {
        if(this.NodeType(element)===1){//元素节点
            this.compileElement(element);
            this.compile(element);
        }
       else if(this.NodeType(element)===3){//文档渲染
            this.compileText(element);
        }
    });
    };
    nodeToFragment(el){
    let fragment=document.createDocumentFragment();
    let child;
    while(child=el.firstChild){
        fragment.appendChild(child);
    }
    return fragment;
    }
 
}
CompileUtil={
    getVal(vm,expr){
       let exp= expr.split('.');
        return exp.reduce((prev,next)=>{
           return prev[next];
        },vm.$data)
    },
    getTextVal(vm,expr){
        return expr.replace(/\{\{([^}]+)\}\}/g,(...argument)=>{
            return this.getVal(vm,argument[1]);
        })
    },
    text(node,vm,expr){
    let updateFn=this.updater['textUpdater'];
    let value=this.getTextVal(vm,expr);
    expr.replace(/\{\{([^}]+)\}\}/g,(...argument)=>{
        new Watcher(vm,argument[1],(newValue)=>{
            updateFn && updateFn(node,this.getTextVal(vm,expr))            
        })
    })
    updateFn&&updateFn(node,value)
    },
    model(node,vm,expr){
        let updateFn=this.updater['modelUpdater'];
        new Watcher(vm,expr,(newValue)=>{
            updateFn&&updateFn(node,this.getVal(vm,expr))
        })
        updateFn&&updateFn(node,this.getVal(vm,expr))
    },
    updater:{
        textUpdater(node,text){
    node.textContent=text;
        },
        modelUpdater(node,value){
    node.value=value;
        }
    },
};