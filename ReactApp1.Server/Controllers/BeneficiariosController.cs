using Microsoft.AspNetCore.Mvc;
using GestaoHospitalar.Services;
using GestaoHospitalar.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestaoHospitalar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeneficiariosController : ControllerBase
    {
        private readonly BeneficiarioService _beneficiarioService;

        public BeneficiariosController(BeneficiarioService beneficiarioService)
        {
            _beneficiarioService = beneficiarioService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BeneficiarioDto>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var beneficiarios = await _beneficiarioService.GetPaginatedAsync(page, pageSize);
            return Ok(beneficiarios);
        }

        [HttpGet("{id}/pontuacao")]
        public async Task<ActionResult<object>> GetPontuacao(int id)
        {
            var resultado = await _beneficiarioService.CalcularPontuacaoBeneficiarioAsync(id);

            if (resultado == null)
            {
                return NotFound(new { mensagem = "Beneficiário não encontrado." });
            }

            return Ok(resultado);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BeneficiarioDto dto, [FromQuery] string carteirinha)
        {
            if (!_beneficiarioService.ValidarCarteirinha(carteirinha))
            {
                return BadRequest(new { mensagem = "Carteirinha inválida. Formato esperado: XXX-YYYYYY" });
            }

            await _beneficiarioService.CriarBeneficiarioAsync(dto);
            return Ok(new { mensagem = "Beneficiário criado com sucesso." });
        }
    }
}
