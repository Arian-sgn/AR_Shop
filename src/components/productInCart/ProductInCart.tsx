function ProductInCart() {
  return (
    <div className="flex flex-row-reverse justify-center">
      <div className="flex flex-row-reverse items-center border border-gray-300 rounded-2xl shadow-lg bg-white px-10 py-7 mt-10 mb-4">
        
        <div className="w-52 text-center flex flex-col items-center">
          <img
            className="shadow-md rounded-2xl w-full"
            src="https://dkstatics-public.digikala.com/digikala-products/8e9cba47018ee786b6ea7f1226bbbeb080db1055_1753869155.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
            alt="product"
          />
          <p className="text-xl font-medium mt-3">عنوان محصول</p>
        </div>

        {/* کنترل‌ها */}
        <div className="flex flex-row-reverse items-center mr-20 gap-4">
          <button className="text-green-600 text-2xl px-3 py-1 border border-green-300 rounded-lg hover:bg-green-50 transition">
            +
          </button>

          <p className="text-lg font-semibold">4</p>

          <button className="text-green-600 text-2xl px-3 py-1 border border-green-300 rounded-lg hover:bg-green-50 transition">
            -
          </button>

          <button className="text-red-500 text-sm hover:text-red-600 transition">
            حذف از سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInCart;
