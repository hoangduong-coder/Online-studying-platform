/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CourseModel, StudyProgressModel } from "../../models";

import { Mutation } from "./Mutation";
import { Query } from "./Query";

const resolvers = {
  User: {
    __resolveType(user: any, _contextValue: any, _info: any) {
      if (user.organization) {
        return "Teacher";
      }
      else if (user) {
        return "Student";
      }
      else return null;
    },
  },
  Teacher: {
    ownCourses: async (root: any) => {
      return await CourseModel.find({ teacher: root._id }).populate("teacher");
    },
  },
  Student: {
    studyProgress: async (root: any) => {
      return await StudyProgressModel.find({ student: root._id }).populate(["course", {
        path: "lessonCompleted",
        populate: ["comments", "lesson"],
      }]);
    },
  },
  Course: {
    students: async (root: any) => {
      return await StudyProgressModel.find({ course: root._id }).populate(["student", {
        path: "lessonCompleted",
        populate: ["comments", "lesson"],
      }]);
    },
  },
  Query,
  Mutation,
};

export default resolvers;
