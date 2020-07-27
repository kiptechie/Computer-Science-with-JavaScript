/*
AVL tree are the answer to the problem that BST have: BST can easily get out of balance. 
Even if it's not the worst case scenario of ascending or descending lists being added, even a random distribution on numbers on a BST is going to pretty heavy in places. 
There are several ways to balance these trees and we're going to tackle one of them: AVL trees. 
AVL is the initials of its authors: Georgy Adelson-Velsky and Evgenii Landis.

AVLs are specialized BSTs. 
That is to say a valid AVL tree is always a valid BST (but not necessarily vice versa.) 
When you add a new value to a AVL tree, you do it the same way. 
The only difference is on the way up your recursive calls you check to see if the node is balanced after you added the new node. 
A tree is out of balance if its subtrees' difference of heights is greater than one.
*/

/*
So what's the benefit of all this extra effort? 
We can now guarantee that we won't hit those bad or worst case scenarios of having greatly out-of-balance trees and guarantee we won't hit the O(n) cases. 
Our worst case becomes O(log n).

So let's go through the hardest part of AVL trees, the rebalances (actually deletes may be harder but we're not going to do them!) 
The basic idea is that if one side of tree gets too heavy (ie the max height of one of its children is two more than the max height of the other child) then we need to perform a rotation to get the tree back in balance. 
Let's take a look at the most basic rotation.


5
 \
  8

-> Currently valid AVL tree
-> .add called with 9

5 - node A
 \
  8 - node B
   \
    9 - node C

(on the way up from the recursion)
-> check balance of node C: left height is 0, right height is 0, balanced
-> check balance of node B: left height is 0, right height is 1, balanced
-> check balance of node A: left height is 0, right height is 2
   unbalanced, right heavy, child is right heavy

-> perform right rotation
-> swap the values of nodes A and B
-> make node B the left child of node A
-> make node C the right child of node A
-> move node B's right child to its left child
   (in this case they're both null)
-> make node A's _original_ left child
   (which was null in this case) the left child of node B
-> update the heights of all the nodes involved

      8 - node A
   /     \
  5        9
node B   node C
                    
This was a right rotation, but a left rotation is mirror of this. This generalized formula works for all but one case which we'll examine now. Even in this special case, all you have to do is perform an extra rotation which you already have the logic for.


5
 \
  8

-> currently valid AVL tree
-> .add called with 7

5 - node A
 \
  8 - node B
 /
7 - node C


(on the way up from the recursion)
-> check balance of node C: left height is 0, right height is 0, balanced
-> check balance of node B: left height is 0, right height is 1, balanced
-> check balance of node A: left height is 0, right height is 2,
   unbalanced, right heavy, child is left heavy
                    
Try performing just a straight right rotation. It's not super helpful because you just end up with a still-unbalanced tree.


  8 - node A'
 /
5 - node B'
 \
  7 node C'
                    
That's a problem, right? So now we have to what's called a double rotation. You perform a double rotation when the opposite child is heavy during a rotation. Look at our example (the 5\8/7 example.) We're doing a right rotation but the left child of the right child is heavy (it's not out of balance, it's just heavier than the right child.) So what we're going to do is before we do a left rotation on the right child before we do a right rotation on the root node of the rotation.


5 - node A
 \
  8 - node B
 /
7 - node C

[ ... previous steps ]
-> check balance of node A: left height is 0, right height is 2
   unbalanced - right heavy, child is left heavy
-> perform left rotation on left heavy right child node B

5 - node A
 \
  7 - node B
   \
    8 - node C

-> now perform right rotation on node A

      7 - node A
   /     \
  5        8
node B   node C
                    
That's it! Nailing down the logic of those rotations is a pain but once you do AVL trees are just a series of either left or right rotations on a BST. Even deletes follow this pattern; it's just in deletes sometimes you have to do even more rotations.
*/

/*
AVL Tree

Name you class/function (anything we can call new on) Tree

I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
trees dues how the function calls must be recursive in order to get the balancing correct.

Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
that structure.

If you have any questions conceptually about balancing the tree, refer to the class website.

There is a tree visualization engine that should run automatically. Make sure you are calling the properties
of the Nodes as follows:
value - integer - the value being store in the tree
left  - Node    - the subtree containing Node's with values less than the current Node's value
right - Node    - the subtree containing Node's with values greater than the current Node's value

As always, you can rename describe to xdescribe to prevent the unit tests from running and the visualization
from displaying

*/

