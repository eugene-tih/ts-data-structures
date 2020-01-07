import { BinarySearchTree } from "./BinarySearchTree";

describe("BinarySearchTree", () => {
    it("should insert one item", () => {
        const binarySearchTree = new BinarySearchTree<number>();

        binarySearchTree.insert(10);

        expect(binarySearchTree.getSize()).toBe(1);
        expect(binarySearchTree.getHeight()).toBe(0);
    });

    it("should insert bunch of items", () => {
        const binarySearchTree = new BinarySearchTree<number>();

        binarySearchTree
            .insert(10)
            .insert(4)
            .insert(11)
            .insert(3)
            .insert(6);

        expect(binarySearchTree.getSize()).toBe(5);
        expect(binarySearchTree.getHeight()).toBe(2);
    });

    // it("should find an item", () => {
    //     const binaryTree = new BinaryTree<string>();
    //
    //     binaryTree
    //         .insert("Hello")
    //         .insert("World")
    //         .insert("John")
    //         .insert("Wayne");
    //
    //     expect(binaryTree.search("John")!.value).toBe("John");
    // });
    //
    // it("should return `null` if did not find an item", () => {
    //     const binaryTree = new BinaryTree<string>();
    //
    //     binaryTree
    //         .insert("Hello")
    //         .insert("World")
    //         .insert("John")
    //         .insert("Wayne");
    //
    //     expect(binaryTree.search("Ingrid Bergman")).toBeNull();
    // });
    //
    // it("should remove an item", () => {
    //     const binaryTree = new BinaryTree<string>();
    //
    //     binaryTree
    //         .insert("Hello")
    //         .insert("World")
    //         .insert("John")
    //         .insert("Wayne");
    //
    //     binaryTree.remove("John");
    //
    //     expect(binaryTree.search("John")).toBeNull();
    //     expect(binaryTree.getSize()).toBe(3);
    //     expect(binaryTree.getHeight()).toBe(2);
    // });
    //
    // it("should remove a root item", () => {
    //     const binaryTree = new BinaryTree<string>();
    //
    //     binaryTree.insert("Hello");
    //     binaryTree.remove("Hello");
    //
    //     expect(binaryTree.search("Hello")).toBeNull();
    //     expect(binaryTree.getSize()).toBe(0);
    //     expect(binaryTree.getHeight()).toBe(-1);
    // });
    //
    // it("should throw an error if did not remove an item", () => {
    //     const binaryTree = new BinaryTree<string>();
    //
    //     binaryTree.insert("Hello");
    //
    //     expect(() => {
    //         binaryTree.remove("World");
    //     }).toThrowError();
    //     expect(binaryTree.getSize()).toBe(1);
    //     expect(binaryTree.getHeight()).toBe(0);
    // });
    //
    // it("should return items in inOrder order", () => {
    //     const binaryTree = new BinaryTree<string>();
    //
    //     binaryTree
    //         .insert("Hello")
    //         .insert("World")
    //         .insert("John")
    //         .insert("Wayne")
    //         .insert("Clint")
    //         .insert("Eastwood");
    //
    //     expect(binaryTree.traverseInOrder()).toEqual([
    //         "Wayne",
    //         "World",
    //         "Clint",
    //         "Hello",
    //         "Eastwood",
    //         "John"
    //     ]);
    // });
    //
    // it("should return items in preOrder order", () => {
    //     const binaryTree = new BinaryTree<string>();
    //
    //     binaryTree
    //         .insert("Hello")
    //         .insert("World")
    //         .insert("John")
    //         .insert("Wayne")
    //         .insert("Clint")
    //         .insert("Eastwood");
    //
    //     expect(binaryTree.traversePreOrder()).toEqual([
    //         "Hello",
    //         "World",
    //         "Wayne",
    //         "Clint",
    //         "John",
    //         "Eastwood"
    //     ]);
    // });
    //
    // it("should return items in postOrder order", () => {
    //     const binaryTree = new BinaryTree<string>();
    //
    //     binaryTree
    //         .insert("Hello")
    //         .insert("World")
    //         .insert("John")
    //         .insert("Wayne")
    //         .insert("Clint")
    //         .insert("Eastwood");
    //
    //     expect(binaryTree.traversePostOrder()).toEqual([
    //         "Wayne",
    //         "Clint",
    //         "World",
    //         "Eastwood",
    //         "John",
    //         "Hello"
    //     ]);
    // });
});
