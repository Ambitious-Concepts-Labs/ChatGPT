import { createUserWithEmailAndPassword, getAuth, 
  isSignInWithEmailLink, onAuthStateChanged, sendEmailVerification, 
  sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword, 
  signInWithEmailLink, signInWithPopup, signOut, updateEmail, updatePassword, 
  updateProfile } from "firebase/auth";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

export const firebaseAuth = getAuth();

// Account creation
export const createAccountEmail = (email: string, password: string) => {
  createUserWithEmailAndPassword(firebaseAuth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    return error
  });
}

export const emailSignin = (email: string, password: string) => {
  signInWithEmailAndPassword(firebaseAuth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return error
  });
}

export const firebaseSignOut = () => {
  signOut(firebaseAuth).then(() => {
    // Sign-out successful.
    return 'Sign-out successful'
  }).catch((error) => {
    // An error happened.
    return error
  });
}

export const emailSiginLink = (email: string, actionCodeSettings: any) => {
  sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
    return 'The link was successfully sent. Inform the user. '
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
    return error
  });
}

export const magicLinkSignin = () => {
    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    } else {
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(firebaseAuth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          return result
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          return error
        });
    }
  }
}

export const signInPopUp = () => {
  signInWithPopup(firebaseAuth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

// Firestore Based
export const getAllNestedCollection = async (collection: string) => {
  const allCollection = await getDocs(collectionGroup(db, collection));
  return allCollection;
};

export const setDocument = async (
  session: { user: { id: string; }; },
  primaryCol: string,
  secondaryCol: string,
  docName: string,
  payload: {}
) => {
  await setDoc(
    doc(db, primaryCol, session?.user?.id, secondaryCol, docName),
    payload
  );
};


// User Based
export const getFirebaseUser = () => {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      return user
    } else {
      // User is signed out
      // ...
      console.log('User is signed out')
      return null
    }
  });

}

export const getCurrentFirebaseUser = () => {
  const user = firebaseAuth.currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
    return user
  } else {
    // No user is signed in.
    console.log('No user is signed in.')
    return null
  }
}

export const updateFirebaseUser = (type: string, user: 
  {
    displayName?: string, 
    email?: string,
    photoURL?: string, 
    password?: string
  }) => {
  if (firebaseAuth.currentUser) {
    console.log(firebaseAuth.currentUser, 'dumb')
    switch (type) {
      case 'name':
        if (user.displayName) {
          updateEmail(firebaseAuth.currentUser, user.displayName).then(() => {
            console.log('Display name has been updated!')
            return 'Success'
          }).catch((error) => {
            console.log(`An error occurred: ${error}`)
            return error
          });
        }
        break;
      case 'email':
        if (user.email) {
          updateEmail(firebaseAuth.currentUser, user.email).then(() => {
            console.log('Email has been updated!')
            return 'Success'
          }).catch((error) => {
            console.log(`An error occurred: ${error}`)
            return error
          });
        }
        break;
      case 'photo':
        if (user.photoURL) {
          updateEmail(firebaseAuth.currentUser, user.photoURL).then(() => {
            console.log('Photo has been updated!')
            return 'Success'
          }).catch((error) => {
            console.log(`An error occurred: ${error}`)
            return error
          });
        }
        break;
      case 'password':
        if (user.password) {
          updatePassword(firebaseAuth.currentUser, user.password).then(() => {
            console.log('Password has been updated!')
            return 'Success'
          }).catch((error) => {
            console.log(`An error occurred: ${error}`)
            return error
          });
        }
        break;
      default:
        updateProfile(firebaseAuth.currentUser, user).then(() => {
          console.log('Profile updated!')
          return 'Success'
        }).catch((error) => {
          console.log(`An error occurred: ${error}`)
          return error
        });
        break;
    }

  }
}

export const sendUserEmailVerification = () => {
  if (firebaseAuth.currentUser) {
    sendEmailVerification(firebaseAuth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
      return 'Verification sent'
    });
  }
}

export const sendPasswordReset = (email: string) => {
  sendPasswordResetEmail(firebaseAuth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    return 'Password reset email sent!'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    return error
  });
}