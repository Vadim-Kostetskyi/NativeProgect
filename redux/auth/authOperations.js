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
  ({ userEmail, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      await updateProfile(user, { displayName: nickname });

      const { uid, displayName, email } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
          email,
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
        };
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChanges({ stateChange: true }));
      });
    });
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

      const { uid, displayName, email } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
          email,
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
