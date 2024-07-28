import { faBicycle, faBook, faHouse, faMobile } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export async function connect(){
    return await mongoose.connect(process.env.MONGODB_URL as string);
}

export const categories = [
    {key:'cycle', label:'Cycle', icon: faBicycle},
    {key:'electronics', label:'Mobile', icon: faMobile},
    {key:'household', label:'Home', icon: faHouse},
    {key:'books', label:'Books', icon: faBook},
    // {key:'properties', label:'Properties', icon: faHome},
];