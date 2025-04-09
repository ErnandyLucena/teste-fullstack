using Microsoft.EntityFrameworkCore;
using SeuProjeto.Data;
using SeuProjeto.Models;

namespace SeuProjeto.Repositories
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
    }
}
