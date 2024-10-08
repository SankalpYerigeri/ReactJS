import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const ItemList = ({data}) =>
{
    const dispatch = useDispatch();
    const handleAddItem = (item) =>
    {
        dispatch(addItem(item));
    };

    console.log(data);
    return (
        <div>
            {data.map((item)=>(
                <div key={item.card.info.id} className="p-2 m-2 border-b-2 border-gray-400 text-left justify-between">
                    <div>
                    <div className="p-2 w-9/12">
                        <span>{item.card.info.name}</span>
                        <span> - ${item.card.info.price ? item.card.info.price/100 : item.card.info.defaultPrice/100}</span>

                    </div>
                        <p className="text-xs">{item.card.info.description}</p>
                        </div>
                        <div className="w-3/12 p-4 ">
                            <img src={CDN_URL + item.card.info.imageId} className="w-full"/>
                            <button className="p-2 rounded-lg bg-green-200" onClick={()=>handleAddItem(item)}>Add</button>
                        </div>
                </div>
                
            ))}
        </div>
    )
}

export default ItemList;