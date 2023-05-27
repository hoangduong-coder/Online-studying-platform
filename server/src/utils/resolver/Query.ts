import { CourseModel, StudentModel, StudyProgressModel, TeacherModel } from "../../models";

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */



export const Query = {
  getUser: async (_root: any, _args: any, contextValue: { currentUser?: any }) => {
    if (contextValue.currentUser) {
      return await contextValue.currentUser;
    }
  },
  getOtherUser: async (_root: any, args: { userID: string }) => {
    const teacher = await TeacherModel.findById(args.userID);
    if (!teacher) {
      return await StudentModel.findById(args.userID);
    }
    return teacher;
  },
  allCourses: async (_root: any) => {
    return await CourseModel.find({}).populate("teacher");
  },
  getFullCourse: async (
    _root: any,
    args: { id: string },
  ) => {
    return await CourseModel.findOne({ _id: args.id }).populate([
      "teacher",
      {
        path: "lessons",
        populate: "quiz",
      }
    ]);
  },
  getQuizResult: async (
    _root: any,
    args: { courseID: string; lessonID: string },
    contextValue: { currentUser?: any }
  ) => {
    if (contextValue.currentUser) {
      const course = await CourseModel.findOne({ _id: args.courseID });
      const progress = await StudyProgressModel.findOne({
        student: contextValue.currentUser._id,
        course: course?._id
      }).populate({
        path: "lessonCompleted", populate: "lesson"
      });
      return progress
        ? progress.lessonCompleted.find(
          //@ts-ignore
          (obj) => obj.lesson._id.toString() === args.lessonID
        )
        : null;
    }
  },
  getOverallResult: async (
    _root: any,
    args: { courseID: string },
    contextValue: { currentUser?: any }
  ) => {
    if (contextValue.currentUser) {
      return await StudyProgressModel.findOne({ student: contextValue.currentUser._id, course: args.courseID });
    }
  }
};
