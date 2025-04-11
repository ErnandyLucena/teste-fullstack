import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import PieChartTiposAtendimentos from "../../components/Graphs/PieChartTiposAtendimentos";
import BarChartAtendimentosMensais from "../../components/Graphs/BarChartAtendimentosMensais";
import { FiCompass } from "react-icons/fi";
import "./relatorio.css";
import LineChartAtendimentosPorData from "../../components/Graphs/LineChartAtendimentos";
import PieChartFaixaEtaria from "../../components/Graphs/PieChartFaixaEtaria";
import HorizontalBarBeneficiarios from "../../components/Graphs/HorizontalBarBeneficiarios";

import { buscarBeneficiarios } from "../../services/BeneficiariosService";
import { buscarAtendimentos } from "../../services/AtendimentosService";

const Relatorios = () => {
  const [beneficiariosSemAtendimento, setBeneficiariosSemAtendimento] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const pageSize = 100;
        let page = 1;
        let todosBeneficiarios = [];
        let todosAtendimentos = [];
        let maisDados = true;

        // Carregar beneficiários paginados
        while (maisDados) {
          const beneficiariosPagina = await buscarBeneficiarios(page, pageSize);
          if (beneficiariosPagina.length === 0) break;
          todosBeneficiarios = [...todosBeneficiarios, ...beneficiariosPagina];
          if (beneficiariosPagina.length < pageSize) {
            maisDados = false;
          } else {
            page++;
          }
        }

        const atendimentos = await buscarAtendimentos(1, 1000);
        todosAtendimentos = atendimentos;

        const umAnoAtras = new Date();
        umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1);

        const idsComAtendimentoRecente = new Set(
          todosAtendimentos
            .filter(a => new Date(a.dataAtendimento) > umAnoAtras)
            .map(a => a.beneficiarioId)
        );

        const filtrados = todosBeneficiarios.filter(b =>
          b.ativo && !idsComAtendimentoRecente.has(b.id)
        );

        setBeneficiariosSemAtendimento(filtrados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className="container">
      <div className="header navbar-on">
        <Header />
      </div>

      <div className="content">
        <div className="titleWrapper">
          <Title name="Relatório">
            <FiCompass size={25} />
          </Title>
        </div>

        <div className="chartsGrid">
          <div className="chartBoxContainer">
            <h1>Tipo de Atendimentos</h1>
            <div className="chartBox">
              <PieChartTiposAtendimentos />
            </div>
          </div>

          <div className="chartBoxContainer">
            <h1>Faixa Etária</h1>
            <div className="chartBox">
              <PieChartFaixaEtaria />
            </div>
          </div>

          <div className="chartBoxContainer">
            <h1>Atendimentos Benef.</h1>
            <div className="chartBox">
              <HorizontalBarBeneficiarios />
            </div>
          </div>

          <div className="chartBoxContainer fullWidth">
            <h1>Atendimentos Mensais</h1>
            <div className="chartBoxFull">
              <BarChartAtendimentosMensais />
            </div>
          </div>

          <div className="chartBoxContainer fullWidth">
            <h1>Atendimentos por Data</h1>
            <div className="chartBoxFull">
              <LineChartAtendimentosPorData />
            </div>
          </div>
        </div>

        <section className="tableSection">
          <h3>Beneficiários ativos sem atendimentos no último ano</h3>
          <div className="styled-table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Data de Nascimento</th>
                </tr>
              </thead>
              <tbody>
                {beneficiariosSemAtendimento.map((b, index) => (
                  <tr key={index}>
                    <td>{b.nome}</td>
                    <td>
                      <span className={`status-dot ${b.ativo ? 'ativo' : 'inativo'}`}></span>
                      {b.ativo ? "Ativo" : "Inativo"}
                    </td>
                    <td>{new Date(b.dataNascimento).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Relatorios;
