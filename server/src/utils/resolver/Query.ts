/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CourseModel, StudentModel, TeacherModel } from "../../models";

export const Query = {
  getStudent: (_root: any, _args: any, contextValue: { currentUser?: any }) => {
    if (contextValue.currentUser) {
      return contextValue.currentUser;
    }
  },
  getTeacher: async (_root: any, args: { userID: string }) => {
    return await TeacherModel.findById(args.userID);
  },
  allCourses: async (
    _root: any,
    args: { name?: string; category?: string },
    contextValue: { currentUser?: any }
  ) => {
    if (args.name) {
      return await CourseModel.find({ name: { $in: args.name } }).populate(
        "teacher"
      );
    } else if (args.category) {
      return await CourseModel.find({
        category: { $in: args.category },
      }).populate("teacher");
    } else {
      let courseIDList: any[] = [];
      if (contextValue.currentUser) {
        for (const obj of contextValue.currentUser.studyProgress) {
          courseIDList = courseIDList.concat(obj.course._id.toString());
        }
        return await CourseModel.find({ _id: { $nin: courseIDList } }).populate("teacher");
      }
      return await CourseModel.find({}).populate("teacher");
    }
  },
  getCourseById: async (
    _root: any,
    args: { id: string },
    contextValue: { currentUser?: any }
  ) => {
    if (
      contextValue.currentUser &&
      contextValue.currentUser.studyProgress.find(
        (obj: any) => obj.course._id.toString() === args.id
      )
    ) {
      return await CourseModel.findOne({ _id: args.id }).populate(["teacher", {
        path: "lessons", populate: "quiz"
      }]);
    }
    const course = await CourseModel.findOne({ _id: args.id }).populate("teacher");
    return {
      id: course?._id,
      name: course?.name,
      lesson: [],
      teacher: course?.teacher,
      description: course?.description,
      estimateTime: course?.estimateTime,
      category: course?.category
    };
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
  getOverallResult: (
    _root: any,
    args: { courseID: string },
    contextValue: { currentUser?: any }
  ) => {
    if (contextValue.currentUser) {
      return contextValue.currentUser.studyProgress.find(
        //@ts-ignore
        (obj) => obj.course._id.toString() === args.courseID
      );
    }
  },
};
