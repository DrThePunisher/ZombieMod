namespace ZombieMod.Data.Services
{
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using ZombieMod.Data.Models;

    public class SpawnerService
    {
        public IEnumerable<ZombieClass> GetClasses()
        {
            using (var db = new ZombieModContext())
            {
                return db.Classes.ToList();
            }
        }

        public IEnumerable<ZombieType> GetTypes()
        {
            using (var db = new ZombieModContext())
            {
                return db.Types.ToList();
            }
        }

        public IEnumerable<ZombieSpawn> GetSpawns()
        {
            using (var db = new ZombieModContext())
            {
                db.Configuration.ProxyCreationEnabled = false;

                return db.Spawns
                    .Include(o => o.ZombieClass)
                    .Include(o => o.ZombieType).ToList();
            }
        }

        public IEnumerable<ZombieCard> GetCards()
        {
            using (var db = new ZombieModContext())
            {
                db.Configuration.ProxyCreationEnabled = false;

                return db.Cards
                    .Include(o => o.Spawns).ToList();
            }
        }

        public IEnumerable<ZombieDeck> GetDecks()
        {
            using (var db = new ZombieModContext())
            {
                db.Configuration.ProxyCreationEnabled = false;

                return db.Decks
                    .Include(o => o.Cards).ToList();
            }
        }

        public ZombieDeck GetDeck(int deckId)
        {
            using (var db = new ZombieModContext())
            {
                db.Configuration.ProxyCreationEnabled = true;

                return db.Decks
                    .Include(o => o.Cards)
                    .Include(o => o.Cards.Select(p => p.Spawns))
                    .Include(o => o.Cards.Select(p => p.Spawns.Select(q => q.ZombieClass)))
                    .Include(o => o.Cards.Select(p => p.Spawns.Select(q => q.ZombieType)))
                    .Where(o => o.Id == deckId).Single();
            }
        }
    }
}
