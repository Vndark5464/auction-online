import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    addDoc,
    updateDoc,
    getDoc,
    query,
    where,
} from "firebase/firestore";

const productCollectionRef = collection(db,"products");

class ProductDataService {

    getAllProduct = () => {
        return getDocs(productCollectionRef);
    };
    deleteProduct = (id) => {
        const productDoc = doc(db,"products",id);
        return deleteDoc(productDoc);
    };
    addProduct = (newProduct) => {
        return addDoc(productCollectionRef,newProduct);
    };


    updateProduct = (id,updateProductr) => {
        const productDoc = doc(db,"products",id);
        return updateDoc(productDoc,updateDoc);
    };

    getProduct = (id) => {
        const productDoc = doc(db,"products",id);
        return getDoc(productDoc);
    };    


    async searchProductByTitle(title) {
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(query(productsRef, where('title', '==', title)));
        return querySnapshot;
    }
}
export default ProductDataService;