import Link from "next/link";

export default function Button(props: any) {
  const { variant, type, href, text, icon, animation } = props
  const VARIANTS: any = {
    black: "bg-black text-white",
    white: "hover:bg-primary border",
    whiteFill: "bg-white text-black hover:bg-primary",
  };

  const classes = `col-start-3 justify-self-end md:col-start-2 
  md:row-start-1 md:justify-self-end w-fit px-2 py-2 rounded-md 
  text-xs font-light flex items-center gap-2 cursor-pointer 
  ${VARIANTS[variant]}`;

  return (
    <>
      {type === "link" ? (
        <Link  className={classes} href={href}>
          <div className="h-4 w-4 relative">{icon}</div>
          <div className="text-xs font-medium">{text}</div>
        </Link>
      ) : (
        <button className={classes}>
          <div className="h-4 w-4 relative">{icon}</div>
          {animation ? 
          <div className="text-xs font-medium text-white font-bold text-3xl animate-pulse">{text}</div>
          :
          <div className="text-xs font-medium">{text}</div>
          }
        </button>
      )}
    </>
  );
}