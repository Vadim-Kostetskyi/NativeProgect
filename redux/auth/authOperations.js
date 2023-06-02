import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../config";
import { authSlice } from "./authReduser";

const { authSignOut, updateUserProfile, authStateChanges } = authSlice.actions;

export const registerDB =
  ({ userEmail, password, nickname, avatar }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      await updateProfile(user, { displayName: nickname, photoURL: avatar });

      const { uid, displayName, email, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
          email,
          photoURL,
        })
      );
    } catch (error) {
      throw error;
    }
  };

export const authStateChanged = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          return;
        }
        const userUpdateProfile = {
          nickname: user.displayName,
          userId: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChanges({ stateChange: true }));
      });
    });
  } catch (error) {
    throw error;
  }
};

export const userProfileUpdate = (update) => async (dispatch, getState) => {
  try {
    const user = await auth.currentUser;

    await updateProfile(user, update);

    const { uid, displayName, email, photoURL } = await auth.currentUser;

    dispatch(
      updateUserProfile({
        userId: uid,
        nickname: displayName,
        email,
        photoURL,
      })
    );
  } catch (error) {
    throw error;
  }
};

export const loginDB =
  ({ userEmail, password }) =>
  async (dispatch, getState) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      const { uid, displayName, email, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
          email,
          photoURL,
        })
      );
      dispatch(authStateChanges({ stateChange: true }));
    } catch (error) {
      throw error;
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  dispatch(authSignOut());
};
