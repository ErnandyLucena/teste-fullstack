import { FiHome } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./home.css";
import img3 from "../../assets/img3.png";

export default function Home() {
  return (
    <div className="navbar-on">
      <Header />
      <div className="content">
        <Title name="Inicio">
          <FiHome size={25} />
        </Title>

        <div className="container-img-text">
          <div className="img">
            <img src={img3} alt="Consulta OS" />
          </div>

          <div className="text-content">
            <h1>Bem-vindo!</h1>
            <p className="p">
              Este sistema permite que você consulte de forma rápida e fácil a
              lista de beneficiários. O que você pode fazer aqui:
              <ul>
                <li>
                  Visualizar o nome e outras informações do beneficiario.
                </li>
                <li>
                  Navegar pelas páginas da lista, caso existam muitos registros.
                </li>
                <li>
                  Clicar no botão "Ver pontuação" para consultar a pontuação do
                  beneficiário.
                </li>
                <li>
                  A informação aparecerá em uma janela (modal), sem precisar
                  sair da página.
                </li>
                <li>
                  Diversas Visualizações na aba de relatórios
                </li>
                <li>
                  Aplicação é responsiva e se adeque tanto pra mobile, quanto desktop
                </li>
                <li>
                  realizei a lógica de verificar o intervalo de datas entre exames, retornando true ou false na page consulta com dados mockados
                </li>
              </ul>
            </p>
            <p className="p">
              Aplicação FullStack desenvolvida por Ernandy Lucena
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
