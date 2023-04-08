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
    organization: {
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
export default model("Teacher", schema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVhY2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdGVhY2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztJQUN4QixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLENBQUM7UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsQ0FBQztRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtLQUNiO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsZUFBZSxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDIn0=