import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { buscarPontuacao } from "../../services/BeneficiariosService"; 
import "./modal.css";

const formatarData = (dataISO) => {
  if (!dataISO) return "-";
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function Modal({ conteudo, close }) {
  const [pontuacao, setPontuacao] = useState("-");
  const [qtdAtendimentos, setQtdAtendimentos] = useState("-");

  useEffect(() => {
    const carregarPontuacao = async () => {
      try {
        const dados = await buscarPontuacao(conteudo?.id);
        setPontuacao(dados?.pontuacaoTotal ?? "-");
        setQtdAtendimentos(dados?.quantidadeAtendimentos ?? "-");
      } catch (error) {
        console.error("Erro ao buscar pontuação:", error);
      }
    };

    if (conteudo?.id) {
      carregarPontuacao();
    }
  }, [conteudo]);

  return (
    <div className="modal2">
      <div className="container2">
        <button className="close" onClick={close}>
          <FiX size={25} color="#FFF" /> Voltar
        </button>

        <main>
          <h2>Detalhes do Beneficiário</h2>

          <div className="row">
            <span>
              Id: <i>{conteudo?.id}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Nome: <i>{conteudo?.nome}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Data de Nascimento: <i>{formatarData(conteudo?.dataNascimento)}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Pontuação Total: <i>{pontuacao}</i>
            </span>
            <span>
              Atendimentos: <i>{qtdAtendimentos}</i>
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
