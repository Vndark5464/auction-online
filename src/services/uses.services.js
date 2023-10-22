import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
    setDoc
} from "firebase/firestore";

const userCollectionRef = collection(db,"Users");

class UserDataService {

    getAllUser = () => {
        return getDocs(userCollectionRef);
    };
    deleteUser = (id) => {
        const useDoc = doc(db,"Users",id);
        return deleteDoc(useDoc);
    };
    addUsers = (uid,newUser) => {
        const userDocRef = doc(db,"Users",uid);
        return setDoc(userDocRef,newUser);
    };
    updateUser = (id,updateUser) => {
        const useDoc = doc(db,"Users",id);
        return updateDoc(useDoc,updateUser);
    };

    getUser = (id) => {
        const useDoc = doc(db,"Users",id);
        return getDoc(useDoc);
    }    
}
export default new UserDataService;