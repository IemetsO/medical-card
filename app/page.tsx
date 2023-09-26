import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-col">
      <div className="mt-6">
        <Link
          className="p-6 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          href="about"
        >
          Read about our Project!
        </Link>
      </div>
      <div className="mt-6">
        <Link
          className="p-6 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          href="cards"
        >
          All cards
        </Link>
      </div>
      <div className="mt-6">
        <Link
          className="p-6 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          href="cards/create"
        >
          Create a card
        </Link>
      </div>
    </div>
  );
}
