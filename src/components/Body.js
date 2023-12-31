import RestaurantCard, { WithPromotedLabel } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // Local State Variable - Superpower

  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [FilteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState();

  const { LoggedInUser, setUserName } = useContext(UserContext) 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.4924134&lng=77.673673&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(json);
      // Optional Chaining
      setListofRestaurants(
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredRestaurant(
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.error(error);
    }
  };

  const EnhancedComponent = WithPromotedLabel(RestaurantCard);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>No internet connection....!!</h1>;
  }

  return listofRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="w-full mr-40 mb-10">
      <div className="flex items-center mt-10 mb-10 ml-[190px]">
        <div className="flex justify-center items-center mr-4">
          <input
            type="text"
            data-testid="searchInput"
            className="w-80 h-10 border-[1px] border-gray-300 m-2 rounded-md p-3 outline-none focus-within:border-gray-400 "
            placeholder="Search for Chicken Biryani"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            className="hover:drop-shadow-xl bg-gradient-to-r from-orange-500 to-amber-500 h-10 text-white p-1 w-28 rounded-md flex justify-center items-center"
            onClick={() => {
              const filteredList = listofRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText?.toLowerCase())
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
            <span className="ml-2">Search</span>
          </button>
        </div>
        <button
          className="hover:drop-shadow-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1 rounded-md w-48 h-10"
          onClick={() => {
            filterdata = listofRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurant(filterdata);
          }}
        >
          Top Rated Restaurants
        </button>

{/* ----------------------------------------------------------------------------------------------- */}

        <div className="ml-5">
          <label htmlFor="">UserName : </label>
          <input className="border-[1px] border-gray-300 m-2 rounded-md p-2 text-gray-400 outline-none focus-within:border-gray-400" type="text" onChange={(e) => setUserName(e.target.value)} value={LoggedInUser}/>
        </div>
      </div>

{/* ----------------------------------------------------------------------------------------------- */}

      <div className="">
        <h1 className="font-bold text-2xl font-sans mb-7 ml-[192px] text-gray-800">
          Restaurants with online food delivery in Mathura
        </h1>
      </div>
      <div className="flex flex-wrap justify-start mx-[180px]">
        {FilteredRestaurant?.map((restaurant) => (
          <Link
            className="Text"
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
          >
            {restaurant?.info?.aggregatedDiscountInfoV3 ? 
              <EnhancedComponent resData={restaurant} /> :
              <RestaurantCard resData={restaurant} />
            }
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
