import { keyValueLinkedList } from "./linkedlist.js";

class HashMap {

    constructor(loadFactor) {
        this.loadFactor = loadFactor; 
        this.capacity = 16;  
        this.buckets = [];
        this.numElts = 0; 

        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = keyValueLinkedList();  
        }  
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    }

    set(key, value) {
        const hashIndex = this.hash(key) % this.capacity;
        const keyIndex = this.buckets[hashIndex].find(key); 
        if (keyIndex === -1) {

            this.buckets[hashIndex].append([key, value]); 
            this.numElts++;
            //rehash
            if ((this.numElts) > this.loadFactor * this.capacity) {
                let allEntries = this.entries();

                this.capacity *= 2; 
                this.buckets = [];
                this.numElts = 0;

                for (let j = 0; j < this.capacity; j++) {
                    this.buckets[j] = keyValueLinkedList();
                }

                allEntries.forEach(elt => {
                    this.set(elt[0], elt[1]);
                });
            } 
        } else {
            this.buckets[hashIndex].replace(keyIndex, [key, value]); 
        }
    }

    get(key) {
        const hashIndex = this.hash(key) % this.capacity; 
        const keyIndex = this.buckets[hashIndex].find(key);
        if (keyIndex === -1) {
            return null;  
        } else {
            return this.buckets[hashIndex].at(keyIndex)[1]; 
        }
    }
    
    has(key) {
        const result = this.get(key); 
        return result !== null; 
    }

    remove(key) {
        const hashIndex = this.hash(key) % this.capacity; 
        const keyIndex = this.buckets[hashIndex].find(key);       

        if (keyIndex === -1) {
            return false; 
        } else {
            this.buckets[hashIndex].removeAt(keyIndex);
            this.numElts--; 
            return true;
        }
    }

    length() {
        return this.numElts; 
    }

    clear() {
        this.buckets = []; 
        this.capacity=16;
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = keyValueLinkedList();  
        }
        this.numElts = 0;
    }

    keys() {
        let keys = []; 

        for (let i = 0; i < this.capacity; i++) {
            keys = keys.concat(this.buckets[i].values().map(elt => elt[0]));
        }
        return keys; 
    }

    values() {
        let keys = []; 

        for (let i = 0; i < this.capacity; i++) {
            keys = keys.concat(this.buckets[i].values().map(elt => elt[1]));
        }
        return keys; 
    }

    entries() {
        let keys = []; 

        for (let i = 0; i < this.capacity; i++) {
            keys = keys.concat(this.buckets[i].values());
        }
        return keys; 
    }
    
    toString() {
        let stringRepr = ``; 

        for (let i = 0; i < this.capacity; i++) {
            stringRepr += `[${i}]: ${this.buckets[i].toString()} \n`; 
        }

        return stringRepr; 
    }
}

const test = new HashMap(0.75);