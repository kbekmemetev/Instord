import React, {createContext} from 'react';
import App from './App';
import UserStore from "./src/store/UserStore"


export const Context = createContext(null)

const root = () =>{

    return(
        <Context.Provider value={{
            user: new UserStore(),
        }}>
            <App />
        </Context.Provider> 
    )

}

export default root