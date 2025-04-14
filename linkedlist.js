function Node(value=null, nextNode=null) {
    return {value, nextNode}; 
}

function LinkedList() {

    let numElements = 0; 
    let head = null; 
    let tail = null; 

    function append(value) {
        let newNode = Node(value); 

        if (head == null) {
            head = newNode;
            tail = newNode; 
        } else {
            tail.nextNode = newNode; 
            tail = newNode;
        }

        numElements++; 
    }

    function prepend(value) {
        let newNode = Node(value); 

        if (head == null) {
            head = newNode; 
            tail = newNode;
        } else {
            newNode.nextNode = head; 
            head = newNode; 
        }

        numElements++; 
    }

    function size() {
        return numElements;
    }

    function getHead() {
        return head; 
    }

    function getTail() {
        return tail; 
    }

    function at(index) {
        if (head == null || index > numElements-1 || index < 0) {
            return null; 
        }
        let curr = 0; 
        let currNode = head; 

        while (curr < index) {
            currNode = currNode.nextNode;  
            curr++; 
        }
        return currNode.value; 
    }

    function pop() {

        if (numElements === 0) { return }

        if (numElements === 1) {
            head = null;
            tail = null;
        } else {
            let currNode = head; 

            while (currNode.nextNode !== tail) {
                currNode = currNode.nextNode; 
            }

            tail = currNode; 
            tail.nextNode = null; 
        }

        numElements--;
    }

    function contains(value) {

        let currNode = head; 

        while (currNode !== null) {
            if (currNode.value === value) {
                return true;
            }

            currNode = currNode.nextNode; 
        }

        return false; 
    }

    function find(value) {

        let index = 0;
        let currNode = head; 

        while (currNode !== null) {
            if (currNode.value === value) {
                return index; 
            }

            currNode = currNode.nextNode; 
            index++;
        }
        return null;
    }

    function toString() {

        let currNode = head; 
        let stringRepr = ``; 

        while (currNode != null) {
            stringRepr += `( ${currNode.value} ) -> `;
            currNode = currNode.nextNode; 
        }

        stringRepr += `null`;
        return stringRepr; 
    }

    function replace(index, newValue) {
        if (index >= numElements || index < 0) {
            return;
        }
        
        let currNode = head; 

        for (let i = 0; i < index; i++) {
            currNode = currNode.nextNode; 
        }

        currNode.value = newValue; 
    }

    function insertAt(value, index) {
        if (index >= numElements || index < 0) {
            return;
        }

        const insertedNode = Node(value); 

        if (index === 0) {
            insertedNode.nextNode = head; 
            head = insertedNode;
            if (numElements === 0) {
                tail = insertedNode; 
            }
            numElements++;
            return; 
        }

        let currIndex = 0; 
        let currNode = head; 

        while (currIndex < index-1) {
            currIndex++; 
            currNode = currNode.nextNode; 
        }

        const nextNode = currNode.nextNode;  
        currNode.nextNode = insertedNode; 
        insertedNode.nextNode = nextNode; 

        if (index === numElements) {
            tail = insertedNode; 
        }

        numElements++;
    }

    function removeAt(index) {
        if (index >= numElements || index < 0) {
            return; 
        }

        if (index === 0) {
            head = head.nextNode; 
            if (numElements===1) {
                tail = null; 
            }
            numElements--;
            return; 
        }

        let currIndex = 0; 
        let currNode = head; 

        while (currIndex < index-1) {
            currIndex++;    
            currNode = currNode.nextNode; 
        }

        const nextNode = currNode.nextNode.nextNode;
        currNode.nextNode = nextNode; 
        
        if (index === numElements-1) {
            tail = currNode; 
        }

        numElements--; 
    }

    function values() {

        if (numElements === 0) {
            return [];
        }

        const values = [];
        let currNode = head; 

        while (currNode != null) {
            values.push(currNode.value);
            currNode = currNode.nextNode;
        }

        return values; 
    }

    return {append, prepend, size, getHead, getTail, at, pop, contains, find, toString, replace, insertAt, removeAt, values};
}

function keyValueLinkedList() {
    let ll = LinkedList(); 

    function find(key) {
        let index = 0;
        let currNode = ll.getHead(); 

        while (currNode !== null) {
            let nodeKey = currNode.value[0]; 
            if (nodeKey === key) {
                return index; 
            }
            currNode = currNode.nextNode; 
            index++;
        }
        return -1;
    }

    return {
        append: ll.append,
        prepend: ll.prepend,
        size: ll.size,
        getHead: ll.getHead,
        getTail: ll.getTail,
        at: ll.at,
        pop: ll.pop,
        contains: ll.contains,
        find,
        toString: ll.toString,
        replace: ll.replace,
        insertAt: ll.insertAt,
        removeAt: ll.removeAt,
        values: ll.values,
      };
    
    }

export { keyValueLinkedList, Node }; 