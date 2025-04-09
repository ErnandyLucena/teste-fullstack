namespace SeuProjeto.Models
{
    public class Beneficiario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool Ativo { get; set; }
        public ICollection<Atendimento> Atendimentos { get; set; }
    }
}
