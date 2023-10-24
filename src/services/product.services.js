import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc, getDoc, query, where, setDoc } from "firebase/firestore";

const productCollectionRef = collection(db,"products");

class ProductDataService {
    constructor() {
        this.productCollectionRef = productCollectionRef;
    }

    async getAllProduct() {
        return getDocs(this.productCollectionRef);
    }

    async deleteProduct(id) {
        const productDoc = doc(db,"products",id);
        return deleteDoc(productDoc);
    }

    async addProduct(newProduct) {
        return addDoc(this.productCollectionRef,newProduct);
    }

    async updateProduct(id, updateProduct) {
        const productDoc = doc(db,"products",id);
        return updateDoc(productDoc,updateProduct);
    }

    async getProduct(id) {
        const productDoc = doc(db,"products",id);
        return getDoc(productDoc);
    }    

    async searchProductByTitle(title) {
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(query(productsRef, where('title', '==', title)));
        return querySnapshot;
    }

    async getPendingProducts() {
        const querySnapshot = await getDocs(query(productCollectionRef, where("isApproved", "==", false)));
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    }

    async approveProduct(productId) {
        const productDoc = doc(db, "products", productId);
        const currentTime = new Date().toISOString();
        return updateDoc(productDoc, { isApproved: true ,approvedTime: currentTime});
    }
    
}
export default new ProductDataService();