import { faBicycle, faBook, faHouse, faMobile, faShirt } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export async function connect(){
    return await mongoose.connect(process.env.MONGODB_URL as string);
}

export const categories = [
    {key:'cycle', label:'Cycle', icon: faBicycle},
    {key:'electronics', label:'Electronics', icon: faMobile},
    {key:'household', label:'Household', icon: faHouse},
    {key:'books', label:'Books', icon: faBook},
    {key:'clothes', label:'Clothes', icon: faShirt},
    // {key:'properties', label:'Properties', icon: faHome},
];