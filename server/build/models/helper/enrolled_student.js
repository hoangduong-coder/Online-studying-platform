import { Schema, model } from 'mongoose';
const schema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsZWRfc3R1ZGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvaGVscGVyL2Vucm9sbGVkX3N0dWRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFJeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQWtCO0lBQ3pDLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLFNBQVM7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsT0FBTyxFQUFFLE1BQU07SUFDZixZQUFZLEVBQUUsTUFBTTtJQUNwQixRQUFRLEVBQUUsTUFBTTtDQUNqQixDQUFDLENBQUE7QUFFRixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQWtCLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBRXpFLGVBQWUsZUFBZSxDQUFBIn0=