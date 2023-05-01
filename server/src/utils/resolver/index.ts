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
  Query, Mutation
};

export default resolvers;