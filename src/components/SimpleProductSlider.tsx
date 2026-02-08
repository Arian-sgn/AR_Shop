import { useRef } from "react";
import type { mpt } from "../types/Types";
import Products from "./products/Products";

function SimpleProductSlider({ products }: { products: mpt[] }) {

  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full mb-10">
      
      <div className="relative rounded-3xl ring-4 ring-[#00c0ff] p-4 md:p-4 bg-(--bg)">
        
        <button
          onClick={() => scroll(-320)}
          className="hidden md:flex absolute left-4 top-1/2 z-10 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-(--surface) text-(--primary-soft) shadow-lg ring-1 ring-[#00c0ff] transition hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={() => scroll(320)}
          className="hidden md:flex absolute right-4 top-1/2 z-10 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-(--surface) text-(--primary-soft) shadow-lg ring-1 ring-[#00c0ff] transition hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((item) => (
            <div
              key={item.id}
             
              className="min-w-[60%] snap-center sm:min-w-[40%] md:min-w-[300px]"
            >
              
              <div className="h-full mt-2">
                <Products {...item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimpleProductSlider;