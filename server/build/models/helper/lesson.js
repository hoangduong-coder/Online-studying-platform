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
            ref: "Lesson"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9oZWxwZXIvbGVzc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXpDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQ3hCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsQ0FBQztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxRQUFRO1NBQ2Q7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKO1lBQ0UsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsTUFBTTtTQUNaO0tBQ0Y7Q0FDRixDQUFDLENBQUM7QUFFSCxlQUFlLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==