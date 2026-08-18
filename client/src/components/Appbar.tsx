import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex h-16 px-2 py-2 bg-gray-900 text-white items-center gap-2">
        <div className="ml-3">
          <a href="/" className="flex items-center gap-2 cursor-pointer">
            <img className="rounded-full w-10 h-10" src="/1.webp" alt="Logo" />
            <p className="font-extrabold text-2xl">
              Code<span className="text-red-500">X</span>
            </p>
          </a>
        </div>
        <div className="flex justify-end items-center ml-auto gap-2 mr-4">
          <Button
            className="bg-white h-9 text-black px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="bg-white h-9 text-black px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/signup")}
          >
            Join now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
