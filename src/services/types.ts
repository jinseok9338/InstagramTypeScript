export interface FirestoreDataType
  extends firebase.default.firestore.DocumentData {
  docId: string;
}

export type commentsType = {
  userId?: string;
  comment?: string;
  posted?: Date;
  displayName?:string | null
};

export type postType = {
  picURL?: string;
  post?: string;
  posted?: Date;
  postId?: string;
  comments?: commentsType[];
  userId?: string;
  likes?: string[]
  userName?: string
  
};

type userInfoType = {
  aboutYou?: string;
  hobby?: string;
  phoneNumber?: string;
  residence?: string;
};

export type profileType = {
  username?: string;
  userId?: string;
  emailAddress?: string;
  following?: string[]; // should have userIds
  followers?: any[]; // should have userIds
  fullName?: string;
  userInfo?: userInfoType;
};

export type profilestype = profileType[];
