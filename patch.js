class Patch {
    constructor(el, allPatches) {
        this.el = el;
        this.allPatches = allPatches;
        this.index = 0;
        this.insertSum=this.getInsertSum();
        this.work(this.el);
    }
    work(el) {
        let currentPatch = this.allPatches[this.index++];
        let children = el.childNodes;
        if(currentPatch){
            this.doPatch(el, currentPatch);
        }
        children.forEach(child => this.work(child));          
      
    }
    getInsertSum(){
        let sum=0;
  this.allPatches.forEach(item=>{
    item.forEach(subitem => {
    if(subitem.TYPE==="INSERT"){
        ++sum;
    }
});
  })
return sum;
    }
doPatch(child,currentPatch){      
currentPatch.forEach(patch => {
    switch (patch.TYPE) {        
        case "TEXT":
            child.textContent=patch.text;
            break;
            case "INSERT":
            console.log(1)
            child.parentNode.appendChild(render(patch.insertNode))
            break;
            case "ATTRS":
            for(let key in child.attrs){
                let value=child.attrs[key];
                if(value){
                    Element.setAttr(child,key,value)
                }else{
                    child.removeAttribute(key)
                }
            }
            break;
            case "REMOVE":
            child.parentNode.removeChild(child);
            break;
            case "REPLACE":
            let newNode=(patch.newNode instanceof Element)?render(patch.newNode):document.createTextNode(patch.newNode);
            child.parentNode.replaceChild(newNode,child);
            break;
        default:
            break;
    }
});

}


}