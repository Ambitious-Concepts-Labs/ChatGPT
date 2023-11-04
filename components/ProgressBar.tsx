// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default function ProgressBar(props: any) {
  const { percentage } = props
  console.log({see: percentage, test: `w-[${percentage}%]`})
  return (
    <div className="bg-slate-100 rounded-xl h-2">
      <div
        className={`h-full bg-indigo-500 rounded-s-xl`}
        style={{width: `${percentage}%`}}
      />
    </div>
  );
}