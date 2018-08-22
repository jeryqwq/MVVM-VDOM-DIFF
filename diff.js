class Diff{
constructor(oldTree,newTree){
    this.oldTree=oldTree;
    this.newTree=newTree;
    this.patches={};
    let index=0;
    this.work(this.oldTree,this.newTree,index,this.patches);
}
work(oldTree,newTree,index,patches){
let currentPatch=[];
if(oldTree.type===newTree.type){
    let attrs=this.diffAttr(oldTree.props,newTree.props);
    if(Object.keys(attrs).length>0){
currentPatch.push({TYPE:"ATTRS",attrs});
    }
}
this.diffChildren(oldTree.children,newTree.children);
if(currentPatch.length>0){
    patches[index]=currentPatch;
}
}
diffChildren(oldChildren,newChildren){
let currentPatch=[];
console.log(arguments);
oldChildren.forEach((child,index) => {
    if(child.type===newChildren[index].type){
        let patch= this.diffAttr(child.props,newChildren[index].props);
console.log(patch);
     }
});

}
diffAttr(oldAttrs,newAttrs){
let patches={};

for (var key in oldAttrs){
if(oldAttrs[key]!==newAttrs[key]){
    patches[key]=newAttrs[key];
         }
   }
   for(key in newAttrs){
       if(!oldAttrs.hasOwnProperty(key)){
           patches[key]=newAttrs[key];
       }
   }
return patches;
}
}
