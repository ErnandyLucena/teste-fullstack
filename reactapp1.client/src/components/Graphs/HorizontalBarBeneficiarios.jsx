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
import { buscarBeneficiarios } from "../../services/BeneficiariosService";
import "./PieChartAtendimentos.css"; 

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HorizontalBarBeneficiarios = () => {
  const [labels, setLabels] = useState([]);
  const [valores, setValores] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [atendimentos, beneficiarios] = await Promise.all([
          buscarAtendimentos(1, 1000),
          buscarBeneficiarios(1, 1000),
        ]);

        const mapaBeneficiarios = {};
        beneficiarios.forEach((b) => {
          mapaBeneficiarios[b.id] = b.nome;
        });

        const contagem = {};
        atendimentos.forEach((at) => {
          const nome = mapaBeneficiarios[at.beneficiarioId] || "Desconhecido";
          contagem[nome] = (contagem[nome] || 0) + 1;
        });

        const top = Object.entries(contagem)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);

        setLabels(top.map(([nome]) => nome));
        setValores(top.map(([_, total]) => total));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    carregarDados();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total de Atendimentos",
        data: valores,
        backgroundColor: "#007f00",
        borderColor: "#004d00",
        borderWidth: 2,
        borderRadius: 10,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y", 
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
          color: "#ddd",
        },
        beginAtZero: true,
      },
      y: {
        ticks: {
          color: "#333",
          font: { size: 14, weight: "bold" },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="chart-wrapper-pie">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarBeneficiarios;
