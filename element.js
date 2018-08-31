class Element{
constructor(type,props,children){
this.type=type;
this.props=props;
this.children=children;
}
 static setAttr(node,key,value){
    let tagName=node.tagName;
    switch (key) {
        case "value":
        if(tagName.toUpperCase()==="BUTTON"||tagName.toUpperCase()==="INPUT"||tagName.toUpperCase()==="TEXTAREA"){
           node.value=value;
        }else{
            node.setAttribute(key,value);
        }
        break;
        case 'style':
node.style.cssText=value;
            break;
    case 'className':
    node.setAttribute('class',value);
    break;
        default:
        node.setAttribute(key,value)
            break;
    }
}
}

let render=(vistualDom)=>{//vNode转换为真实Dom
let el=document.createElement(vistualDom.type);
for (let key in vistualDom.props){
Element. setAttr(el,key,vistualDom.props[key]);
}
vistualDom.children.forEach(element => {
   let child=(element instanceof Element)?render(element):document.createTextNode(element);
    el.appendChild(child)
});
return el;
}
let renderDom=(el,target)=>{
document.querySelector(target).appendChild(el);
}
let createElement=(type,props,children)=>{
   return new Element(type,props,children)
}
