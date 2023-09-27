"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/uikit/button";

export default function CardId() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <section>
        <h2>Дитинка</h2>
      </section>
      <Link href="/">
        <Button>назад до головної сторінки</Button>
      </Link>
    </div>
  );
}
