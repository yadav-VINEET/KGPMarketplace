'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteAdButton from "@/components/DeleteAdButton";
import Gallery from "@/components/Gallery";
import { connect } from "@/libs/helpers";
import { AdModel } from "@/models/Ad";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Props = {
    params:{
        id: string;
};
    searchParams: {[key: string] :  string};

};

export default async function SingleAdPage(args: Props){
    await connect();
    const adDoc = await AdModel.findById(args.params.id);
    const session = await getServerSession(authOptions);
    if(!adDoc){
        return "Not Found!";
    }
    return(
        <div className="flex absolute inset-0 top-16"  >
            <div className="w-3/5 flex flex-col grow bg-black text-white relative">
                <Gallery files={adDoc.files}/>
            </div>
            <div className="w-2/5 p-8 grow shrink-0">

                <h1 className="text-lg font-bold">{adDoc.title}</h1>
                {session && session?.user?.email === adDoc.userEmail && (
                <div className="mt-2 flex gap-2">
                    <Link href={`/edit/${adDoc._id}`} className="border border-blue-600 text-blue-600 rounded-md py-1 px-4 inline-flex gap-1 items-center cursor-pointer">
                    <FontAwesomeIcon icon={faPencil} />
                    <span>Edit</span>
                    </Link>
                    <DeleteAdButton id={adDoc._id} />
                </div>
                )}
                <label htmlFor="">Price</label>
                <p className="font-bold">{adDoc.price}</p>
                <label htmlFor="">category</label>
                <span>{adDoc.category}</span>
                <label htmlFor="">description</label>
                <p>{adDoc.description}</p>
                <label htmlFor="">contact</label>
                <p>{adDoc.contact}</p>
                <label htmlFor="">location</label>
                <p>{adDoc.location}</p>
            </div>
        </div>
    )
}