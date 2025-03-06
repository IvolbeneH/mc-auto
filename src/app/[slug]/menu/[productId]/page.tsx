import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeft, ScrollText } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { ProductHeader } from "./components/products-header";

interface ProductsPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { productId, slug } = await params;
  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) return notFound();
  return (
    <>
      <ProductHeader product={product} />
    </>
  );
}
