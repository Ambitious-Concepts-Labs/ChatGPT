"use client";

import { useRouter } from "next/navigation";

export default function NavList({ title, items, askQuestion, setAskQuestion }) {
  const router = useRouter();
  return (
    <div>
      <div className="uppercase text-2xs font-semibold pb-3 tracking-wider text-slate-400">
        {title}
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center justify-between">
            {item.title === "Support" ? (
              <a
                onClick={() => setAskQuestion(!askQuestion)}
                href={item.src}
                className={`flex items-center gap-3 ${
                  router !== item.src && "text-slate-400"
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium text-xs tracking-wide">
                  {item.title}
                </span>
              </a>
            ) : (
              <a
                href={item.src}
                className={`flex items-center gap-3 ${
                  router !== item.src && "text-slate-400"
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium text-xs tracking-wide">
                  {item.title}
                </span>
              </a>
            )}
            {item.badge && (
              <div className="px-2 py-0.5 rounded-full bg-yellow-400 opacity-75 font-semibold text-2xs">
                {item.badge}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
