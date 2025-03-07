import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductHeader } from "./components/products-header";
import { ProductsDetails } from "./components/products-details";

interface ProductsPageProps {
  params: Promise<{ productId: string; slug: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });
  if (!product) {
    return notFound();
  }
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }
  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductsDetails product={product} />
    </div>
  );
}
