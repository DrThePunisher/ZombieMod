namespace ZombieMod.Data.Services
{
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using ZombieMod.Data.Models;

    public class SpawnerService
    {
        /// <summary>
        /// Retrieves every deck in the database
        /// </summary>
        /// <returns>A collection of ZombieDeck objects</returns>
        public IEnumerable<ZombieDeck> GetAllDecks()
        {
            using (var db = new ZombieModContext())
            {
                db.Configuration.ProxyCreationEnabled = false;

                return db.Decks.ToList();
            }
        }
        
        /// <summary>
        /// Retrieves a specific deck with all cards, spawns, zombie classes and zombie types
        /// </summary>
        /// <param name="deckId"></param>
        /// <returns>A ZombieDeck object</returns>
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
