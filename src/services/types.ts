export interface FirestoreDataType
  extends firebase.default.firestore.DocumentData {
  docId: string;
}

type commentsType = {
  userId?: string;
  comment?: string;
  posted?: Date;
}

type postType = {
  picURL?: string
  post?: string
  posted?: Date;
  comments?: commentsType[]
}

type userInfoType = {
  aboutYou?: string
  hobby?: string
  phoneNumber?: string
  residence?: string
}

export type profileType = {
  docId?: string;
  username?: string;
  userId?: string;
  emailAddress?: string;
  following?: string[] // should have userIds
  followers?: any[] // should have userIds
  fullName?: string
  posts?: postType[]
  userInfo?: userInfoType
};

export type profilestype = profileType[]

