namespace ZombieMod.Web.Controllers
{
    using System;
    using System.Web.Mvc;
    using Newtonsoft.Json;
    using ZombieMod.Data.Services;
    using ZombieMod.Utilities;

    [RoutePrefix("ZombieMod")]
    public class HomeController : Controller
    {
        /// <summary>
        /// The spawner database service
        /// </summary>
        private SpawnerService spawnerService { get; set; }

        /// <summary>
        /// The settings used to serialize json without infinitaly looping
        /// </summary>
        private JsonSerializerSettings jsonSerializerSettings { get; set; }
        
        /// <summary>
        /// Basic constructor
        /// </summary>
        public HomeController()
        {
            // Initialize private variables
            spawnerService = new SpawnerService();
            jsonSerializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
        }

        /// <summary>
        /// Index / Homepage
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Spawner Page
        /// </summary>
        /// <returns></returns>
        public ActionResult Spawner()
        {
            return View();
        }

        public ActionResult DeckManager()
        {
            return View();
        }

        /// <summary>
        /// Retrieve an entire deck with all cards and spawns
        /// </summary>
        /// <param name="deckId">The id of the deck</param>
        /// <returns>An AjaxResponse object</returns>
        [HttpGet]
        [Route("GetDeck/{deckId:int}")]
        public JsonResult GetDeck(int deckId)
        {
            var response = new AjaxResponse();

            try
            {
                // Get the deck
                response.Data = spawnerService.GetDeck(deckId);
            }
            catch (Exception e)
            {
                // Keep the error information
                response.Success = false;
                response.Message = e.Message;
            }

            // Serialize and return the data
            var jsonResult = new JsonResult
            {
                Data = JsonConvert.SerializeObject(response, jsonSerializerSettings),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

            return jsonResult;
        }

        /// <summary>
        /// Retrieves every deck in the database
        /// </summary>
        /// <returns>An AjaxResponse object</returns>
        [HttpGet]
        [Route("GetAllDecks")]
        public JsonResult GetAllDecks()
        {
            var response = new AjaxResponse();

            try
            {
                // Get the decks
                response.Data = spawnerService.GetAllDecks();
            }
            catch (Exception e)
            {
                // Keep the error information
                response.Success = false;
                response.Message = e.Message;
            }

            // Serialize and return the data
            var jsonResult = new JsonResult
            {
                Data = JsonConvert.SerializeObject(response, jsonSerializerSettings),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

            return jsonResult;
        }
    }
}