import Image, { StaticImageData } from "next/image";

interface propsMiniCard{
    img: StaticImageData;
    titulo: string;
    descricao: string;
}

export default function MiniCard(props:propsMiniCard){
    return(
        <div className={`w-[180px] h-[100px] border-2 border-gray-400  rounded-lg mt-5 bg-white flex flex-col items-center justify-center mx-3 px-3`}>
            <Image src={props.img} alt="endress"/>
            <h5 className="font-semibold text-mg">{props.titulo}</h5>
            <p className="text-gray-500 cursor-pointer">{props.descricao}</p>
        </div>
    )
}