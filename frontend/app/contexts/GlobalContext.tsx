// Define shape of state (Types)
// Create Context with initial state

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

export interface IGlobalContextState {
    toastMessage: string;
    shouldShowToast: boolean;
    setToastMessage: Dispatch<SetStateAction<string>>;
    setShouldShowToast: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<IGlobalContextState>({
    toastMessage: "",
    shouldShowToast: false,
    setToastMessage: () => { },
    setShouldShowToast: () => { }
});

const GlobalContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [toastMessage, setToastMessage] = useState("");
    const [shouldShowToast, setShouldShowToast] = useState(false);
    return <GlobalContext.Provider value={{ toastMessage, setToastMessage, shouldShowToast, setShouldShowToast }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContextProvider;

export const useGlobalContext = () => useContext(GlobalContext);