class Tree {
    constructor() {
        this.root = null;
    }
    add(value) {
        if (!this.root) {
            this.root = new Node(value);
        } else {
            this.root.add(value);
        }
    }
    toJSON() {
        return JSON.stringify(this.root.serialize(), null, 4);
    }
    toObject() {
        return this.root.serialize();
    }
}

class Node {
    constructor(value = null, left = null, right = null) {
        this.left = left;
        this.right = right;
        this.value = value;
        this.height = 1;
    }
    add(value) {

        if (value < this.value) {
            // go left

            if (this.left) {
                this.left.add(value);
            } else {
                this.left = new Node(value);
            }
            if (!this.right || this.right.height < this.left.height) {
                this.height = this.left.height + 1;
            }
        } else {
            // go right

            if (this.right) {
                this.right.add(value);
            } else {
                this.right = new Node(value);
            }
            if (!this.left || this.right.height > this.left.height) {
                this.height = this.right.height + 1;
            }
        }
        this.balance();
    }
    balance() {
        const rightHeight = (this.right) ? this.right.height : 0;
        const leftHeight = (this.left) ? this.left.height : 0;

        console.log(this.value, leftHeight, rightHeight);

        if (leftHeight > rightHeight + 1) {
            const leftRightHeight = (this.left.right) ? this.left.right.height : 0;
            const leftLeftHeight = (this.left.left) ? this.left.left.height : 0;

            if (leftRightHeight > leftLeftHeight) {
                this.left.rotateRR();
            }

            this.rotateLL();
        } else if (rightHeight > leftHeight + 1) {
            const rightRightHeight = (this.right.right) ? this.right.right.height : 0;
            const rightLeftHeight = (this.right.left) ? this.right.left.height : 0;

            if (rightLeftHeight > rightRightHeight) {
                this.right.rotateLL();
            }

            this.rotateRR();
        }
    }
    rotateRR() {
        const valueBefore = this.value;
        const leftBefore = this.left;
        this.value = this.right.value;
        this.left = this.right;
        this.right = this.right.right;
        this.left.right = this.left.left;
        this.left.left = leftBefore;
        this.left.value = valueBefore;
        this.left.updateInNewLocation();
        this.updateInNewLocation();
    }
    rotateLL() {
        const valueBefore = this.value;
        const rightBefore = this.right;
        this.value = this.left.value;
        this.right = this.left;
        this.left = this.left.left;
        this.right.left = this.right.right;
        this.right.right = rightBefore;
        this.right.value = valueBefore;
        this.right.updateInNewLocation();
        this.updateInNewLocation();
    }
    updateInNewLocation() {
        if (!this.right && !this.left) {
            this.height = 1;
        } else if (!this.right || (this.left && this.right.height < this.left.height)) {
            this.height = this.left.height + 1;
        } else { //if (!this.left || this.right.height > this.left.height)
            this.height = this.right.height + 1;
        }
    }
    serialize() {
        const ans = { value: this.value };
        ans.left = this.left === null ? null : this.left.serialize();
        ans.right = this.right === null ? null : this.right.serialize();
        ans.height = this.height;
        return ans;
    }
}

// unit tests
// do not modify the below code
describe('AVL Tree', function() {
    it('creates a correct tree', () => {
        const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
        const tree = new Tree();
        nums.map(num => tree.add(num));
        const objs = tree.toObject();
        render(objs, nums);

        expect(objs.value).toEqual(4);

        expect(objs.left.value).toEqual(2);

        expect(objs.left.left.value).toEqual(1);
        expect(objs.left.left.left).toBeNull();
        expect(objs.left.left.right).toBeNull();

        expect(objs.left.right.value).toEqual(3);
        expect(objs.left.right.left).toBeNull();
        expect(objs.left.right.right).toBeNull();

        expect(objs.right.value).toEqual(7);

        expect(objs.right.left.value).toEqual(6);
        expect(objs.right.left.right).toBeNull();

        expect(objs.right.left.left.value).toEqual(5);
        expect(objs.right.left.left.left).toBeNull();
        expect(objs.right.left.left.right).toBeNull();

        expect(objs.right.right.value).toEqual(9);

        expect(objs.right.right.left.value).toEqual(8);
        expect(objs.right.right.left.left).toBeNull();
        expect(objs.right.right.left.right).toBeNull();

        expect(objs.right.right.right.value).toEqual(10);
        expect(objs.right.right.right.left).toBeNull();
        expect(objs.right.right.right.right).toBeNull();
    });
});