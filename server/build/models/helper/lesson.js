import { Schema, model } from "mongoose";
const schema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    content: [
        {
            type: Schema.Types.ObjectId,
            ref: "Content"
        }
    ],
    quiz: [
        {
            type: Schema.Types.ObjectId,
            ref: "Quiz"
        }
    ]
});
export default model("Lesson", schema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9oZWxwZXIvbGVzc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBSXhDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFTO0lBQ2hDLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsQ0FBQztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxTQUFTO1NBQ2Y7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKO1lBQ0UsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsTUFBTTtTQUNaO0tBQ0Y7Q0FDRixDQUFDLENBQUE7QUFFRixlQUFlLEtBQUssQ0FBUyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUEifQ==