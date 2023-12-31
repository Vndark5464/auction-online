import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
    setDoc,
    query,
    where
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
        return doc(db,"Users",id); // Trả về DocumentReference
    }  
    async checkUsernameExists(username) {
        const userSnapshot = await getDocs(query(userCollectionRef, where("username", "==", username)));
        return !userSnapshot.empty;
    }

}
export default new UserDataService;