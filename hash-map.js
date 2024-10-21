class HashMap {
  constructor(initialCapacity = 4, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  // Hash function
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity; // Apply modulo during iteration to prevent overflow
    }
    return hashCode;
  }

  // Set key-value pair
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key exists, and update the value if so
    for (let entry of bucket) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }

    // Otherwise, add the new key-value pair
    bucket.push([key, value]);
    this.size++;

    // Check if we need to resize
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  // Get value by key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let entry of bucket) {
      if (entry[0] === key) {
        return entry[1];
      }
    }

    return null; // Key not found
  }

  // Check if key exists in the map
  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let entry of bucket) {
      if (entry[0] === key) {
        return true;
      }
    }

    return false;
  }

  // Remove a key-value pair
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false; // Key not found
  }

  // Return the number of key-value pairs
  length() {
    return this.size;
  }

  // Clear the entire hash map
  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // Return an array of all keys
  keys() {
    const keysArray = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        keysArray.push(entry[0]);
      }
    }
    return keysArray;
  }

  // Return an array of all values
  values() {
    const valuesArray = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        valuesArray.push(entry[1]);
      }
    }
    return valuesArray;
  }

  // Return an array of [key, value] pairs
  entries() {
    const entriesArray = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        entriesArray.push(entry);
      }
    }
    return entriesArray;
  }

  // Resize the buckets when the load factor is exceeded
  resize() {
    const oldBuckets = this.buckets;
    this.capacity = this.capacity * 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}


class HashSet {
  constructor(initialCapacity = 4, loadFactor = 0.75) {
    this.map = new HashMap(initialCapacity, loadFactor);
  }

  // Add a key to the set
  add(key) {
    this.map.set(key, true); // We just need to store the key, value is irrelevant
  }

  // Check if the set contains the key
  has(key) {
    return this.map.has(key);
  }

  // Remove a key from the set
  remove(key) {
    return this.map.remove(key);
  }

  // Return the size of the set
  size() {
    return this.map.length();
  }

  // Clear the set
  clear() {
    this.map.clear();
  }

  // Return an array of all keys
  keys() {
    return this.map.keys();
  }
}
