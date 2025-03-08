import { UploadResponse } from "imagekit/dist/libs/interfaces";
import Image from "next/image";
import MyImage from "./MyImage";

type Props = {
    file:UploadResponse;
    onClick?: () => void;
}

export default function UploadView({file,onClick}:Props){
    function handleClick(ev:React.MouseEvent) {
        if(onClick){
            ev.preventDefault();
            return onClick ();
        }
        location.href = file.url;
    }
    if(file.fileType === 'image'){
        return (
            <div onClick={handleClick}>
            <MyImage 
            src={file.filePath}  
            alt={'Product-photo'} 
            aiCrop={false}
            width={2048} 
            height={2048}
            className="w-auto h-auto max-w-full max-h-full rounded"
            />
            </div>
        )
    }
    return (
        <>
        {file.name}
        </>
    );
}