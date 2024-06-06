import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Model, Schema, model, models} from "mongoose";

export type Ad = {
    _id:string;
    title:string;
    price:number;
    category: string;
    description: string;
    contact: string;
    location: string;
    files: UploadResponse[];
    userEmail: string;
}

const adSchema = new Schema<Ad>({
    title: String,
    price: Number,
    category: String,
    contact: String,
    description: String,
    location: String,
    files: [Object],
    userEmail: {type: String, required: true},
},{
    timestamps:true,
});

export const AdModel = (models?.Ad as Model<Ad>) || model<Ad>('Ad' , adSchema);