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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var sucesso = await _beneficiarioService.DeletarBeneficiarioAsync(id);
            if (!sucesso)
                return NotFound(new { mensagem = "Beneficiário não encontrado." });

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] BeneficiarioDto dto)
        {
            var sucesso = await _beneficiarioService.AtualizarBeneficiarioAsync(id, dto);

            if (!sucesso)
            {
                return NotFound(new { mensagem = "Beneficiário não encontrado." });
            }

            return Ok(new { mensagem = "Beneficiário atualizado com sucesso." });
        }



    }
}
