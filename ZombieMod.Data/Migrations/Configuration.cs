namespace Playground.Data.Migrations
{
    using System.Data.Entity.Migrations;
    using ZombieMod.Data;
    using ZombieMod.Data.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<ZombieModContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ZombieModContext context)
        {
            //  This method will be called after migrating to the latest version.
            context.Classes.AddOrUpdate(
                o => o.Id,
                new ZombieClass { Id = 1, Name = "Normal", BasePower = 1.0f },
                new ZombieClass { Id = 2, Name = "Toxic", BasePower = 1.4f },
                new ZombieClass { Id = 3, Name = "Beserker", BasePower = 1.4f },
                new ZombieClass { Id = 4, Name = "Skinner", BasePower = 1.2f }
            );

            context.Types.AddOrUpdate(
                o => o.Id,
                new ZombieType { Id = 1, Name = "Walker", PowerMultiplier = 1.0f },
                new ZombieType { Id = 2, Name = "Runner", PowerMultiplier = 1.5f },
                new ZombieType { Id = 3, Name = "Fatty", PowerMultiplier = 1.5f },
                new ZombieType { Id = 4, Name = "Abomination", PowerMultiplier = 4.0f },
                new ZombieType { Id = 5, Name = "Dog", PowerMultiplier = 2.0f }
            );

            //context.Decks.AddOrUpdate(
            //    o => o.Id,
            //    new ZombieDeck { Id = 1, Name = "Test Deck" }
            //);

            //context.Cards.AddOrUpdate(
            //    o => o.Id,
            //    new ZombieCard { Id = 1, Sewer = false, ZombieDeckId = 1 },
            //    new ZombieCard { Id = 2, Sewer = false, ZombieDeckId = 1 }
            //);

            //context.Spawns.AddOrUpdate(
            //    o => o.Id,
            //    new ZombieSpawn { Id = 1, Count = 1, ZombieClassId = 1, ZombieTypeId = 1, ZombieCardId = 1 },
            //    new ZombieSpawn { Id = 2, Count = 1, ZombieClassId = 1, ZombieTypeId = 3, ZombieCardId = 2 },
            //    new ZombieSpawn { Id = 3, Count = 2, ZombieClassId = 1, ZombieTypeId = 1, ZombieCardId = 2 }
            //);
        }
    }
}
