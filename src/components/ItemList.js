import { useDispatch } from "react-redux";
import { MENU_IMG } from "../utils/constants";
import Veglogo from "../utils/veg-logo.png";
import { addItem } from "../utils/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ItemList = ({ items }) => {

  const showToastMessage = () => {
    toast.success('Item added to cart !', {
        position: toast.POSITION.BOTTOM_CENTER
    });
};

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    showToastMessage();
    // dispatch an action
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item?.card?.info?.id}
          className="w-6/12 m-auto text-left flex justify-between items-center"
        >
          <div className="w-9/12 mr-10 ml-1">
            <img className="w-3 mb-1" src={Veglogo} alt="" />
            <p className="font-semibold">{item.card.info.name}</p>
            <p className="font-normal text-[15px] mb-3">
              ₹{" "}
              {item.card.info.price
                ? item.card.info.price / 100
                : item.defaultPrice / 100}
            </p>
            <p className="text-gray-400 text-sm">{item.card.info.category}</p>
          </div>

          <div className="w-3/12 hover: cursor-pointer ml-20 mt-12">
            <img
              className="w-36 h-24 object-fill rounded-md"
              src={MENU_IMG + item.card.info.imageId}
              alt="image"
            />
            <button
              className="bg-white w-24 h-8 rounded-md relative bottom-5 left-6 m-auto text-green-500 font-semibold text-sm shadow-md hover:bg-green-500 hover:text-white"
              onClick={() => handleAddItem(item)}
            >
              ADD
            </button>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default ItemList;
