/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CourseModel, StudentModel, TeacherModel } from "../../models";

import helper from "../helper";

export const Query = {
  getStudent: async (_root: any, _args: any, contextValue: { token?: string }
  ) => {
    const requestedStudent = contextValue.token
      ? //@ts-ignore
      await StudentModel.findById(contextValue.token.id).populate({ path: "studyProgress", populate: ["course", "lessonCompleted"] })
      : null;
    return requestedStudent;
  },
  getTeacher: async (_root: any, args: { userID: string }) => {
    return await TeacherModel.findById(args.userID);
  },
  allCourses: async (
    _root: any,
    args: { name?: string; category?: string }
  ) => {
    if (args.name) {
      return await CourseModel.find({ name: { $in: args.name } }).populate(
        "teacher"
      );
    } else if (args.category) {
      return await CourseModel.find({
        category: { $in: args.category },
      }).populate("teacher");
    }
    return await CourseModel.find({}).populate("teacher");
  },
  getCourseById: async (
    _root: any,
    args: { id: string },
    contextValue: { token?: string }
  ) => {
    const requestedStudent = contextValue.token
      ? //@ts-ignore
      await StudentModel.findById(contextValue.token.id)
      : null;
    if (
      requestedStudent &&
      requestedStudent.studyProgress.find(
        (obj) => obj.course.toString() === args.id
      )
    ) {
      return await CourseModel.findOne({ _id: args.id }).populate([
        "teacher",
        {
          path: "lessons",
          populate: { path: "quiz" },
        },
      ]);
    } else {
      return await CourseModel.findOne({ _id: args.id }).populate("teacher");
    }
  },
  getUserCourses: async (_root: any, args: { userID: string }) => {
    const teacher = await TeacherModel.findById(args.userID);
    if (teacher) {
      return await CourseModel.find({ teacher: args.userID }).populate(
        "teacher"
      );
    } else {
      const result: any[] = [];
      const user = await StudentModel.findById(args.userID).populate(
        "studyProgress"
      );
      if (user && user.studyProgress) {
        user.studyProgress.forEach((progress) => {
          const course = CourseModel.findById(progress.course.toString());
          result.push(course);
        });
      }
      return result;
    }
  },
  getOverallResult: async (
    _root: any,
    args: { courseID: string },
    contextValue: { token?: string }
  ) => {
    const requestedStudent = contextValue.token
      ? //@ts-ignore
      await StudentModel.findById(contextValue.token.id).populate({ path: "studyProgress", populate: ["course", "lessonCompleted"] })
      : null;
    if (requestedStudent) {
      const selectedCourse = requestedStudent.studyProgress.find(
        (obj) => obj.course.toString() === args.courseID
      );
      if (selectedCourse && selectedCourse.progressPercentage === 100) {
        const index = requestedStudent.studyProgress.indexOf(selectedCourse);
        requestedStudent.studyProgress[index].status === "PASSED";
        await requestedStudent.save();
        return helper.overallPointCalculation(
          requestedStudent.studyProgress[index].lessonCompleted
        );
      }
    }
  },
};
