import { Schema, model } from 'mongoose';
const schema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "StudentModels",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    overall: Number,
    finishedDate: String,
    progress: Number
});
const EnrolledStudent = model('EnrolledStudent', schema);
export default EnrolledStudent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5yb2xsZWRfc3R1ZGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvaGVscGVyL0Vucm9sbGVkX3N0dWRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFZLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFJbEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQWtCO0lBQ3pDLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLGVBQWU7UUFDcEIsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELE9BQU8sRUFBRSxNQUFNO0lBQ2YsWUFBWSxFQUFFLE1BQU07SUFDcEIsUUFBUSxFQUFFLE1BQU07Q0FDakIsQ0FBQyxDQUFBO0FBR0YsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUF3QixpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUUvRSxlQUFlLGVBQWUsQ0FBQSJ9