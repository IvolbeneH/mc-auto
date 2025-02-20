import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { RestaurantHeader } from "../components/restaurant-header";
import { RestaurantCategories } from "../components/restaurant-categories";

interface RestaurantsMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

function isConsumptionMethodIsValid(consumptionMethod: string) {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

export default async function RestaurantsMenuPage({
  params,
  searchParams,
}: RestaurantsMenuPageProps) {
  const { slug } = await params;

  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodIsValid(consumptionMethod)) return notFound();

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  });

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
