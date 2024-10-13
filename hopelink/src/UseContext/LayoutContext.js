import { createContext, useState, useEffect } from "react";
export const LayoutContext= createContext();

export const LayoutProvider = ({children})=>{
    const [open, setOpen] = useState(false);

    return (
        <LayoutContext.Provider value={{open,setOpen}}>
            {children}
        </LayoutContext.Provider>
    )
}