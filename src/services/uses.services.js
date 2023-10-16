import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    addDoc,
    updateDoc,
    getDoc
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
    addUsers = (newUser) => {
        return addDoc(userCollectionRef,newUser);
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
export default UserDataService;