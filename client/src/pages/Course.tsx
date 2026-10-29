import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@base-ui/react";

function Course() {
  const course = { price: 5999, originalPrice: 8499 };
  const discountPercentage = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100,
  );

  return (
    <div className="bg-black min-h-screen">
      <Appbar />
      <div className="flex justify-between items-start text-white m-8">
        <div className="m-8 max-w-xl">
          <h1 className="text-4xl font-bold">Development Courses</h1>
          <p className="mt-6 text-gray-300 text-lg">
            Build practical development skills with expert-led courses, hands-on
            projects, and lessons designed to help you grow.
          </p>
        </div>

        <Card className="w-90 bg-gray-950 border border-gray-600 rounded-md h-full">
          <img src="/1.webp" alt="" className="w-full" />
          <CardContent>
            {/* <div className="rounded-md border border-blue-900 text-white bg-blue-950/30 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">COUPON AVAILABLE</p>
              </div>
              <p className="mt-4 font-bold">INDEPENDENCE1</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-2xl font-bold text-green-400">Save ₹799</p>
                <Button className="bg-white text-black hover:bg-gray-200 p-2 rounded-full">
                  Apply coupon
                </Button>
              </div>
            </div> */}

            <div className="flex items-center gap-4 pt-12">
              <span className="text-white text-3xl font-extrabold">
                ₹{course.price.toLocaleString("en-IN")}
              </span>
              <span className="text-white text-md font-extralight line-through">
                ₹{course.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-green-500 text-sm font-semibold ml-4 p-1 border border-gray-800 rounded-full">
                {discountPercentage}% off
              </span>
            </div>
            <div className="w-full max-w-md space-y-4">
              <div>
                <p className="mt-4 text-sm text-gray-400">Payment currency</p>

                <select
                  className="h-12 mt-2 w-full rounded-md border border-gray-800 bg-transparent px-4 text-white outline-none"
                  defaultValue="INR"
                >
                  <option value="INR" className="bg-gray-950">
                    INR - Indian rupee
                  </option>
                  {/* <option value="USD" disabled className="bg-gray-950">
                    USD - United States dollar
                  </option> */}
                </select>
              </div>

              {/* <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  className="h-12 flex-1  text-white"
                />
                <Button className="h-12 px-6 bg-white cursor-pointer">
                  Apply
                </Button>
              </div> */}

              <div className="flex flex-col gap-4">
                <Button className="h-14 w-full bg-white text-black hover:bg-gray-200 cursor-pointer">
                  Buy now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default Course;
