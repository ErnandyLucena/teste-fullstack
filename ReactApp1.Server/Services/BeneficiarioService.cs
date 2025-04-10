using GestaoHospitalar.Models;
using GestaoHospitalar.Repositories;
using GestaoHospitalar.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace GestaoHospitalar.Services
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

            return beneficiarios.Select(b => new BeneficiarioDto
            {
                Id = b.Id,
                Nome = b.Nome,
                DataNascimento = b.DataNascimento,
                Ativo = b.Ativo
            });
        }

        public async Task<BeneficiarioDto?> ObterBeneficiarioPorIdAsync(int id)
        {
            var beneficiario = await _repository.GetByIdAsync(id);
            if (beneficiario == null) return null;

            return new BeneficiarioDto
            {
                Id = beneficiario.Id,
                Nome = beneficiario.Nome,
                DataNascimento = beneficiario.DataNascimento,
                Ativo = beneficiario.Ativo
            };
        }

        public async Task<object?> CalcularPontuacaoBeneficiarioAsync(int id)
        {
            var beneficiario = await _repository.GetByIdWithAtendimentosAsync(id);

            if (beneficiario == null || beneficiario.Atendimentos == null)
                return null;

            int pontuacaoTotal = 0;

            foreach (var atendimento in beneficiario.Atendimentos)
            {
                switch (atendimento.TipoAtendimento)
                {
                    case "Consulta":
                        pontuacaoTotal += 10;
                        break;
                    case "Exame":
                        pontuacaoTotal += 5;
                        break;
                    case "Internacao":
                        pontuacaoTotal += 20;
                        break;
                }
            }

            return new
            {
                BeneficiarioId = beneficiario.Id,
                Nome = beneficiario.Nome,
                PontuacaoTotal = pontuacaoTotal,
                QuantidadeAtendimentos = beneficiario.Atendimentos.Count
            };
        }

        public async Task CriarBeneficiarioAsync(BeneficiarioDto dto)
        {
            var beneficiario = new Beneficiario
            {
                Nome = dto.Nome,
                DataNascimento = dto.DataNascimento,
                Ativo = dto.Ativo
            };

            await _repository.AddAsync(beneficiario);
        }

        public async Task<bool> AtualizarBeneficiarioAsync(int id, BeneficiarioDto dto)
        {
            var beneficiario = await _repository.GetByIdAsync(id);
            if (beneficiario == null)
                return false;

            beneficiario.Nome = dto.Nome;
            beneficiario.DataNascimento = dto.DataNascimento;
            beneficiario.Ativo = dto.Ativo;

            await _repository.UpdateAsync(beneficiario);
            return true;
        }

        public async Task<bool> DeletarBeneficiarioAsync(int id)
        {
            return await _repository.DeletarAsync(id);
        }

        public bool ValidarCarteirinha(string carteirinha)
        {
            var regex = new Regex(@"^[A-Z]{3}-\d{6}$");
            return regex.IsMatch(carteirinha);
        }
    }
}
