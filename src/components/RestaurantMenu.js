import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { base_menu_url, end_url } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCategory from "./RestaurantCategory";


const RestaurantMenu = () =>
{
    const resId = useParams();
    console.log(resId);

    const [showIndex, setShowIndex] = useState(null);

    
    
    const [resInfo, setresInfo] = useState(null);
    useEffect(()=>
    {
        fetchMenu();
    }, []);


    const fetchMenu = async () =>
    {
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9584211&lng=77.67944109999999&restaurantId=489129&catalog_qa=undefined&submitAction=ENTER");

        const json = await data.json();

        console.log(json);
        setresInfo(json.data);
        console.log(resInfo);
    }

    if ( resInfo === null) return (<Shimmer/>)

    const {name, cuisines, costForTwo} = resInfo.cards[2]?.card?.card.info;

    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card.categories[1];
    console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
    console.log(itemCards);

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>c.card?.card?.["@type"] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory');
    console.log("The categories", categories);
    


    return (
        <>
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <h3 className="font-bold text-lg">{cuisines.join(", ")}</h3>

           { /* Categories accordian */}
           {categories.map((category, index)=>//Controlled Component
            (
            <RestaurantCategory
            showItems={index === showIndex ? true : false}
            catdata={category?.card.card}
            setShowIndex={()=>setShowIndex(index)}/>
            ))}
            
        </div>
        </>
    );
};

export default RestaurantMenu;