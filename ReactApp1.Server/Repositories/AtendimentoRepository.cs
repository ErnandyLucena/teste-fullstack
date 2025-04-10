using Microsoft.EntityFrameworkCore;
using GestaoHospitalar.Data;
using GestaoHospitalar.Models;

namespace GestaoHospitalar.Repositories
{
    public class AtendimentoRepository
    {
        private readonly AppDbContext _context;

        public AtendimentoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Atendimento>> GetPaginatedAsync(int page, int pageSize)
        {
            return await _context.Atendimentos
                .Include(a => a.Beneficiario)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Atendimento> AddAsync(Atendimento atendimento)
        {
            _context.Atendimentos.Add(atendimento);
            await _context.SaveChangesAsync();
            return atendimento;
        }
    }
}
