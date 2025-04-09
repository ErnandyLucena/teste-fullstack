using Microsoft.AspNetCore.Mvc;
using SeuProjeto.Services;
using SeuProjeto.DTOs; // Ajuste para o namespace real do seu projeto
using System.Threading.Tasks;

namespace SeuProjeto.Controllers
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

        /// <summary>
        /// Retorna uma lista paginada de beneficiários.
        /// </summary>
        /// <param name="page">Número da página (padrão: 1)</param>
        /// <param name="pageSize">Tamanho da página (padrão: 10)</param>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BeneficiarioDto>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var beneficiarios = await _beneficiarioService.GetPaginatedAsync(page, pageSize);
            return Ok(beneficiarios);
        }
    }
}
