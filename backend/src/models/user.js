import pkg from "colors";
import {mongoose,Types,model,Schema, mongo} from "mongoose";
const {hidden} = pkg
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "Student"
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
    },
   refreshToken: {
    type: String,
    default: null
   }
    
},{
    timestamps: true
});


const user = mongoose.model('user',userSchema);

const courseSchema = mongoose.Schema({
 name: {type: String,required:true},
 startDate: {type: Date ,required: true,default:  ()=>Date.now()},
 endDate: {type: Date,required:true,default:()=>  Date(Date.now()+30*24*60*60*1000)},
 createdBy: {type: String,required:true,default: "Himanshu Bhargava"},
 price: {type:Number,required:true},
 category: {type:String},
 description: {type: String},
 tags: [String],
 rating: {type: Number,default: 0},
 section: [{type:Types.ObjectId,ref: 'content'}],
 status: {type:String,enum: ['published','draft'],default: 'draft'},
 totalEnrolled: {type:Number,required: true}
},{
    timestamps: true
});
const course = mongoose.model('course',courseSchema);

const enrollmentSchema = mongoose.Schema({
   userId : {type: Types.ObjectId,ref: "user"},
   courseId: {type: Types.ObjectId,ref:"course"},
   progress: [{sectionId: Types.ObjectId,completed:Boolean}],
   completionDate: {type:Date},
   certificationIssued: {type:Boolean}
},{
    timestamps: true
});
const enrollment = mongoose.model('enrollment',enrollmentSchema);

const contentSchema = mongoose.Schema({
    tittle: {type:String},
    video: {type:String},
    notes: {type:String},
    duration: {type: String},
    order: {type:Number}
},{
    timestamps: true
});
const content = mongoose.model('content',contentSchema);
export  {user,course,enrollment,content};
