import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link
        className="p-6 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        href="about"
      >
        Read about our Project!
      </Link>
    </>
  );
}
