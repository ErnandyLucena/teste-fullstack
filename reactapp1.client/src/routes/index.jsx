import { Routes, Route } from "react-router-dom";
import Consulta from "../pages/consulta";
import Home from "../pages/home";
import Graficos from "../pages/Relatorios";

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/consulta" element={<Consulta/>} />
            <Route path="/consulta/:id" element={<Consulta/>} />
            <Route path="/relatorio" element={<Graficos/>} />
        </Routes>
    )
}

export default RoutesApp;
