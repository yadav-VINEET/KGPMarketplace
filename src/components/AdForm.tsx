'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadArea from "./UploadArea";
import { categories } from "@/libs/helpers";
import SubmitButton from "./SubmitButton";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { useState } from "react";
import { createAd, updateAd } from "@/app/actions/adActions";
import { useRouter } from "next/navigation";
import { Ad } from "@/models/Ad";

type Props = {
    ad?: Ad;
    defaultFiles?: UploadResponse[];
    adId?: string;
};

export default function AdForm({
    ad,
    defaultFiles = [],
    adId,
}: Props) {
    const [files, setFiles] = useState<UploadResponse[]>(defaultFiles);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        formData.set('files', JSON.stringify(files));
        let result;
        try {
            if (adId) {
                // console.log("Updating ad with ID:", adId);
                result = await updateAd(adId, formData);
            } else {
                // console.log("Creating new ad");
                result = await createAd(formData);
            }
            // console.log("Ad operation result:", result);
            if (!result || !result._id) {
                throw new Error("Failed to get the result of the ad operation");
            }
            router.push('/ad/' + result._id);
        } catch (error) {
            console.error("Failed to handle ad operation:", error);
        }
    }

    return (
        <form
            action={handleSubmit}
            className="flex flex-col p-4 md:grid md:grid-cols-2 md:gap-8 max-w-xl mx-auto"
        >
            <div className="grow md:pt-8">
                <UploadArea files={files} setFiles={setFiles} />
                <div>
                    <label htmlFor="hallIn">
                        <FontAwesomeIcon className="pr-1 pl-1" icon={faLocationCrosshairs} />
                        SHARE LOCATION
                    </label>
                    <select name="location" id="hallIn" defaultValue={ad?.location || ''} className="name mb-4">
                        <option disabled value=''>Select Hall</option>
                        <option value="RK">RK</option>
                        <option value="MS">MS</option>
                        <option value="LLR">LLR</option>
                        <option value="LBS">LBS</option>
                        <option value="Patel">Patel</option>
                        <option value="Nehru">Nehru</option>
                        <option value="Azad">Azad</option>
                        <option value="BRH">BRH</option>
                        <option value="SNIG">SNIG</option>
                        <option value="MT">MT</option>
                        <option value="SNVH">SNVH</option>
                        <option value="VS">VS</option>
                        <option value="RP">RP</option>
                        <option value="JCB">JCB</option>
                        <option value="GKH">GKH</option>
                        <option value="SAM">SAM</option>
                        <option value="HJB">HJB</option>
                        <option value="BC ROY">BC ROY</option>
                        <option value="RLB">RLB</option>
                    </select>
                    <div className="flex justify-center items-center">
                    <a href="https://resale-calculator.vercel.app/" target="_blank" className="text-white px-4 py-2 rounded bg-blue-600">Smart Price Calculator</a>
                    </div>
                </div>
            </div>

            <div className="grow pt-2">
                <label htmlFor="titleIn">Title</label>
                <input required id="titleIn" name="title" type="text" placeholder="Title" defaultValue={ad?.title} />

                <label htmlFor="priceIn">Price</label>
                <input required id="priceIn" name="price" type="number" placeholder="Price" defaultValue={ad?.price} />

                <label htmlFor="categoryIn">Category</label>
                <select name="category" defaultValue={ad?.category || ''} id="categoryIn" className="name">
                    <option disabled value=''>Select Category</option>
                    {categories.map(({ key, label }) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
                <label htmlFor="descriptionIn">Description</label>
                <textarea name="description" id="descriptionIn" placeholder="description" defaultValue={ad?.description}></textarea>

                <label htmlFor="contactIn">Contact Information</label>
                <input required name="contact" id="contactIn" type="number" placeholder="+91-9876 123 123" defaultValue={ad?.contact}></input>
                <SubmitButton>Publish</SubmitButton>
            </div>
        </form>
    );
}
