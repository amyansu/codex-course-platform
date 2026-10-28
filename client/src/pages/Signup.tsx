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
      <div className="flex justify-center px-4 py-4">
        <Card className="w-full max-w-md bg-gray-900 p-4 text-white">
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
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    defaultValue="user"
                    className="h-11 rounded-md border border-gray-700 bg-gray-950 px-3 text-base text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-5 hover:bg-blue-700 cursor-pointer"
                >
                  Continue
                </Button>
              </div>
            </form>
            <div className="flex flex-col pt-6">
              <div className="px-1 pt-1 text-sm text-gray-300">
                <p>
                  Already have an account?{" "}
                  <a className="text-blue-400 hover:underline" href="/login">
                    Log in
                  </a>
                </p>
                <p>
                  Forgot your password?{" "}
                  <a
                    className="cursor-not-allowed text-blue-400 hover:underline"
                    href="#"
                  >
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
