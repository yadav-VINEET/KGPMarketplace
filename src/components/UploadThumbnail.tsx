import { UploadResponse } from "imagekit/dist/libs/interfaces";
import Image from "next/image";
import { MouseEvent,MouseEventHandler } from "react";
import MyImage from "./MyImage";

type Props = {
    file:UploadResponse;
    onClick?: () => void;
}

export default function UploadThubmbail({file,onClick}:Props){
    function handleClick(ev:React.MouseEvent) {
        if(onClick){
            ev.preventDefault();
            return onClick ();
        }
        location.href = file.url;
    }
    if(file.fileType ==='image'){
        return (
            <div onClick={handleClick}>
                <MyImage 
                src={file.filePath + '?tr=w-56,h-56,fo-auto'}  
                aiCrop={true}
                width={300}
                height={300}
                alt={"Product Thumbnail" }/>
            </div>
        )
    }
    return(
        <div>{file.url} &raquo;</div>
    );
}