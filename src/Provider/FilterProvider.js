import React,{createContext,useState,useEffect} from 'react'
import useSearch from '../hooks/useSearch';
import UseFetch from '../hooks/useFetch';

export const FilterContext=createContext()
function FilterProvider({children}) {
    const {data,isLoading} = UseFetch('https://fakestoreapi.com/products');
    const [filteredproducts,setfilteredProducts]=useState(data|| [])
    useEffect(()=>{
        console.log("fetched data in filter")
        console.log(data)
        setfilteredProducts(data);
    },[data])
    const [filtertype,setfilterType]=useState("")
    const [search,setSearch]=useState("");
   
    const {filteredData}=useSearch(data,{filtertype:filtertype,value:search})
   
    useEffect(()=>{
        console.log("checking filter data for useSearch")
        console.log(filteredData)
        console.log("filter activated ")
        if(search)
        setfilteredProducts(filteredData)
      else
        setfilteredProducts(data);
      },[filteredData])
  return (
    <FilterContext.Provider value={{setfilterType,setSearch,filteredproducts,isLoading}}>
        {children}
    </FilterContext.Provider>
    
  )
}

export default FilterProvider
