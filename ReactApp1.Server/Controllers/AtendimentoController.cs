using Microsoft.AspNetCore.Mvc;
using GestaoHospitalar.Services;
using GestaoHospitalar.DTOs;

namespace GestaoHospitalar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtendimentosController : ControllerBase
    {
        private readonly AtendimentoService _atendimentoService;

        public AtendimentosController(AtendimentoService atendimentoService)
        {
            _atendimentoService = atendimentoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AtendimentoDto>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var atendimentos = await _atendimentoService.GetPaginatedAsync(page, pageSize);
            return Ok(atendimentos);
        }

        [HttpPost]
        public async Task<ActionResult<AtendimentoDto>> Create([FromBody] AtendimentoDto atendimentoDto)
        {
            if (string.IsNullOrWhiteSpace(atendimentoDto.TipoAtendimento))
            {
                return BadRequest(new { mensagem = "Tipo de atendimento é obrigatório." });
            }

            var atendimentoCriado = await _atendimentoService.CreateAsync(atendimentoDto);
            return CreatedAtAction(nameof(GetAll), new { id = atendimentoCriado.Id }, atendimentoCriado);
        }
    }
}
