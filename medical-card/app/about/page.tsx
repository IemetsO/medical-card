import Link from "next/link";


export default function About() {
  return (
    <div className="p-10">
      <div className="m-auto">
      <h1 className="p-6 text-center text-lg text-black font-semibold">Здорова дитина</h1>
      </div>
      <div className="">
        <li className="p-4 hover:bg-slate-100 text-slate-500 font-small  max-w-sm mx-auto bg-lightgray rounded-xl shadow-lg flex items-center space-x-4">
          Розвиток здорової дитини. Поради для батьків
        </li>
        <li className="p-4 hover:bg-slate-100 text-slate-500 font-small max-w-sm mx-auto bg-lightgray rounded-xl shadow-lg flex items-center space-x-4">
          Найпоширеніші хвороби дітей. Інформація для батьків
        </li>
        <li className="p-4 hover:bg-slate-100 text-slate-500 font-small max-w-sm mx-auto bg-lightgray rounded-xl shadow-lg flex items-center space-x-4">
          Особистий кабінет із можливістю вносити показники ваги, зросту дитини
          та отримані щеплення
        </li>
      </div>
     

      <div className="p-6 text-center">
        <Link
          className=" bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          href="/"
        >
          назад до головної сторінки
        </Link>
      
      </div>
    </div>
  );
}
