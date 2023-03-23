class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  addNode(value, i = null) {
    const newNode = new Node(value);
    let currentNode = this.root;
    let currentIndex = 0;

    if (i === null) {
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
      return true;
    }

    while (currentIndex < i) {
      if (currentNode.next === null) {
        return false;
      }
      currentNode = currentNode.next;
      currentIndex++;
    }
    newNode.next = currentNode.next;
    currentNode.next = newNode;
    return true;
  }

  removeNode(i = null) {
    if (this.root.next === null) {
      return false;
    }

    let currentNode = this.root;
    let previousNode = null;
    let currentIndex = 0;

    if (i === 0) {
      this.root = currentNode.next;
      return true;
    }

    if (i === null) {
      while (currentNode.next !== null) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = null;
      return true;
    }

    while (currentIndex < i) {
      if (currentNode.next === null) {
        return false;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }
    previousNode.next = currentNode.next;
    return true;
  }

  print() {
    const result = [];
    let currentNode = this.root;
    while (currentNode !== null) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log(result.join(', '));
  }
}

let q = new List(1);
q.print();
console.log(q.removeNode(0));
console.log(q.addNode(2));
console.log(q.addNode(3));
console.log(q.addNode(4));
console.log(q.addNode(5));
console.log(q.addNode(6, 1));
q.print();
console.log(q.removeNode(0));
console.log(q.removeNode(10));
console.log(q.removeNode());
q.print();
