### SISTEMA DE RELATÓRIOS DE ATENDIMENTOS E BENEFICIÁRIOS

Este é um projeto full-stack para visualizar relatórios de atendimentos realizados a beneficiários.
O projeto foi desenvolvido a partir de um desafio proposto.

### Funcionalidades

- A aplicação permite a visualização e filtragem de beneficiários, além disso, permite insights importantes sobre os dados de atendimento e beneficiários. onde foram realizadas 5 tipos de visualizações na página de relatório, além disso, podemos ver detalhes sobre os beneficiários como a pontuação de cada um baseado na quantidade e tipo de atendimentos. o teste de lógica da função que verifica se o intervalo entre dois exames é maior que 6 meses, foi o único que utilizou dados mockados, na parte de consulta do frontend.
- Adicionei a lógica da validação da carteirinha no método POST de beneficiários.
- Todos os desafios propostos foram devidamente cumpridos. e as query usadas do SQL estão disponiveis no final desse README.md 
- Endpoints validados e funcionando 

### Tecnologias e bibliotecas usadas

- ASP.NET
- Entity Framework Core
- C#
- PostgreSQL
- API RESTful
- React
- Chart.js

### Inicialização

# Backend

- Garanta que a versão e os nugets estão ok
- Garanta que o banco foi criado e configure em `appsettings.json` e rode as migrations e execute a aplicação
- **dotnet ef database update**

# Frontend 

- Antes de iniciar o projeto, rode o **npm install**, e após isso verifique se todas as dependencias do projeto foram instaladas
- **npm run dev** (para iniciar)

### SQL

# 1

 SELECT b."Nome"
FROM public."Beneficiarios" b
JOIN public."Atendimentos" a ON a."BeneficiarioId" = b."Id"
WHERE b."Ativo" = TRUE
  AND a."DataAtendimento" >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY b."Id", b."Nome"
HAVING COUNT(a."Id") >= 3;

# 2

 SELECT 
  b."Nome",
  a."TipoAtendimento",
  COUNT(*) AS "Quantidade"
FROM public."Beneficiarios" b
JOIN public."Atendimentos" a ON a."BeneficiarioId" = b."Id"
GROUP BY b."Nome", a."TipoAtendimento"
ORDER BY b."Nome", a."TipoAtendimento";

# 3

 SELECT 
  b."Nome",
  COUNT(a."Id") AS "TotalAtendimentos"
FROM public."Beneficiarios" b
JOIN public."Atendimentos" a ON a."BeneficiarioId" = b."Id"
WHERE a."DataAtendimento" >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY b."Id", b."Nome"
ORDER BY "TotalAtendimentos" DESC
LIMIT 5;

# 4

 SELECT 
  AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, b."DataNascimento"))) AS "IdadeMedia"
FROM public."Beneficiarios" b
WHERE b."Ativo" = TRUE;

5- SELECT b."Nome"
FROM public."Beneficiarios" b
WHERE NOT EXISTS (
  SELECT 1
  FROM public."Atendimentos" a
  WHERE a."BeneficiarioId" = b."Id"
    AND a."DataAtendimento" >= CURRENT_DATE - INTERVAL '18 months'
);







