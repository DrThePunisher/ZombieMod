namespace ZombieMod.Data.Models
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text;
    using ZombieMod.Utilities;

    public class ZombieSpawn
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The number of zombies
        /// </summary>
        public int Count { get; set; }

        /// <summary>
        /// The class for this spawn
        /// </summary>
        public int ZombieClassId { get; set; }

        /// <summary>
        /// The type for this spawn
        /// </summary>
        public int ZombieTypeId { get; set; }

        /// <summary>
        /// The card this spawn belongs to
        /// </summary>
        public int ZombieCardId { get; set; }

        /// <summary>
        /// The actual class for this spawn
        /// </summary>
        public virtual ZombieClass ZombieClass { get; set; }

        /// <summary>
        /// The actual type for this spawn
        /// </summary>
        public virtual ZombieType ZombieType { get; set; }

        /// <summary>
        /// The actual card this spawn belongs to
        /// </summary>
        public virtual ZombieCard ZombieCard { get; set; }

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
            // Basic information about the spawn
            details.Append(string.Format("{0} {1} {2}", Count, ZombieClass.Name, ZombieType.Name));
            if (Count > 1)
            {
                // Adjust the message for plurality
                if (ZombieTypeId == (int)ZombieModUtilities.ZombieType.Fatty)
                {
                    details.Replace("Fatty", "Fatties");
                }
                else
                {
                    details.Append('s');
                }
            }
            return details.ToString();
        }
    }
}
