'use client';

import Link from "next/link";
import UploadThumbnail from "./UploadThumbnail";
import { Ad } from "@/models/Ad";

function AdItem({ ad }: { ad: Ad }) {
  return (
    <div className="min-h-60 border border-black-200 flex flex-col relative justify-start">
      {ad.files?.length > 0 && (
        <Link href={`/ad/${ad._id}`} className="rounded-md overflow-hidden">
          <UploadThumbnail onClick={() => {}} file={ad.files[0]} />
        </Link>
      )}
      <div className="pl-2">
        <p className="mt-1 font-bold">{Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(ad.price)}</p>
        <Link href={`/ad/${ad._id}`}>{ad.title}</Link>
      </div>
      <Link href={`/ad/${ad._id}`} className="absolute inset-0"></Link>
    </div>
  );
}

AdItem.displayName = "AdItem";

export default AdItem;
