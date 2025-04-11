import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { buscarBeneficiarios } from "../../services/BeneficiariosService";
import "./PieChartFaixaEtaria.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartFaixaEtaria = () => {
  const [faixas, setFaixas] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const beneficiarios = await buscarBeneficiarios(1, 1000); 
        const contagem = [0, 0, 0, 0, 0]; 

        beneficiarios.forEach((b) => {
          if (!b.dataNascimento) return;

          const nascimento = new Date(b.dataNascimento);
          const hoje = new Date();
          const idade = hoje.getFullYear() - nascimento.getFullYear();

          if (idade <= 18) contagem[0]++;
          else if (idade <= 30) contagem[1]++;
          else if (idade <= 45) contagem[2]++;
          else if (idade <= 60) contagem[3]++;
          else contagem[4]++;
        });

        setFaixas(contagem);
      } catch (error) {
        console.error("Erro ao buscar beneficiários:", error);
      }
    };

    carregarDados();
  }, []);

  const data = {
    labels: ["0-18", "19-30", "31-45", "46-60", "61+"],
    datasets: [
      {
        label: "Quantidade de Beneficiários",
        data: faixas,
        backgroundColor: [
          "#4CAF50",
          "#66bb6a",
          "#81c784",
          "#a5d6a7",
          "#c8e6c9"
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

export default PieChartFaixaEtaria;
