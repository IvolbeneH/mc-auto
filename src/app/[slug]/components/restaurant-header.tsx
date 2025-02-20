"use client";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeft, ScrollText } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl"> | null;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  if (!restaurant) return notFound();
  const handleBackPage = () => router.back();

  const router = useRouter();

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackPage}
      >
        <ChevronLeft />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollText />
      </Button>
    </div>
  );
}
