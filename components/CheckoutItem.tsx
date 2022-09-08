import Image from "next/image";

function CheckoutItem({ item }) {
  const qty = item.qty;
  // Returning the JSX
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-gray-300 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 max-w-[60px] rounded-full relative">
          <Image
            src={item.imageURL}
            alt={item.title}
            layout="fill"
            className="object-contain"
          />
        </div>
        <p className=" text-base text-headingColor">{item.title}</p>
      </div>
      <p className=" text-xs block text-gray-500 font-semibold">
        {qty} x {item.price} Dhs ={" "}
        <span className="text-sm">{(qty * item.price).toFixed(2)} Dhs</span>
      </p>
    </div>
  );
}

export default CheckoutItem;
