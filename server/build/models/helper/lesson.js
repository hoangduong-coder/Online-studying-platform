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
            ref: "LessonContent"
        }
    ],
    quiz: [
        {
            type: Schema.Types.ObjectId,
            ref: "QuizModel"
        }
    ]
});
const LessonModel = model("Lesson", schema);
export default LessonModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVzc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9oZWxwZXIvTGVzc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBWSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBSWxELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQ3hCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsQ0FBQztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxlQUFlO1NBQ3JCO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSjtZQUNFLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFdBQVc7U0FDakI7S0FDRjtDQUNGLENBQUMsQ0FBQTtBQUdGLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBZSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDekQsZUFBZSxXQUFXLENBQUEifQ==