namespace ZombieMod.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public class ZombieDeck
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The name of the deck
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The cards belonging to this deck
        /// </summary>
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
            var info = string.Empty;
            if (Cards != null)
            {
                info = string.Format("Deck: {0} | Name: {1}, Card Count: {2}", Id, Name, Cards.Count());
            } else {
                info = string.Format("Deck: {0} | Name: {1}", Id, Name);
            }
            return info;
        }
    }
}
