const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_q, ...queries] = input.split('\n');

class Bag {
  root = new Node(Infinity);
  incremented = BigInt(0);
  put(x) {
    let node = this.root, prev = null;
    while(node != null && node.val < x) {
      prev = node;
      node = node.next;
    }
    prev.next = new Node(x, node);
  }
  increment(x) {
    this.incremented += BigInt(x);
  }
  throwMin() {
    const min = this.root.next;
    this.root.next = min.next;
    return (min.val + this.incremented).toString();
  }
}

class AvlTree {
  _root = null;
  _size = 0;

  insert(x) {
    this._root = this._insert(x, this._root);
    this._size++;
  }

  _insert(x, root) {
    if (root === null) return new Node(x);
    if (x <= root.val) root.left = this._insert(x, root.left);
    else root.right = this._insert(x, root.right);

    // Update height and rebalance tree
    root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
    var balanceState = getBalanceState(root);

    if (balanceState === BalanceState.UNBALANCED_LEFT) {
      if (x <= root.left.val) {
        // Left left case
        root = root.rotateRight();
      } else {
        // Left right case
        root.left = root.left.rotateLeft();
        return root.rotateRight();
      }
    }

    if (balanceState === BalanceState.UNBALANCED_RIGHT) {
      if (x > root.right.val) {
        // Right right case
        root = root.rotateLeft();
      } else {
        // Right left case
        root.right = root.right.rotateRight();
        return root.rotateLeft();
      }
    }

    return root;
  }
  
  delete(x) {
    this._root = this._delete(x, this._root);
    this._size--;
  }

  _delete(x, root) {
  // Perform regular BST deletion
  if (root === null) {
    this._size++;
    return root;
  }

  if (this._compare(key, root.key) < 0) {
    // The key to be deleted is in the left sub-tree
    root.left = this._delete(key, root.left);
  } else if (this._compare(key, root.key) > 0) {
    // The key to be deleted is in the right sub-tree
    root.right = this._delete(key, root.right);
  } else {
    // root is the node to be deleted
    if (!root.left && !root.right) {
      root = null;
    } else if (!root.left && root.right) {
      root = root.right;
    } else if (root.left && !root.right) {
      root = root.left;
    } else {
      // Node has 2 children, get the in-order successor
      var inOrderSuccessor = minValueNode(root.right);
      root.key = inOrderSuccessor.key;
      root.value = inOrderSuccessor.value;
      root.right = this._delete(inOrderSuccessor.key, root.right);
    }
  }

  if (root === null) {
    return root;
  }

  // Update height and rebalance tree
  root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
  var balanceState = getBalanceState(root);

  if (balanceState === BalanceState.UNBALANCED_LEFT) {
    // Left left case
    if (getBalanceState(root.left) === BalanceState.BALANCED ||
        getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
      return root.rotateRight();
    }
    // Left right case
    if (getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
      root.left = root.left.rotateLeft();
      return root.rotateRight();
    }
  }

  if (balanceState === BalanceState.UNBALANCED_RIGHT) {
    // Right right case
    if (getBalanceState(root.right) === BalanceState.BALANCED ||
        getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
      return root.rotateLeft();
    }
    // Right left case
    if (getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
      root.right = root.right.rotateRight();
      return root.rotateLeft();
    }
  }

  return root;
};

/**
 * Gets the value of a node within the tree with a specific key.
 *
 * @param {Object} key The key being searched for.
 * @return {Object} The value of the node or null if it doesn't exist.
 */
AvlTree.prototype.get = function (key) {
  if (this._root === null) {
    return null;
  }

  return this._get(key, this._root).value;
};

/**
 * Gets the value of a node within the tree with a specific key.
 *
 * @private
 * @param {Object} key The key being searched for.
 * @param {Node} root The root of the tree to search in.
 * @return {Object} The node or null if it doesn't exist.
 */
AvlTree.prototype._get = function (key, root) {
  var result = this._compare(key, root.key);

  if (result === 0) {
    return root;
  }

  if (result < 0) {
    if (!root.left) {
      return null;
    }
    return this._get(key, root.left);
  }

  if (!root.right) {
    return null;
  }
  return this._get(key, root.right);
};

/**
 * Gets whether a node with a specific key is within the tree.
 *
 * @param {Object} key The key being searched for.
 * @return {boolean} Whether a node with the key exists.
 */
AvlTree.prototype.contains = function (key) {
  if (this._root === null) {
    return false;
  }

  return !!this._get(key, this._root);
};

/**
 * @return {Object} The minimum key in the tree.
 */
AvlTree.prototype.findMinimum = function () {
  return minValueNode(this._root).key;
};

/**
 * Gets the minimum value node, rooted in a particular node.
 *
 * @private
 * @param {Node} root The node to search.
 * @return {Node} The node with the minimum key in the tree.
 */
function minValueNode(root) {
  var current = root;
  while (current.left) {
    current = current.left;
  }
  return current;
}

/**
 * @return {Object} The maximum key in the tree.
 */
AvlTree.prototype.findMaximum = function () {
  return maxValueNode(this._root).key;
};

/**
 * Gets the maximum value node, rooted in a particular node.
 *
 * @private
 * @param {Node} root The node to search.
 * @return {Node} The node with the maximum key in the tree.
 */
function maxValueNode(root) {
  var current = root;
  while (current.right) {
    current = current.right;
  }
  return current;
}

/**
 * @return {number} The size of the tree.
 */
AvlTree.prototype.size = function () {
  return this._size;
};

/**
 * @return {boolean} Whether the tree is empty.
 */
AvlTree.prototype.isEmpty = function () {
  return this._size === 0;
};

/**
 * Represents how balanced a node's left and right children are.
 *
 * @private
 */
var BalanceState = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

/**
 * Gets the balance state of a node, indicating whether the left or right
 * sub-trees are unbalanced.
 *
 * @private
 * @param {Node} node The node to get the difference from.
 * @return {BalanceState} The BalanceState of the node.
 */
function getBalanceState(node) {
  var heightDifference = node.leftHeight() - node.rightHeight();
  switch (heightDifference) {
    case -2: return BalanceState.UNBALANCED_RIGHT;
    case -1: return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
    case 1: return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
    case 2: return BalanceState.UNBALANCED_LEFT;
    default: return BalanceState.BALANCED;
  }
}

class Node {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.height = null;
    this.val = val;
  }
  rotateRight() {
    const other = this.left;
    this.left = other.right;
    other.right = this;
    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
    other.height = Math.max(other.leftHeight(), this.height) + 1;
    return other;
  }
  rotateLeft() {
    var other = this.right;
    this.right = other.left;
    other.left = this;
    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
    other.height = Math.max(other.rightHeight(), this.height) + 1;
    return other;
  }
  leftHeight() {
    if (!this.left) return -1;
    return this.left.height;
  }
  rightHeight = function () {
    if (!this.right) return -1;
    return this.right.height;
  }
}

const bag = new Bag();
for (let query of queries) {
  const [p, x] = query.split(' ').map(y => parseInt(y));
  if (p === 1) bag.put(x);
  else if (p === 2) bag.increment(x);
  else if (p === 3) console.log(bag.throwMin());
}