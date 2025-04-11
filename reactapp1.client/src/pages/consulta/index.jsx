import {
  FiMessageCircle,
  FiChevronRight,
  FiChevronLeft,
  FiEye,
} from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./consulta.css";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { buscarBeneficiarios } from "../../services/BeneficiariosService";

const formatarData = (dataISO) => {
  if (!dataISO) return "-";
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const intervaloExamesValido = (datas) => {
  const datasConvertidas = datas
    .map((data) => new Date(data))
    .sort((a, b) => a - b);

  for (let i = 1; i < datasConvertidas.length; i++) {
    const diferenca =
      (datasConvertidas[i] - datasConvertidas[i - 1]) / (1000 * 60 * 60 * 24);
    if (diferenca <= 183) {
      return false;
    }
  }

  return true;
};

export default function Consulta() {
  const [infoBeneficiarios, setInfoBeneficiarios] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [conteudoModal, setConteudoModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultadoExames, setResultadoExames] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await buscarBeneficiarios(currentPage, itemsPerPage);
        setInfoBeneficiarios(data);
      } catch (error) {
        console.error("Erro ao buscar beneficiários:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  function handleOpenModal(info) {
    setConteudoModal(info);
    setShowPostModal(true);
  }

  function handleNextPage() {
    if (infoBeneficiarios.length === itemsPerPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function verificarExames() {
    // dados mockados aqui
    const examesSimulados = ["2023-01-10", "2023-07-20"];
    const resultado = intervaloExamesValido(examesSimulados);
    setResultadoExames(resultado);
  }

  const beneficiariosFiltrados = infoBeneficiarios.filter((b) =>
    b.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="navbar-on">
      <Header />

      <div className="content">
        <Title name="Infos. do Beneficiário">
          <FiMessageCircle size={25} />
        </Title>

        <div className="barra-acoes">
          <input
            type="text"
            className="input-pesquisa"
            placeholder="Pesquisar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={verificarExames} className="btn-verificar">
            Verificar exames
          </button>
        </div>

        {resultadoExames !== null && (
          <p
            style={{
              margin: "10px 0",
              color: resultadoExames ? "green" : "red",
            }}
          >
            {resultadoExames
              ? "Todos os exames estão com mais de 6 meses de intervalo."
              : "Existe exame com intervalo inferior a 6 meses."}
          </p>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {beneficiariosFiltrados.map((info) => (
              <tr
                key={info.id}
                onClick={() => handleOpenModal(info)}
                style={{ cursor: "pointer" }}
              >
                <td>{info.id}</td>
                <td>{info.nome}</td>
                <td>{formatarData(info.dataNascimento)}</td>
                <td>
                  <span
                    className={`status-dot ${
                      info.ativo ? "ativo" : "inativo"
                    }`}
                  ></span>
                  {info.ativo ? "Ativo" : "Inativo"}
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(info);
                    }}
                    className="visualizar-btn"
                    title="Visualizar"
                  >
                    <FiEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <FiChevronLeft size={18} />
          </button>
          <span style={{ margin: "0 10px" }}>Página {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={infoBeneficiarios.length < itemsPerPage}
          >
            <FiChevronRight size={18} />
          </button>
        </div>

        {showPostModal && (
          <Modal
            conteudo={conteudoModal}
            close={() => setShowPostModal(false)}
          />
        )}
      </div>
    </div>
  );
}
