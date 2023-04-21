import { CourseModel } from "models";
import middleware from "./middleware";

const quizPoints = async (params: { courseID: string, answers: Array<{ quizID: string, answer: string }> }) => {
  const course = await CourseModel.findById(params.courseID);
  if (!course) {
    return middleware.errorHandler({
      errorMessage: "No course found",
      code: "BAD_USER_INPUT",
      args: params.courseID
    });
  }

  return 0;
};
const progressCalculation = () => {
  return 0;
};

export default { quizPoints, progressCalculation };