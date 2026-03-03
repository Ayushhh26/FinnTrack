import React, { useContext } from "react";
import Image from "next/image";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function SignIn() {
  const { googleLoginHandler } = useContext(authContext);

  return (
    <main className="w-full min-w-0 max-w-2xl mx-auto px-4 sm:px-6">
      <h1 className="mb-6 text-5xl font-bold text-center">Welcome 👋</h1>
      <Card className="flex flex-col overflow-hidden p-0">
        <div className="relative h-52 w-full">
          <Image
            src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg"
            alt="Finance tracking illustration"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        </div>
        <div className="px-4 py-4">
          <h3 className="text-xl text-center">
            Please sign in to continue
          </h3>
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={googleLoginHandler}
              className="gap-2"
            >
              <FcGoogle className="text-xl" />
              <span>Sign in with Google</span>
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}

export default SignIn