'use server';

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { AdModel } from "@/models/Ad";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/libs/authOptions";

async function connect(){
    return mongoose.connect(process.env.MONGODB_URL as string);
}

export async function createAd(formData: FormData){
    const {files,...data} = Object.fromEntries(formData);
    // await connect();
    const session= await getServerSession(authOptions);
    const newAdData = {
        ...data,
        files: JSON.parse(files as string),
        userEmail: session?.user?.email,
    };
    const newAdDoc = await AdModel.create(newAdData);
    return JSON.parse(JSON.stringify(newAdDoc));
}


    export async function updateAd(adId: string, formData: FormData) {
        const { files, ...data } = Object.fromEntries(formData);
        // await connect();
        const session = await getServerSession(authOptions);
        const adDoc = await AdModel.findById(adId);
        
        if (!adDoc) {
            throw new Error("Ad not found");
        }
        if (adDoc.userEmail !== session?.user?.email) {
            // Return the existing ad without updating if the user does not have permission
            return JSON.parse(JSON.stringify(adDoc));
        }
        const updateData = {
            ...data,
            files: JSON.parse(files as string),
        };
        const updatedAdDoc = await AdModel.findByIdAndUpdate(adId, updateData, { new: true });
        if (!updatedAdDoc) {
            throw new Error("Failed to update ad");
        }
        revalidatePath(`/ad/`+adId);
        return JSON.parse(JSON.stringify(updatedAdDoc));
    }
    