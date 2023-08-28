export default function Card(props: any) {
  const { children, row, span } = props
  return (
    <div className={`bg-white py-4 px-5 rounded-sm ${span && "lg:col-span-2"}`}>
      <div
        className={`flex flex-col ${
          row ? "sm:flex-row justify-between" : "flex-col"
        }`}
      >
        {children}
      </div>
    </div>
  );
}