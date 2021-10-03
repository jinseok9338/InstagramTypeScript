import {firebase} from "../lib/firebase"
import { getUserByUserId } from "./users"

export const Addfollowing = async (LoggedInUserId: string, followingUserId: string) => {
    // Update following array and return something When LoggedInUser follows followingUserId
    // I need a way to toggle this...
    try {
        const user = await getUserByUserId(LoggedInUserId)
        await firebase.firestore().collection("users").doc(LoggedInUserId).update({ ...user, following: [followingUserId, ...user.following!] })
        const followedUser = await getUserByUserId(followingUserId)
        await firebase.firestore().collection("users").doc(followingUserId).update({ ...followedUser, followers: [LoggedInUserId, ...followedUser.followers!] })
        console.log("successfully Updated followers")
    } catch (e) {
        console.error(e)
    }
} 
 
export const SubtractFollowing = async (LoggedInUserId: string, followingUserId: string) => {
    try {
        const user = await getUserByUserId(LoggedInUserId)
        const { following } = user;
        const newFollowing = following?.filter((id) => id !== followingUserId)
        await firebase.firestore().collection("users").doc(LoggedInUserId).update({ ...user, following: newFollowing })
        const followedUser = await getUserByUserId(followingUserId)
        const { followers } = followedUser
        const newFollowers = followers?.filter((id) => id !== LoggedInUserId)
        await firebase.firestore().collection("users").doc(followingUserId).update({ ...followedUser, followers: newFollowers })
        console.log("successfully Updated followers")
    } catch (e) {
        console.error(e)
    }
}

export const AlreadyFollowing = async (LoggedInUserId: string, followingUserId: string): Promise<boolean> => {
    const { following } = await getUserByUserId(LoggedInUserId)
    if (following?.includes(followingUserId)) {
        return true
    }
    return false
}

export const ToggleFollowing = async(LoggedInUserId: string, followingUserId: string) => {
    const AreadyFollowing = await AlreadyFollowing(LoggedInUserId, followingUserId)
    if (AreadyFollowing) {
        SubtractFollowing(LoggedInUserId, followingUserId)
    } else {
        Addfollowing(LoggedInUserId, followingUserId)
    }
}

