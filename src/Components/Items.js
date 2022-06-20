import { React, useContext, useEffect } from 'react'
import UrlContext from '../Context/URLContext';
import ItemList from './ItemList'
import Spinner from './Spinner';

const Items = () => {
    const context = useContext(UrlContext);

    const { Getproductdata, Spinnerupdate } = context;
    // const [isloading, setisLoading] = useState(false);

    useEffect(() => {
        Spinnerupdate(true);
        Getproductdata();
        setTimeout(() => {
            Spinnerupdate(false);
        }, 8000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <h2 className='titlename'>Shopnow</h2>
            {
                context.isloading ?
                    <Spinner isloading={context.isloading} />
                    :
                    <div className="row my-5 container mx-auto">
                        {context.products.map((ele) => {
                            return <div className="col-md-4 my-3 my-3" key={ele.itemurl}>
                                <ItemList price={ele.price} title={ele.title} imgurl={ele.imgurl} itemurl={ele.itemurl} platform={ele.platform} />
                            </div>
                        })}
                    </div>

            }


        </div>
    )

}

export default Items
