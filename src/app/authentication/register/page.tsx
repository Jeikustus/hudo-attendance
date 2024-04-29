"use client";

import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputwithlabel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { handleSignUp } from "../functions";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDivision, setUserDivision] = useState("Select division");
  const [error, setError] = useState<string>("");

  const handleDivisionSelect = (divistion: string) => {
    setUserDivision(divistion);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleSignUp(
        userEmail,
        userPassword,
        userFirstName,
        userLastName,
        userDivision,
        setError
      );
    } catch (error) {
      console.error("Error during sign-up:", error);
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
          Create a new account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="pb-2" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 pb-4">
            <div className="flex items-center justify-center space-x-3">
              <InputWithLabel
                label="First Name"
                type="text"
                id="userFirstName"
                placeholder="Mario"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
                required
              />
              <InputWithLabel
                label="Last Name"
                type="text"
                id="userLastName"
                placeholder="Gonzalex"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <DropdownMenu>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Division</Label>
                  <DropdownMenuTrigger className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-muted-foreground items-center">
                    <Building2 />
                    <p className="text-transparent">t</p> {userDivision}
                  </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Division</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDivisionSelect("Admin")}
                  >
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDivisionSelect("Benselcom")}
                  >
                    Benselcom
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDivisionSelect("Planning")}
                  >
                    Planning
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDivisionSelect("Community Organizer")}
                  >
                    Community Organizer
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDivisionSelect("Demolition")}
                  >
                    Demolition
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
              required
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>

          <div>
            <Button className="w-full">Create an account</Button>
          </div>
        </form>
        <div className="mt-10 flex space-x-2 items-center justify-center">
          <p className="text-center text-sm text-gray-500"></p>
          Already have an account?
          <Link href="/authentication/login">
            <p className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
