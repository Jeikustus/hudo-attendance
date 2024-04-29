"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/config/firebase/firebaseAuthentication";
import { useFetchUserData } from "@/config/firebase/firebaseFetchUser";
import Image from "next/image";

const ThankYouPage = () => {
  const userData = useFetchUserData();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <Image
          src="/thanks.svg"
          alt="thanks"
          width={450}
          height={450}
          priority
        />{" "}
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">
          Thank you! {userData && userData.userDisplayName}
        </h1>
        <p className="p-4 font-medium text-base text-center">
          Your information will be stored in a private database provided by
          Hudo. Your information is safe and will be used for the attendance
          system.
        </p>
        <Button onClick={logoutUser}>Logout</Button>
      </div>
    </div>
  );
};

export default ThankYouPage;
