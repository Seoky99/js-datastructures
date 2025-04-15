function Node(value, left=null, right=null) {
    return {
        value, left, right
    }
}

function Tree(initialArr) {
    let root = null; 
    let _initialArr = initialArr;

    function removeDuplicates(arr) {
        const seen = new Set(); 
        const newArr = []; 

        arr.forEach(elt => {
            if (!seen.has(elt)) {
                newArr.push(elt); 
                seen.add(elt);
            }
        })

        return newArr; 
    }

    function prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    function buildTree(arr) {
        const newArr = removeDuplicates(arr.sort((a,b) => a - b));  
        root = buildTreeHelper(newArr, 0, newArr.length - 1);
        prettyPrint(root);
    }

    function buildTreeHelper(arr, lIndex, rIndex) {
        if (lIndex > rIndex) {
            return null; 
        }

        if (lIndex === rIndex) {
            return Node(arr[lIndex]);
        }

        const m = Math.floor((lIndex + rIndex) / 2); 
        let root = Node(arr[m]); 
        root.left = buildTreeHelper(arr, lIndex, m-1);
        root.right = buildTreeHelper(arr, m+1, rIndex);
        
        return root; 
    }

    function insert(value) {
        console.log(root);
        root = insertHelper(root, value);
        prettyPrint(root);
    }

    function insertHelper(root, value) {

        if (root === null) {
            return Node(value); 
        }

        if (value > root.value) {
            root.right = insertHelper(root.right, value); 
        } else if (value < root.value) {
            root.left = insertHelper(root.left, value);
        } else {
            throw new Error("Duplicates not allowed.");
        }
        return root;         
    }

    function deleteItem(value) {
        root = deleteItemHelper(root, value); 
        prettyPrint(root);
    }

    function deleteItemHelper(root, value) {

        if (root === null) {
            return null;
        }

        if (value > root.value) {
            root.right = deleteItemHelper(root.right, value); 
        } else if (value < root.value) {
            root.left = deleteItemHelper(root.left, value); 
        } else {

            if (root.right === null && root.left === null) {
                return null; 
            } else if (root.right === null) {
                return root.left; 
            } else if (root.left === null) {
                return root.right;
            } else {

                let currNode = root.left; 
                while (currNode.right !== null) {
                    currNode = currNode.right; 
                }

                root.value = currNode.value; 
                root.left = deleteItemHelper(root.left, currNode.value); 
            }
        }
        return root; 
    }

    function find(value) {
        return findHelper(root, value);
    }

    function findHelper(root, value) {
        if (root === null) {
            return null; 
        }

        let result = null; 
            
        if (value > root.value) {
            result = findHelper(root.right, value); 
        } else if (value < root.value) {
            result = findHelper(root.left, value); 
        } else {
            result = root; 
        }
        return result;
    }
    function levelOrder(callback) {
        if (callback === null) {
            throw new Error("Callback is required.");
        }

        if (root === null) {
            return null; 
        }

        const queue = []; 
        queue.push(root);

        while (queue.length !== 0) {
            const curr = queue.shift(); 

            callback(curr); 

            if (curr.left !== null) {
                queue.push(curr.left); 
            }

            if (curr.right !== null) {
                queue.push(curr.right); 
            }
        }
    }

    function inOrder(callback) {
        if (callback === null) {
            throw new Error("Callback is required.");
        }

        inOrderHelper(root, callback); 
    }

    function inOrderHelper(root, callback) {
        if (root === null) {
            return; 
        }
        inOrderHelper(root.left, callback); 
        callback(root); 
        inOrderHelper(root.right, callback);
    }

    function preOrder(callback) {
        if (callback === null) {
            throw new Error("Callback is required.");
        }
        preOrderHelper(root, callback); 
    }

    function preOrderHelper(root, callback) {
        if (root === null) {
            return; 
        }
        callback(root); 
        preOrderHelper(root.left, callback); 
        preOrderHelper(root.right, callback);
    }

    function postOrder(callback) {
        if (callback === null) {
            throw new Error("Callback is required.");
        }
        postOrderHelper(root, callback); 
    }

    function postOrderHelper(root, callback) {
        if (root === null) {
            return; 
        }
        postOrderHelper(root.left, callback); 
        postOrderHelper(root.right, callback);
        callback(root); 
    }

    function height(value) {
        const result = find(value);
        
        if (result === null) {
            return null; 
        }
    
        return heightHelper(result); 
    }

    function heightHelper(root) {
        if (root == null) {
            return -1; 
        }

        return 1 + Math.max(heightHelper(root.left), heightHelper(root.right));
    }

    function depth(value) {
        const result = find(value);
        if (result === null) {
            return null; 
        }
        return depthHelper(root, value);
    }

    function depthHelper(root, value) {
        if (root === null) {
            return -1; 
        }

        if (root.value === value) {
            return 0; 
        }

        const leftDepth = depthHelper(root.left, value);  
        const rightDepth = depthHelper(root.right, value);  


        if (leftDepth !== -1 || rightDepth !== -1) {
            return 1 + Math.max(leftDepth, rightDepth);
        } else {
            return -1; 
        }
    }

    function isBalanced() {
        return isBalancedHelper(root)[0];
    }

    function isBalancedHelper(root) {

        if (root === null) {
            return [true, 0];
        }

        const [leftBalanced, leftHeight] = isBalancedHelper(root.left); 
        const [rightBalanced, rightHeight] = isBalancedHelper(root.right); 
        const newHeight = 1 + Math.max(rightHeight, leftHeight);
        const newCondition = leftBalanced && rightBalanced && (Math.abs(rightHeight - leftHeight)) <= 1; 

        return [newCondition, newHeight]
    }

    function rebalance() {
        let newArr = [];
        postOrder((root) => {newArr.push(root.value)});
        buildTree(newArr);
    }

    return { buildTree, insert, deleteItem, find, levelOrder, inOrder, preOrder, postOrder, height, depth, isBalanced, rebalance }
}

const tree = Tree(); 

function createRandomNumbers() {
    const arr = []; 
    
    for (let i = 0; i < 100; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }

    return arr; 
}

/*tree.buildTree(createRandomNumbers());
console.log(tree.isBalanced());
tree.insert(100); 
tree.insert(101);
console.log(tree.isBalanced());
tree.rebalance(); */