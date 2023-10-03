// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default function ProgressBar(props: any) {
  const { percentage } = props
  const PERCENTAGES = {
    quota: "w-[14%]",
    token: "w-[2%]",
  };
  return (
    <div className="bg-slate-100 rounded-xl h-2">
      <div
        className={`bg-primary h-full rounded-s-xl ${PERCENTAGES[percentage]}`}
      />
    </div>
  );
}