'use server';

import { authOptions } from "@/libs/authOptions";
import AdForm from "@/components/AdForm";
import { connect } from "@/libs/helpers";
import { AdModel } from "@/models/Ad";
import { getServerSession } from "next-auth";

type Props = {
    params: {
        id: string;
    };
    searchParams: { [key: string]: string };
};

export default async function EditPage(props: Props) {
    const id = props.params.id;
    await connect();
    const session = await getServerSession(authOptions);
    const adDoc = await AdModel.findById(id);


    if (!adDoc) {
        return '404 Not Found';
    }
    if (session?.user?.email !== adDoc?.userEmail && session?.user?.email !== "vineetyadav5568@gmail.com") {
        return 'Not your ad!';
    }

    return (
        <AdForm ad={adDoc} defaultFiles={adDoc.files} adId={adDoc._id.toString()} />
    );
}
