import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { buscarAtendimentos } from "../../services/AtendimentosService";
import "./PieChartAtendimentos.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartTiposAtendimentos = () => {
  const [tipos, setTipos] = useState({});

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resposta = await buscarAtendimentos(1, 1000); 
        const atendimentos = resposta.items || resposta; 
        const contagem = {};

        atendimentos.forEach((at) => {
          if (at.tipoAtendimento) {
            contagem[at.tipoAtendimento] = (contagem[at.tipoAtendimento] || 0) + 1;
          }
        });

        setTipos(contagem);
      } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
      }
    };

    carregarDados();
  }, []);

  const data = {
    labels: Object.keys(tipos),
    datasets: [
      {
        label: "Atendimentos por Tipo",
        data: Object.values(tipos),
        backgroundColor: [
          "#4CAF50",
          "#66bb6a",
          "#81c784",
          "#a5d6a7",
          "#c8e6c9",
          "#2e7d32",
          "#1b5e20"
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 5,
      },
    },
  };

  return (
    <div className="chart-wrapper-pie">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartTiposAtendimentos;
