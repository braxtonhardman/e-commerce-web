import ProductDetails from "./components/ProductDetails"; // Client Component
import { getProduct } from "../../actions/item";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const item = await getProduct(Number(params.id)); // Call server action
    console.log(item)
    if (!item) {
        return <p>Product not found.</p>;
    }

    return <ProductDetails item={item} />;
}