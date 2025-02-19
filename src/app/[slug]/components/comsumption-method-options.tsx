import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ConsumptionMethodOptionProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

export function ConsumptionMethodOption({
  buttonText,
  imageAlt,
  imageUrl,
  option,
  slug,
}: ConsumptionMethodOptionProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={78}
          height={80}
          className="object-contain"
        />

        <Button variant="secondary" asChild className="rounded-full">
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
