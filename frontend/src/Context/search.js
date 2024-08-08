import {useState, createContext, useContext} from 'react';

const SearchContext = createContext();

const SearchProvider = (props) => {
    const [auth, setAuth ] = useState({
        keyword: '',
        results: [],
    });
            
    return(
        <SearchContext.Provider value={[auth, setAuth]}>
            {props.children}
        </SearchContext.Provider>
    )
};

const useSearch = () => useContext(SearchContext);
export {useSearch, SearchProvider};