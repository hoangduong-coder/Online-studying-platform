import { CourseModel } from "../models";
import { GraphQLError } from "graphql";

const quizPoints = async (params: {
  courseID: string
  // lessonID: string
  // answers: Array<{ quizID: string; answer: string }>
}) => {
  const course = await CourseModel.findById(params.courseID).populate({
    path: "lessons",
    populate: { path: "quiz" }
  });
  if (!course) {
    throw new GraphQLError("No course or lesson found", {
      extensions: { code: "BAD_USER_INPUT", invalidArgs: params.courseID },
    });
  }
  return course;
};
const progressCalculation = () => {
  return 0;
};

export default { quizPoints, progressCalculation };
