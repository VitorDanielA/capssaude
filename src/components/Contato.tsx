import Image from 'next/image';
import Mapa from './../assets/Mapa.png';
import Celular from './../assets/celular.png';
import Email from './../assets/e-mail.png';
import Maps from './../assets/maps-and-location.png';
import MiniCard from './MiniCard';
import Sidebar from './Sidebar';

export default function Contato(){
    return(
        <div className="min-h-[100vh] text-center">
            <Sidebar/>
            <h1 className="text-5xl text-center my-10 font-semibold">Informações de Contato</h1>
            <div className="flex flex-wrap items-center w-full justify-around mt-28">
                <div className='w-[450px] flex flex-col sm:ms-10'>
                    <h2 className='text-2xl font-medium'>Consiga Informações e Conselhos <br />Com Profissionais</h2>
                    <div className='flex flex-wrap justify-center'>
                        <MiniCard img={Celular} titulo='Telefone' descricao='00 12345-6789'/>
                        <MiniCard img={Email} titulo='Email' descricao='capssaude@gmail.com'/>
                       
                        <MiniCard img={Maps} titulo='Localização' descricao='Irecê BA'/>
                        
                    </div>
                </div>
                <div className='mt-10 p-3.5'>
                    <Image src={Mapa} alt='mapa' width={700}/>
                </div>
            </div>
        </div>
    )
}