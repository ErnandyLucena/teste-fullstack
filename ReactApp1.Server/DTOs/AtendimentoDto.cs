namespace GestaoHospitalar.DTOs
{
    public class AtendimentoDto
    {
        public int Id { get; set; }
        public int BeneficiarioId { get; set; }
        public DateTime DataAtendimento { get; set; }
        public string TipoAtendimento { get; set; }
    }
}
