namespace ZombieMod.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Text;

    public class ZombieCard
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Place every spawn on every sewer
        /// </summary>
        public bool Sewer { get; set; }

        /// <summary>
        /// What deck the card belongs to
        /// </summary>
        public int ZombieDeckId { get; set; }

        /// <summary>
        /// The spawns belonging to this card
        /// </summary>
        public virtual List<ZombieSpawn> Spawns { get; set; }

        /// <summary>
        /// The actual deck the card belongs to
        /// </summary>
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
