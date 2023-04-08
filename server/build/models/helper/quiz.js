import { Schema, model } from 'mongoose';
const schema = new Schema({
    question: {
        type: String,
        required: true,
        minlength: 5
    },
    choices: [{
            type: String,
            required: true
        }],
    answer: {
        type: String,
        required: true,
        minlength: 5
    },
});
export default model("Quiz", schema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpei5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvaGVscGVyL3F1aXoudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDeEIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEVBQUUsQ0FBQztZQUNSLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0lBQ0YsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxDQUFDO0tBQ2I7Q0FDRixDQUFDLENBQUM7QUFDSCxlQUFlLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==