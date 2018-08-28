class Diff {
    constructor(oldTree, newTree) {
        this.oldTree = oldTree;
        this.newTree = newTree;
        this.patches = [];
        this.index = 0;
        this.work(this.oldTree, this.newTree, this.index, this.patches);
    }

    work(oldTree, newTree, index, patches) {
        let currentPatch = [];
        // console.log(oldTree,newTree);
        if (!newTree) {
            currentPatch.push({
                TYPE: "DELETE",
                index: index
            })
        } else if (this.isString(oldTree) && this.isString(newTree)) {
            if (oldTree !== newTree) {
                currentPatch.push({
                    TYPE: "TEXT",
                    text: newTree
                });
            }
        } else if (oldTree.type === newTree.type) {
            let attrs = this.diffAttr(oldTree.props, newTree.props);
            if (Object.keys(attrs).length > 0) {
                currentPatch.push({
                    TYPE: "ATTRS",
                    attrs
                });
            }
            this.diffChildren(oldTree.children, newTree.children, index, patches);
        } else {
            currentPatch.push({
                TYPE: "REPLACE",
                newTree
            });
        }
        if (currentPatch.length > 0) {
            this.patches[index] = currentPatch;
        }
    }
    isString(node) {
        return Object.prototype.toString.call(node) === "[object String]"
    }
    diffChildren(oldChildren, newChildren, patches) {
        oldChildren.forEach((child, i) => {
            this.work(child, newChildren[i], ++this.index, patches)
        });
        this.addInsertNode(oldChildren, newChildren);

    }
                  //todo newChildren新增节点
    addInsertNode(oldChildren,newChildren){
        console.log( newChildren)
              if(newChildren){
              if (newChildren.length > oldChildren.length) {
                let currentPatch = [];
                for (var key in newChildren) {
                    if (key> oldChildren.length-1) {
                        let index = this.patches.length - 1;
                        currentPatch.push({
                            TYPE: "INSERT",
                            insertNode: newChildren[key]
                        })
                        this.patches[index] = currentPatch;
                    }
                }
            }
        }
    }
    diffAttr(oldAttrs, newAttrs) {
        let patches = {};

        for (var key in oldAttrs) {
            if (oldAttrs[key] !== newAttrs[key]) {
                patches[key] = newAttrs[key];
            }
        }
        for (key in newAttrs) {
            if (!oldAttrs.hasOwnProperty(key)) {
                patches[key] = newAttrs[key];
            }
        }
        return patches;
    }
}
let diffPatches = (oldElement, newElement) => {
    return new Diff(oldElement, newElement).patches;
}
