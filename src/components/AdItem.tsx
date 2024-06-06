'use client'
import Link from "next/link";
import UploadThubmbail from "./UploadThumbnail";
import { Ad } from "@/models/Ad";

export default function ({ad}:{ad:Ad}){
    return (
        <div className="min-h-24 flex flex-col relative justify-start">
        {ad.files?.length>0 && (
        <Link href={`/ad/${ad._id}`} className="rounded-md overflow-hidden relative">
            <UploadThubmbail onClick={()=>{}} file={ad.files[0]}/>
            <Link href={`/ad/${ad._id}`} className="absolute inset-0"></Link>
        </Link>
        )}
        <div>
        <p className="mt-1 font-bold">₹{ad.price}</p>
        <Link href={`/ad/${ad._id}`}>{ad.title}</Link>
        </div>
        </div>
    );
}