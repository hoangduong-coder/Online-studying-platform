import { Schema, model } from "mongoose";
import EnrolledStudent from "./helper/Enrolled_student";
const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    category: {
        type: [String],
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'TeacherModels',
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    students: [EnrolledStudent],
    estimateTime: Number,
    lessons: [{
            type: Schema.Types.ObjectId,
            ref: "LessonModel"
        }]
});
const CourseModels = model("Course", courseSchema);
export default CourseModels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291cnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Db3Vyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFZLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFHbEQsT0FBTyxlQUFlLE1BQU0sMkJBQTJCLENBQUE7QUFFdkQsTUFBTSxZQUFZLEdBQVcsSUFBSSxNQUFNLENBQUM7SUFDdEMsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxDQUFDO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsZUFBZTtRQUNwQixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDO0lBQzNCLFlBQVksRUFBRSxNQUFNO0lBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsYUFBYTtTQUNuQixDQUFDO0NBQ0gsQ0FBQyxDQUFBO0FBSUYsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFlLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUVoRSxlQUFlLFlBQVksQ0FBQSJ9