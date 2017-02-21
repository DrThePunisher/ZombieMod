namespace ZombieMod.Data.Models
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class ZombieType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float PowerMultiplier { get; set; }

        [NotMapped]
        public string Info
        {
            get
            {
                return this.ToString();
            }
        }

        public override string ToString()
        {
            return string.Format("Type {0} | Name: {1}, Power Multiplier: {2}", Id, Name, PowerMultiplier);
        }
    }
}
