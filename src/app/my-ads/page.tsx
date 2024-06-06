'use server';

import AdItem from "@/components/AdItem";
import { connect } from "@/libs/helpers";
import { AdModel } from "@/models/Ad";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function MyAdsPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return "no email found";
  }
  await connect();
  const adsDocs = await AdModel.find({ userEmail: email });
  return (
    <div className="container my-8 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your ads</h1>
      <div className="grid md:grid-cols-4 gap-x-2 gap-y-4">
        {adsDocs?.map((ad) => (
          <AdItem ad={ad} />
        ))}
      </div>
    </div>
  );
}