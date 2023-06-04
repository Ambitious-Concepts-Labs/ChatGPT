import Image from "../../../components/Image";
import ImageInput from "../../../components/ImageInput";

type Props = {
  params: {
    id: string;
  };
};

const Imagepage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Image section */}
      <Image imageId={id} />

      {/* Image input field */}
      <ImageInput imageId={id} />
    </div>
  );
};

export default Imagepage;
