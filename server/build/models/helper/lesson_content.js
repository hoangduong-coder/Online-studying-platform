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
export default model("Content", schema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uX2NvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL2hlbHBlci9sZXNzb25fY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUl4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBVTtJQUNqQyxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLENBQUM7S0FDYjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBSSxFQUFFLE1BQU07SUFDWixRQUFRLEVBQUU7UUFDUjtZQUNFLFlBQVksRUFBRSxNQUFNO1lBQ3BCLElBQUksRUFBRSxNQUFNO1NBQ2I7S0FDRjtDQUNGLENBQUMsQ0FBQTtBQUVGLGVBQWUsS0FBSyxDQUFVLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQSJ9