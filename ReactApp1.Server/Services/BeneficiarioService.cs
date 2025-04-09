using SeuProjeto.Models;
using SeuProjeto.Repositories;
using SeuProjeto.DTOs; // Adiciona esse namespace

namespace SeuProjeto.Services
{
    public class BeneficiarioService
    {
        private readonly BeneficiarioRepository _repository;

        public BeneficiarioService(BeneficiarioRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<BeneficiarioDto>> GetPaginatedAsync(int page, int pageSize)
        {
            var beneficiarios = await _repository.GetPaginatedAsync(page, pageSize);

            // Mapeia para DTO
            return beneficiarios.Select(b => new BeneficiarioDto
            {
                Id = b.Id,
                Nome = b.Nome,
                DataNascimento = b.DataNascimento,
                Ativo = b.Ativo
            });
        }
    }
}
