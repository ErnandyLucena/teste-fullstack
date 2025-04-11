import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { buscarAtendimentos } from "../../services/AtendimentosService";
import "./BarChartAtendimentosMensais.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartAtendimentosMensais = () => {
  const [atendimentosPorMes, setAtendimentosPorMes] = useState(Array(12).fill(0));

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const atendimentos = await buscarAtendimentos();
        const contagemMes = Array(12).fill(0);

        atendimentos.forEach((at) => {
          if (at.dataAtendimento) {
            const data = new Date(at.dataAtendimento);
            const mes = data.getMonth(); 
            contagemMes[mes]++;
          }
        });

        setAtendimentosPorMes(contagemMes);
      } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
      }
    };

    carregarDados();
  }, []);

  const data = {
    labels: [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ],
    datasets: [
      {
        label: "Atendimentos",
        data: atendimentosPorMes,
        backgroundColor: "#4CAF50",
        borderColor: "#2e7d32",
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: "#66bb6a",
        barThickness: 50
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
    scales: {
      x: {
        ticks: {
          color: "#333",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#333",
        },
        grid: {
          color: "#ddd",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-wrapper-line-bar">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartAtendimentosMensais;
