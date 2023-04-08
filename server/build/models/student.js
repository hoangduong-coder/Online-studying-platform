import { Schema, model } from "mongoose";
const schema = new Schema({
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        required: true
    },
    username: {
        type: String,
        minlength: 2,
        required: true,
        unique: true
    }
});
export default model("Student", schema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc3R1ZGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztJQUN4QixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLENBQUM7UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsQ0FBQztRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDYjtDQUNGLENBQUMsQ0FBQztBQUVILGVBQWUsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyJ9