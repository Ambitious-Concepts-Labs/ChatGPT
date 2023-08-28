export default function Header(props: any) {
  const { docId } = props
  return (
    <header className="flex items-center justify-between px-8 py-2 md:py-4 border-b">
      <div className="font-bold text-sm md:text-xl">2023-07-19 Untitled</div>
      <button className="px-4 py-2 rounded-md bg-c-light-green text-white text-xs font-bold">
        New Project
      </button>
    </header>
  );
}