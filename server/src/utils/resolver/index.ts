/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CourseModel } from '../../models';
import { Mutation } from './Mutation';
import { Query } from './Query';

const resolvers = {
  User: {
    __resolveType(user: any, _contextValue: any, _info: any) {
      if (user.organization) {
        return "Teacher";
      }
      if (user.studyProgress) {
        return "Student";
      }
      return null;
    }
  },
  Query,
  Teacher: {
    ownCourses: async (root: any) => {
      return await CourseModel.find({ "teacher": root.id }).populate("teacher");
    }
  },
  Mutation
};

export default resolvers;