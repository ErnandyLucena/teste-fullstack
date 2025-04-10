using GestaoHospitalar.Data;
using GestaoHospitalar.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
            await _context.Beneficiarios.AddAsync(beneficiario);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Beneficiario beneficiario)
        {
            _context.Beneficiarios.Update(beneficiario);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeletarAsync(int id)
        {
            var beneficiario = await _context.Beneficiarios.FindAsync(id);
            if (beneficiario == null)
                return false;

            _context.Beneficiarios.Remove(beneficiario);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
