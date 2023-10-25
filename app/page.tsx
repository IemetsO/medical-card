import Link from "next/link"
import Image from "next/image"
import AboutItem from "@/components/about-item"
import image1 from "@/images/image1.jpg"
import image2 from "@/images/image2.jpg"
import image3 from "@/images/image3.jpg"

export default function About() {
  return (
    <div className="mt-10">
      <div className="m-auto">
        <h1 className="mt-10 text-center text-lg text-black font-semibold">
          Про нас
        </h1>
      </div>
      <div className="flex flex-row">
        <AboutItem>Розвиток здорової дитини. Поради для батьків</AboutItem>
        <Image
          src={image1}
          alt="Picture of the children"
          width={250}

          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      </div>
      <div className="flex flex-row">
        <Image src={image2} alt="Picture of the children" width={250} />
        <AboutItem>
          Найпоширеніші хвороби дітей. Інформація для батьків
        </AboutItem>
      </div>
      <div className="flex flex-row">
        <AboutItem>
          Особистий кабінет із можливістю вносити показники ваги, зросту дитини
          та отримані щеплення
        </AboutItem>
        <Image src={image3} alt="Picture of the children" width={250} />
      </div>

      <div className="mt-10 text-center">
        <Link
          className=" bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          href="/"
        >
          назад до головної сторінки
        </Link>
      </div>
    </div>
  )
}
