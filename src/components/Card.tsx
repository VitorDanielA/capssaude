import Image, { StaticImageData } from "next/image";

interface propsCard{
    descricao: string;
    titulo: string;
    imagem: StaticImageData;
}

export default function Card(props:propsCard){
    return(
        <div className="w-[300px] h-[300px] border rounded-xl border-neutral-400 flex items-center justify-center flex-col text-center mx-5 my-5 hover:bg-blue-500 hover:text-white cursor-pointer">
            <Image src={props.imagem} alt="ImgTema"/>
            <h3 className="font-bold text-lg mt-3">{props.titulo}</h3>
            <p className="font-medium max-w-[290px]">{props.descricao}</p>
        </div>
    )
}