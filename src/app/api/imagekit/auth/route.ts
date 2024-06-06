import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import ImageKit from 'imagekit';


export const GET = async () => {
    const session = await getServerSession(authOptions);
    if(!session){
        return Response.json(false);
    }
    const ik = new ImageKit({
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT as string,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,

    });
    return Response.json(ik.getAuthenticationParameters());
};