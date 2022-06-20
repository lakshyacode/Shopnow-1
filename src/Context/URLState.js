import { useState } from "react";
import UrlContext from "./URLContext";

const URLState = (props) => {
    const baseurl = 'https://shopnowapi.azurewebsites.net/shopnow/'
    // this.setState({loading:true});
    const [products, setProducts] = useState([]);
    const [isloading, setisLoading] = useState(false);


    const Getproductdata = async () => {
        let data = await fetch(`${baseurl}laptop`);
        let parsedata = await data.json();
        setProducts(parsedata);

    }
    const UpdateUrl = async (Searchedword) => {
        Spinnerupdate(true);
        let data = await fetch(`${baseurl}${Searchedword}`);
        let parsedata = await data.json();
        setProducts(parsedata);
        Spinnerupdate(false);
    }

    const Spinnerupdate = async (flag) => {
        setisLoading(flag);
    }
    return (
        <UrlContext.Provider value={{ products, isloading, Getproductdata, UpdateUrl, Spinnerupdate }}>
            {props.children}
        </UrlContext.Provider>
    )
}

export default URLState