import { faBicycle, faBook, faHouse, faMobile } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export async function connect(){
    return mongoose.connect(process.env.MONGODB_URL as string);
}

export const categories = [
    {key:'cycle', label:'cycle', icon: faBicycle},
    {key:'electronics', label:'Electronics', icon: faMobile},
    {key:'household', label:'household', icon: faHouse},
    {key:'books', label:'books', icon: faBook},
    // {key:'properties', label:'Properties', icon: faHome},
];