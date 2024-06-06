import { connect } from "@/libs/helpers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function GET(req: Request, res: Response){
    await connect();

    const {searchParams} = new URL(req.url);

    const phrase = searchParams.get('phrase');
    const category = searchParams.get('category');
    const min = searchParams.get('min');
    const max = searchParams.get('max');

    const filter:FilterQuery<Ad> = {};

    if (phrase) {
        filter.title = {$regex: '.*'+phrase+'.*', $options: 'i'};
    }
    if (category) {
        filter.category = category;
    }
    if (min && !max) filter.price = {$gte: min};
    if (max && !min) filter.price = {$lte: max};
    if (min && max) filter.price = {$gte: min, $lte: max};

    const adsDoc = await AdModel.find(filter, null, {sort:{createdAt: -1}});
    return new Response(JSON.stringify(adsDoc), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    await connect();
    const adDoc = await AdModel.findById(id);
    const session = await getServerSession(authOptions);
    if (!adDoc || adDoc.userEmail !== session?.user?.email) {
        return Response.json(false);
    }
    await AdModel.findByIdAndDelete(id);
    return Response.json(true);
    }