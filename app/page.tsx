import Link from "next/link";
import { Button } from "@/components/uikit/button";

export default function Home() {
  return (
    <div className="flex-col">
      <div className="mt-6">
        <Link href="about">
          <Button>Структура проекту</Button>
        </Link>
      </div>
      <div className="mt-6">
        <Link href="cards">
          <Button>Створені картки</Button>
        </Link>
      </div>
      <div className="mt-6">
        <Link href="cards/create">
          <Button>Створити карточку</Button>
        </Link>
      </div>
    </div>
  );
}
