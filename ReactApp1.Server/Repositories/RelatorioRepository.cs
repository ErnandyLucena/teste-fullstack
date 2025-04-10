using GestaoHospitalar.Data;
using GestaoHospitalar.Models;

namespace GestaoHospitalar.Repositories
{
    public class RelatorioRepository
    {
        private readonly AppDbContext _context;

        public RelatorioRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<object> GerarRelatorio()
        {
           
            var relatorio = _context.Atendimentos.Select(a => new
            {
                Id = a.Id,
                Data = a.DataAtendimento,
                Tipo = a.TipoAtendimento,
                NomeBeneficiario = a.Beneficiario.Nome
            }).ToList();

            return relatorio;
        }
    }
}
