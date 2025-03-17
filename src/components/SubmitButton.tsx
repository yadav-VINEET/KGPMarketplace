import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({children}:{children:ReactNode}){
    const {pending} = useFormStatus();
    return (
        <>
        <div className="flex justify-center items-center">
        <button
        disabled={pending}
        className= { "mt-2 text-white px-4 py-2 rounded " + (pending ? "bg-gray-400" : "bg-blue-600")  }>
            {pending && (
                <span>Saving...</span>
            )}
            {!pending &&(
                <span>{children}</span>
            )}
            </button>
        </div>
        </>
    );
}