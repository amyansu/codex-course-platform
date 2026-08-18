import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import Appbar from "@/components/Appbar";

function Signup() {
  return (
    <div className="min-h-screen bg-black">
      <Appbar />
      <div className="pt-10 flex justify-center">
        <Card className="w-[35%] bg-gray-900 text-white p-4 rounded-md">
          <CardHeader>
            <CardTitle className="text-2xl py-2">Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="name">Name</Label>
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-11 text-base"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11 text-base"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="phone">Phone (optional)</Label>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-11 text-base"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-11 text-base"
                    required
                  />
                </div>
              </div>
            </form>
            <div className="pt-6 flex flex-col">
              <Button
                type="submit"
                className="w-full bg-blue-600 rounded-lg py-5 hover:bg-blue-700 cursor-pointer"
              >
                Continue
              </Button>
              <div className="px-4 pt-4">
                <p>
                  Already have an account?{" "}
                  <a className="text-blue-700 hover:underline" href="/login">
                    Log in
                  </a>
                </p>
                <p>
                  Forgot your password?{" "}
                  <a className="text-blue-700 hover:underline cursor-not-allowed" href="">
                    Reset it via email
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
