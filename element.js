class Element{
constructor(type,props,children){
this.type=type;
this.props=props;
this.children=children;
}
}
function createElement(type,props,children){
    return new Element(type,props,children)
}
function render(eleObj){
let el=document.createElement(eleObj.type);
for (let key in eleObj.props){
    setAttr(el,key,eleObj.props[key])
}
}