"use client";

import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputwithlabel";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { signInWithEmailAndPassword } from "@/config/firebase/firebaseAuthentication";
import { conAuth, conDatabase } from "@/config/firebase/firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(userEmail, userPassword);

      console.log("User signed in successfully");

      const currentUser = conAuth.currentUser;

      const userDocRef = doc(
        conDatabase,
        `users/${currentUser ? currentUser.uid : null}`
      );
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as {
          userAccountStatus: string;
          userAccountType: string;
        };

        const accountStatus = userData.userAccountStatus;
        if (accountStatus === "Pending") {
          window.location.href = "/authentication/account/pending";
        } else if (accountStatus === "Declined") {
          window.location.href = "/authentication/account/declined-account";
        } else if (accountStatus === "Approved") {
          const accountType = userData.userAccountType;
          if (accountType === "Admin") {
            window.location.href = "/dashboard";
          } else if (accountType === "Regular") {
            window.location.href = "/authentication/thankyou";
          } else {
            console.error("Unknown account type:", accountType);
          }
        } else {
          console.error("Unknown account status:", accountStatus);
        }
      }
    } catch (error) {
      setError((error as Error).message);
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-col justify-center items-center bg-foreground">
          <Image
            src="/hudotext.png"
            alt="hudo"
            width={400}
            height={400}
            priority
          />
        </div>
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="pb-2" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 pb-4">
            <InputWithLabel
              label="Email"
              type="email"
              id="email"
              placeholder="your@gmail.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <InputWithLabel
              label="Password"
              type="password"
              id="password"
              placeholder="••••••••"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between pb-6">
            <Label>Forgot Password?</Label>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Sign in to your Account
            </Button>
          </div>
        </form>
        <div className="mt-10 flex space-x-2 items-center justify-center">
          <p className="text-center text-sm text-gray-500"></p>
          Not registered yet?
          <Link href="/authentication/register">
            <p className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
