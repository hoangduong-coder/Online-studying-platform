import { Schema, model } from 'mongoose';
const schema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        minlength: 5
    },
    body: String,
    material: [
        {
            materialType: String,
            link: String
        }
    ]
});
const LessonContent = model("Content", schema);
export default LessonContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVzc29uX2NvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL2hlbHBlci9MZXNzb25fY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVksTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUlsRCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztJQUN4QixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLENBQUM7S0FDYjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBSSxFQUFFLE1BQU07SUFDWixRQUFRLEVBQUU7UUFDUjtZQUNFLFlBQVksRUFBRSxNQUFNO1lBQ3BCLElBQUksRUFBRSxNQUFNO1NBQ2I7S0FDRjtDQUNGLENBQUMsQ0FBQTtBQUdGLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBZ0IsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBRTdELGVBQWUsYUFBYSxDQUFBIn0=