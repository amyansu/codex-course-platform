import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function CourseCard() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex-1 min-w-0">
        <Card
          className="bg-transparent border border-gray-900 rounded-sm cursor-pointer overflow-hidden hover:border-gray-600"
          onClick={() => navigate("/course")}
        >
          <img src="/2.webp" alt="" className="w-full" />
          <CardContent>
            <p className="text-white font-bold mt-4 text-xl">
              100xSchool Combined <br />
              Bootcamp
            </p>
            <div className="flex items-center gap-2 pt-8">
              <p className="text-white text-xl font-extrabold">₹5,999</p>
              <p className="text-white text-md font-extralight line-through">
                ₹8,499
              </p>
              <p className="text-green-500 text-sm font-semibold pl-4 pr-2">
                35% off
              </p>
              <Button className="bg-white text-black rounded-sm hover:bg-gray-200 cursor-pointer">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CourseCard;
