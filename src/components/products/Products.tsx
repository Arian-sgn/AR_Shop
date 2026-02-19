import type { mpt } from "../../types/Types";

export default function Products({ title, image, description, price }: mpt) {
  
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border-(--border) ring-1 ring-(--ring) shadow-(--shadow-md) hover:shadow-(--shadow-sm) transition-all duration-300 hover:-translate-y-1">
      {/* بخش تصویر */}
      <div className="relative aspect-3/4 w-full overflow-hidden p-4 bg-(--pms-b)">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* بخش توضیحات */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-4" dir="rtl">
        <div>
          <header className="mb-2 flex items-start justify-between gap-2">
            <h2 className="line-clamp-2 text-sm font-bold text-(--text) sm:text-base">
              {title}
            </h2>
          </header>
          
          <p className="line-clamp-3 text-xs leading-relaxed text-(--text-muted) sm:text-sm">
            {description}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-end border-t border-(--a) pt-3">
          <span className="text-sm font-bold text-(--primary) sm:text-base">
            {price.toLocaleString("fa-IR")} <span className="text-sm font-normal text-(--a)">تومان</span>
          </span>
        </div>
      </div>
    </article>
  );
}