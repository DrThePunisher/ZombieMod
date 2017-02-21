namespace ZombieMod.Data.Models
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text;
    using ZombieMod.Utilities;

    public class ZombieSpawn
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public int ZombieClassId { get; set; }
        public int ZombieTypeId { get; set; }
        public int ZombieCardId { get; set; }

        public virtual ZombieClass ZombieClass { get; set; }
        public virtual ZombieType ZombieType { get; set; }
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
            details.Append(string.Format("{0} {1} {2}", Count, ZombieClass.Name, ZombieType.Name));
            if (Count > 1)
            {
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
