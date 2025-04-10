using Microsoft.EntityFrameworkCore;
using GestaoHospitalar.Data;
using GestaoHospitalar.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestaoHospitalar.Repositories
{
    public class BeneficiarioRepository
    {
        private readonly AppDbContext _context;

        public BeneficiarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Beneficiario>> GetPaginatedAsync(int page, int pageSize)
        {
            return await _context.Beneficiarios
                                 .Skip((page - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToListAsync();
        }

        public async Task<Beneficiario?> GetByIdAsync(int id)
        {
            return await _context.Beneficiarios.FindAsync(id);
        }

        public async Task<Beneficiario?> GetByIdWithAtendimentosAsync(int id)
        {
            return await _context.Beneficiarios
                                 .Include(b => b.Atendimentos)
                                 .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task AddAsync(Beneficiario beneficiario)
        {
            _context.Beneficiarios.Add(beneficiario);
            await _context.SaveChangesAsync();
        }
    }
}
