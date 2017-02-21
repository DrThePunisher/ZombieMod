namespace ZombieMod.Data
{
    using System.Data.Entity;
    using ZombieMod.Data.Models;

    public class ZombieModContext : DbContext
    {
        public ZombieModContext()
            : base("name=ZombieModContext") { }

        public DbSet<ZombieClass> Classes { get; set; }
        public DbSet<ZombieType> Types { get; set; }
        public DbSet<ZombieSpawn> Spawns { get; set; }
        public DbSet<ZombieCard> Cards { get; set; }
        public DbSet<ZombieDeck> Decks { get; set; }
    }
}
