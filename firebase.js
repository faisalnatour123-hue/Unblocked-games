import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

window.firebaseAuth = auth;
window.firebaseDb = db;

const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Auth State
let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    if (user) {
        // Save user profile
        try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            
            if (!userDoc.exists()) {
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'User'),
                    role: (user.email === 'faisalnatour123@gmail.com') ? 'admin' : 'user',
                    createdAt: new Date()
                };
                if (user.email && !user.email.endsWith('@app.local')) {
                    userData.email = user.email;
                }
                if (user.photoURL) userData.photoURL = user.photoURL;

                await setDoc(userRef, userData);
            } else {
                // Update display name or photo if changed
                const updateData = {};
                const currentData = userDoc.data();
                
                if (user.displayName && user.displayName !== currentData.displayName) {
                    updateData.displayName = user.displayName;
                }
                if (user.photoURL && user.photoURL !== currentData.photoURL) {
                    updateData.photoURL = user.photoURL;
                }
                
                if (Object.keys(updateData).length > 0) {
                    await setDoc(userRef, updateData, { merge: true });
                }
            }
        } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
        }
        
        // Load custom theme if exists
        try {
            const themeDoc = await getDoc(doc(db, 'customThemes', user.uid));
            if (themeDoc.exists()) {
                window.applyCustomTheme(themeDoc.data());
            }
        } catch (error) {
            handleFirestoreError(error, OperationType.GET, `customThemes/${user.uid}`);
        }
    }
    
    // Update UI
    window.updateAuthUI(user);
});

window.signUpWithEmail = async (username, email, password) => {
    try {
        const safeUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');
        const authEmail = email ? email : `${safeUsername}@app.local`;
        
        const userCredential = await createUserWithEmailAndPassword(auth, authEmail, password);
        await updateProfile(userCredential.user, {
            displayName: username
        });
        // Force reload to trigger onAuthStateChanged with new displayName
        await auth.currentUser.reload();
        window.location.reload();
    } catch (error) {
        console.error("Error signing up", error);
        let msg = "Failed to create account.";
        if (error.code === 'auth/email-already-in-use') msg = "Username or Email is already in use.";
        if (error.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
        throw new Error(msg);
    }
};

window.signInWithEmail = async (identifier, password) => {
    try {
        let authEmail = identifier;
        if (!identifier.includes('@')) {
            const safeUsername = identifier.toLowerCase().replace(/[^a-z0-9]/g, '');
            authEmail = `${safeUsername}@app.local`;
        }
        await signInWithEmailAndPassword(auth, authEmail, password);
    } catch (error) {
        let msg = "Invalid username/email or password.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            msg = "Invalid username/email or password.";
        } else {
            console.error("Error signing in", error);
        }
        throw new Error(msg);
    }
};

window.resetPassword = async (identifier) => {
    try {
        let authEmail = identifier;
        if (!identifier.includes('@')) {
            const safeUsername = identifier.toLowerCase().replace(/[^a-z0-9]/g, '');
            authEmail = `${safeUsername}@app.local`;
        }
        
        if (authEmail.endsWith('@app.local')) {
            throw new Error("Cannot reset password for accounts without a real email address.");
        }
        
        await sendPasswordResetEmail(auth, authEmail);
    } catch (error) {
        console.error("Error resetting password", error);
        let msg = "Failed to send reset email.";
        if (error.code === 'auth/user-not-found') msg = "No account found with this email.";
        if (error.code === 'auth/invalid-email') msg = "Invalid email address.";
        if (error.message === "Cannot reset password for accounts without a real email address.") msg = error.message;
        throw new Error(msg);
    }
};

window.signOutUser = async () => {
    try {
        await signOut(auth);
        window.location.reload();
    } catch (error) {
        console.error("Error signing out", error);
    }
};

window.saveCustomThemeToDb = async (themeData) => {
    if (!currentUser) return;
    try {
        const dataToSave = {
            uid: currentUser.uid,
            ...themeData,
            updatedAt: new Date()
        };
        if (!dataToSave.bgImage) {
            delete dataToSave.bgImage;
        }
        await setDoc(doc(db, 'customThemes', currentUser.uid), dataToSave);
        alert("Custom theme saved!");
    } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `customThemes/${currentUser.uid}`);
    }
};

window.rateGame = async (gameId, rating) => {
    if (!currentUser) {
        alert("Please sign in to rate games.");
        return;
    }
    try {
        const ratingId = currentUser.uid + '_' + gameId;
        await setDoc(doc(db, 'ratings', ratingId), {
            uid: currentUser.uid,
            gameId: gameId,
            rating: rating,
            updatedAt: new Date()
        });
    } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `ratings/${currentUser.uid}_${gameId}`);
    }
};

window.getGameRatings = (gameId, callback) => {
    const q = query(collection(db, 'ratings'), where("gameId", "==", gameId));
    return onSnapshot(q, (snapshot) => {
        let sum = 0;
        let count = 0;
        let userRating = 0;
        snapshot.forEach((doc) => {
            const data = doc.data();
            sum += data.rating;
            count++;
            if (currentUser && data.uid === currentUser.uid) {
                userRating = data.rating;
            }
        });
        const average = count > 0 ? (sum / count).toFixed(1) : 0;
        callback({ average, count, userRating });
    }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'ratings');
    });
};

window.loadAdminUsers = async () => {
    const usersList = document.getElementById('admin-users-list');
    if (!usersList) return;
    
    usersList.innerHTML = '<div class="text-center p-4 font-bold text-theme-card" style="color: var(--text-card)">Loading users...</div>';
    
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        if (querySnapshot.empty) {
            usersList.innerHTML = '<div class="text-center p-4 font-bold text-theme-card" style="color: var(--text-card)">No users found.</div>';
            return;
        }
        
        let html = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const emailDisplay = data.email && !data.email.endsWith('@app.local') ? data.email : 'No email (Username login)';
            const roleColor = data.role === 'admin' ? 'bg-purple-600' : 'bg-black';
            
            html += `
                <div class="p-4 border-4 border-black rounded-xl bg-white flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div class="flex items-center gap-4">
                        <img src="${data.photoURL || `https://placehold.co/100x100/000000/FFFFFF?text=${(data.displayName || '?').charAt(0).toUpperCase()}`}" class="w-12 h-12 rounded-full border-2 border-black object-cover" alt="Profile">
                        <div>
                            <div class="font-bold text-lg text-black">${data.displayName || 'Unknown'}</div>
                            <div class="text-sm text-gray-600 font-bold">${emailDisplay}</div>
                        </div>
                    </div>
                    <div class="px-3 py-1 ${roleColor} text-white text-xs font-bold rounded-full uppercase border-2 border-black">
                        ${data.role || 'user'}
                    </div>
                </div>
            `;
        });
        usersList.innerHTML = html;
    } catch (error) {
        console.error("Error loading users:", error);
        usersList.innerHTML = `<div class="text-red-600 font-bold p-4 bg-red-100 border-2 border-red-600 rounded-xl">Error loading users: ${error.message}</div>`;
    }
};
