using GestaoHospitalar.DTOs;
using GestaoHospitalar.Models;
using GestaoHospitalar.Repositories;

namespace GestaoHospitalar.Services
{
    public class AtendimentoService
    {
        private readonly AtendimentoRepository _repository;

        public AtendimentoService(AtendimentoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<AtendimentoDto>> GetPaginatedAsync(int page, int pageSize)
        {
            var atendimentos = await _repository.GetPaginatedAsync(page, pageSize);

            return atendimentos.Select(a => new AtendimentoDto
            {
                Id = a.Id,
                BeneficiarioId = a.BeneficiarioId,
                DataAtendimento = a.DataAtendimento,
                TipoAtendimento = a.TipoAtendimento
            });
        }

        public async Task<AtendimentoDto> CreateAsync(AtendimentoDto atendimentoDto)
        {
            var novoAtendimento = new Atendimento
            {
                BeneficiarioId = atendimentoDto.BeneficiarioId,
                DataAtendimento = atendimentoDto.DataAtendimento,
                TipoAtendimento = atendimentoDto.TipoAtendimento
            };

            var atendimentoCriado = await _repository.AddAsync(novoAtendimento);

            return new AtendimentoDto
            {
                Id = atendimentoCriado.Id,
                BeneficiarioId = atendimentoCriado.BeneficiarioId,
                DataAtendimento = atendimentoCriado.DataAtendimento,
                TipoAtendimento = atendimentoCriado.TipoAtendimento
            };
        }
    }
}
