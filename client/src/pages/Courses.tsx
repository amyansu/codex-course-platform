import Appbar from "@/components/Appbar";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import React from "react";

function Courses() {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="min-h-screen bg-black">
      <Appbar />
      <div className="m-6 text-white">
        <h1 className="text-3xl font-bold mt-8">Courses</h1>
        <div className="grid grid-cols-4 gap-4 pt-6">
          {courses.map((course) => (
            <CourseCard key={course} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Courses;
