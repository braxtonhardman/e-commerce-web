import ItemContainer from "./components/ItemContainer";
import ImageContainer from "./components/ImageContainer";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <ImageContainer /> 
      <ItemContainer />
    </div>
  );
}
