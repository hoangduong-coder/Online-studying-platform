import { Schema, model } from "mongoose";
import EnrolledStudent from "./helper/enrolled_student";
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
        ref: 'Teacher',
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
            ref: "Lesson"
        }]
});
export default model("Course", courseSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9jb3Vyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFekMsT0FBTyxlQUFlLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDOUIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxDQUFDO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsU0FBUztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDM0IsWUFBWSxFQUFFLE1BQU07SUFDcEIsT0FBTyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxRQUFRO1NBQ2QsQ0FBQztDQUNILENBQUMsQ0FBQztBQUVILGVBQWUsS0FBSyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyJ9