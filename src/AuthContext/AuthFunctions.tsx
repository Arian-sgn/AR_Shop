// AuthFunctions.tsx
import React, { useEffect, useState } from "react";
import type { User, AuthError } from "firebase/auth";
import {
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/config";
import { AuthContext } from "./Context";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthProvider = ( {children} : { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const saveUserToFirestore = async (firebaseUser: User) => {
    try {
      await setDoc(
        doc(db, "users", firebaseUser.uid),
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          lastLogin: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      console.log("✅ کاربر در Firestore ذخیره شد");
    } catch (error) {
      console.error("❌ خطا در ذخیره کاربر:", error);
    }
  };

  // ✅ تشخیص موبایل
  const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // ✅ تشخیص in-app browser (تلگرام، اینستاگرام و...)
  const isInAppBrowser = (): boolean => {
    const ua = navigator.userAgent || navigator.vendor;
    return /FBAN|FBAV|Instagram|Telegram|Twitter|Line|WhatsApp|Snapchat/i.test(ua);
  };

  // login
  const loginWithGoogle = async () => {
    try {
      console.log("🚀 شروع ورود با گوگل...");
      console.log("📱 موبایل:", isMobile());
      console.log("📲 In-app browser:", isInAppBrowser());

      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("✅ ورود با Popup موفق:", result.user.email);
        await saveUserToFirestore(result.user);
        return;
      } catch (popupError) {
        const error = popupError as AuthError;
        console.log("⚠️ Popup failed:", error.code);

        // اگه popup block شده یا مشکل داشت، برو سراغ redirect
        if (
          error.code === "auth/popup-blocked" ||
          error.code === "auth/popup-closed-by-user" ||
          error.code === "auth/cancelled-popup-request"
        ) {
          console.log("🔄 تلاش با Redirect...");
          await signInWithRedirect(auth, googleProvider);
          return;
        }

        // اگه خطای دیگه‌ای بود، throw کن
        throw error;
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error("❌ خطا در ورود:", authError);
      
      // ✅ پیام خطای بهتر برای in-app browser
      if (isInAppBrowser()) {
        alert("لطفاً این لینک را در مرورگر اصلی (Chrome یا Safari) باز کنید.\n\nروی ⋮ یا ... بزنید و 'Open in Browser' را انتخاب کنید.");
      } else {
        alert("خطا در ورود. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("✅ خروج موفق");
    } catch (error) {
      console.error("❌ خطا در خروج:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        console.log("🔍 چک کردن redirect result...");
        const result = await getRedirectResult(auth);
        
        if (result?.user) {
          console.log("✅ ورود از redirect:", result.user.email);
          if (isMounted) {
            await saveUserToFirestore(result.user);
          }
        }
      } catch (error) {
        console.log("ℹ️ No redirect result",error);
      }
    };

    // ✅ Safety timeout
    const timeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn("⚠️ Timeout - loading forced to false");
        setLoading(false);
      }
    }, 5000);

    // ✅ Auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("🔄 Auth state:", currentUser?.email || "null");
      
      if (isMounted) {
        setUser(currentUser);
        if (currentUser) {
          await saveUserToFirestore(currentUser);
        }
        setLoading(false);
      }
    });

    initAuth();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl font-medium text-gray-700">در حال بارگذاری</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};