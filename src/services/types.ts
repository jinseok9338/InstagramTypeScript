export interface FirestoreDataType
    extends firebase.default.firestore.DocumentData {
    docId: string;
}



export type profileType = {
    docId: string;
    username?: string;
    userId?: string;
}[];
