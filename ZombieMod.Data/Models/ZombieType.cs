namespace ZombieMod.Data.Models
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class ZombieType
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The name of the type
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The power multiplier
        /// </summary>
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
