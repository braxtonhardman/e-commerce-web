import ProductDetails from "./components/ProductDetails"; // Client Component
import { getProduct } from "../../actions/item";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
    const item = await getProduct(Number(id)); // Call server action
    if (!item) {
        return <p>Product not found.</p>;
    }

    return <ProductDetails item={item}/>
}