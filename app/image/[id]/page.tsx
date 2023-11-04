import { ImageInput, Image } from "../(components)/components"
interface Props {
  params: {
    id: string;
  };
}

function Imagepage({ params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Image section */}
      <Image imageId={id} />

      {/* Image input field */}
      <ImageInput imageId={id} />
    </div>
  );
}

export default Imagepage;
