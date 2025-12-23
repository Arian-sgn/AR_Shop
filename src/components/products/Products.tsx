import type { mpt } from "../../types/Types";

export default function Products({ title, image, description, price }: mpt) {
  return (
    <article className="h-96 flex flex-col text-right rounded-3xl border border-gray-200 bg-white shadow-md overflow-hidden">
      <div className="w-full aspect-3/4 bg-gray-100 h-1/2">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-2 p-3">
        <header className="flex flex-row-reverse items-center justify-between border-b border-gray-200 pb-2">
          <h2 className="text-sm font-semibold line-clamp-2">{title}</h2>

          <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">
            {price.toLocaleString("fa-IR")} تومان
          </span>
        </header>

        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </article>
  );
}
