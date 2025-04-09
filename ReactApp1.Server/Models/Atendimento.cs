namespace SeuProjeto.Models
{
    public class Atendimento
    {
        public int Id { get; set; }
        public int BeneficiarioId { get; set; }
        public DateTime DataAtendimento { get; set; }
        public string TipoAtendimento { get; set; }

        public Beneficiario Beneficiario { get; set; }
    }
}
