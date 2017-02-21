namespace ZombieMod.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Text;

    public class ZombieCard
    {
        public int Id { get; set; }
        public bool Sewer { get; set; }
        public int ZombieDeckId { get; set; }

        public virtual List<ZombieSpawn> Spawns { get; set; }
        public virtual ZombieDeck ZombieDeck { get; set; }

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
            var details = new StringBuilder();
            for (int i = 0; i < Spawns.Count(); i++)
            {
                details.Append(Spawns[i].Info);
                if (i < Spawns.Count() - 1)
                {
                    details.Append(", ");
                }
            }
            if (Sewer)
            {
                details.Append(" on All Sewers");
            }
            return details.ToString();
        }
    }
}
