import ProductInCart from "../../components/productInCart/ProductInCart";

function Cart() {
  return (
    <div className="mt-8">
      <ProductInCart />

      <div className="border border-gray-300 shadow-md rounded-xl p-8 mx-5 my-6 text-center bg-white space-y-2">
        <p className="text-gray-700">مجموع قیمت‌ها</p>
        <p className="text-gray-700">مبلغ تخفیف</p>
        <p className="text-green-600 font-semibold text-lg">جمع کل</p>
      </div>

      <div className="flex justify-center mt-6 mb-10 group">
        <button
          className="bg-green-500 text-white rounded-full px-10 py-3 shadow-lg 
    border border-green-700 text-lg font-medium
    transition-all duration-300 
    hover:bg-green-600 hover:scale-105 active:scale-95
    animate-pulse
        "
        >
          سفارش محصول
        </button>
      </div>
    </div>
  );
}

export default Cart;
