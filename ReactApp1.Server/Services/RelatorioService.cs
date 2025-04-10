using GestaoHospitalar.Data;
using GestaoHospitalar.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GestaoHospitalar.Services
{
    public class RelatorioService
    {
        private readonly AppDbContext _context;

        public RelatorioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<RelatorioUsoDto> GerarRelatorioUsoAsync()
        {
            var agora = DateTime.UtcNow;
            var limite = agora.AddMonths(-12);

            // 1. Total de atendimentos por tipo
            var quantidadePorTipo = await _context.Atendimentos
                .GroupBy(a => a.TipoAtendimento)
                .Select(g => new { Tipo = g.Key, Quantidade = g.Count() })
                .ToDictionaryAsync(x => x.Tipo, x => x.Quantidade);

            // 2. Média de atendimentos por beneficiário ativo
            var totalAtendimentos = await _context.Atendimentos.CountAsync();
            var totalBeneficiariosAtivos = await _context.Beneficiarios.CountAsync(b => b.Ativo);
            double media = totalBeneficiariosAtivos == 0 ? 0 : (double)totalAtendimentos / totalBeneficiariosAtivos;

            // 3. Beneficiários sem atendimento nos últimos 12 meses
            var idsComAtendimentoRecente = await _context.Atendimentos
                .Where(a => a.DataAtendimento >= limite)
                .Select(a => a.BeneficiarioId)
                .Distinct()
                .ToListAsync();

            var semAtendimento = await _context.Beneficiarios
                .Where(b => b.Ativo && !idsComAtendimentoRecente.Contains(b.Id))
                .CountAsync();

            return new RelatorioUsoDto
            {
                QuantidadePorTipo = quantidadePorTipo,
                MediaPorBeneficiarioAtivo = Math.Round(media, 2),
                BeneficiariosSemAtendimento12Meses = semAtendimento
            };
        }
    }
}
