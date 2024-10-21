class HashMap{
    constructor(initialCapacity = 4, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.size = 0;
        this.loadFactor = loadFactor;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    /*//hash 
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        
    }
    */
}