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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsZWRfc3R1ZGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvaGVscGVyL2Vucm9sbGVkX3N0dWRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDeEIsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsU0FBUztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxPQUFPLEVBQUUsTUFBTTtJQUNmLFlBQVksRUFBRSxNQUFNO0lBQ3BCLFFBQVEsRUFBRSxNQUFNO0NBQ2pCLENBQUMsQ0FBQztBQUVILE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUV6RCxlQUFlLGVBQWUsQ0FBQyJ9