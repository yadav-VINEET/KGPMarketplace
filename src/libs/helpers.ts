import { faBicycle, faBook, faHouse, faMobile, faRepeat } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export async function connect(){
    return await mongoose.connect(process.env.MONGODB_URL as string);
}

export const categories = [
    {key:'cycle', label:'Cycle', icon: faBicycle},
    {key:'electronics', label:'Electronics', icon: faMobile},
    {key:'household', label:'Household', icon: faHouse},
    {key:'books', label:'Books', icon: faBook},
    {key:'rent', label:'Rent', icon: faRepeat},
    // {key:'properties', label:'Properties', icon: faHome},
];