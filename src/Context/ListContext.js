import React, { createContext, useState } from "react";

const ListContext = createContext({ items: [], setItems: () => null });

const ListProvider = ({children}) => {
    const [items, setItems] = useState([]);
    
    return (
        <ListContext.Provider value={{ items, setItems }}>
            {children}
        </ListContext.Provider>
    );
}

export default ListContext;

export {
    ListProvider
}