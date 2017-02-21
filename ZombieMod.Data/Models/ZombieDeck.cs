namespace ZombieMod.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public class ZombieDeck
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual List<ZombieCard> Cards { get; set; }

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
            return string.Format("Deck {0} | Name: {1}, Card Count: {2}", Id, Name, Cards.Count());
        }
    }
}
