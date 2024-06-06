import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import Uploader from "./Uploader";
import UploadThubmbail from "./UploadThumbnail";

type Props = {
    files: UploadResponse[];
    setFiles: Dispatch<SetStateAction<UploadResponse[]>>;
};

export default function UploadArea({files,setFiles}:Props){
    const [isUploading, setIsUploading] = useState(false);
    return (
        <>
            <div className="bg-gray-200 p-4">
                <h2 className="text-center text-xs text-gray-400 uppercase font-bold">Add photos of your product</h2>
                    <div className="flex flex-col">
                    <FontAwesomeIcon icon={faImage} className="h-24 text-gray-300"/>
                    

                    <label className={
                        isUploading?"cursor-not-allowed upload-btn mt-2 border border-gray-400 text-gray-400  mt-2 px-4 py-2 rounded inline-flex gap-1 items-center justify-center"
                        : "cursor-pointer upload-btn mt-2 border border-blue-600  mt-2 text-blue-600 px-4 py-2 rounded inline-flex gap-1 items-center justify-center"}>
                        <Uploader 
                        onUploadStart={()=> setIsUploading(true)}
                        onSuccess={file=>{
                            setFiles(prev => [...prev,file])
                            setIsUploading(false);
                        }}/>
                        {isUploading?(
                            <span>Uploading...</span>
                        ):(<>
                        <FontAwesomeIcon icon={faPlus}/>
                        <span>Add Photos</span>
                        </>)
                    }
                        </label>
                        <div className="flex gap-2 mt-2 flex-wrap">
                        {files.map(file => (
                            <div key={file.fileId} className="rounded size-14 overflow-hidden">
                                <UploadThubmbail file={file} />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
        </>
    );
}