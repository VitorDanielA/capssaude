import Card from "./Card";
import Cerebro from './../assets/cerebro.png';
import Coracao from './../assets/coracao.png';
import ApertoDeMaos from './../assets/aperto-de-mao.png';
import Conversa from './../assets/programa-de-entrevista.png';
import Examinando from './../assets/examinador-medico.png';

export default function Especialidades(){
    return(
        <div className="min-h-[100vh]" id="about">
            <h1 className="text-5xl text-center mb-10 font-semibold">Nossas Especialidades</h1>
            <div className=" flex items-center justify-center flex-wrap">
                <Card imagem={Cerebro} descricao="O Departamento de Psiquiatria é dedicado ao estudo, diagnóstico e tratamento de distúrbios mentais, emocionais e comportamentais." titulo="Psiquiatra"/>
                <Card imagem={Conversa} descricao="O Departamento de Psicologia é focado no estudo do comportamento humano e dos processos mentais." titulo="Psicologo"/>
                <Card imagem={ApertoDeMaos} descricao="O Departamento de Assistência Social concentra-se em fornecer suporte e recursos para indivíduos e comunidades que enfrentam desafios sociais, emocionais e econômicos." titulo="Assistênte Social"/>
                <Card imagem={Coracao} descricao="O Departamento de Saúde é responsável por fornecer cuidados de saúde abrangentes e holísticos para indivíduos e comunidades." titulo="Saúde"/>
                <Card imagem={Examinando} descricao="O Departamento de Neurologia é especializado no estudo e tratamento de distúrbios relacionados ao sistema nervoso." titulo="Neurologia"/>
            </div>
        </div>
        
    )
}