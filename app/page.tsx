import Image from "next/image"
import AboutItem from "@/components/about-item"
import image1 from "@/images/image1.jpg"
import image2 from "@/images/image2.jpg"
import image3 from "@/images/image3.jpg"
import Link from "next/link"

export default function About() {
  return (
    <div className="p-8">
      <h1 className=" text-center text-lg text-black font-semibold">Про нас</h1>

      <div className="flex flex-row">
        <AboutItem>Розвиток здорової дитини. Поради для батьків</AboutItem>
        <Image src={image1} alt="Picture of the children" width={250} />
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
    </div>
  )
}
