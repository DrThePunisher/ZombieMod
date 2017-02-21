namespace ZombieMod.Web.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using Newtonsoft.Json;
    using ZombieMod.Data.Services;
    using ZombieMod.Utilities;

    [RoutePrefix("ZombieMod")]
    public class HomeController : Controller
    {
        private SpawnerService spawnerService { get; set; }
        private JsonSerializerSettings jsonSerializerSettings { get; set; }
        
        public HomeController()
        {
            spawnerService = new SpawnerService();
            jsonSerializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
        }

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Spawner()
        {
            return View();
        }

        [HttpGet]
        [Route("GetInfo")]
        public JsonResult GetInfo()
        {
            var classes = spawnerService.GetClasses();
            var types = spawnerService.GetTypes();
            var spawns = spawnerService.GetSpawns();
            var cards = spawnerService.GetCards();
            var decks = spawnerService.GetDecks();

            var info = classes.Select(o => o.ToString()).ToList();
            info.AddRange(types.Select(o => o.ToString()).ToList());
            info.AddRange(spawns.Select(o => o.ToString()).ToList());
            info.AddRange(cards.Select(o => o.ToString()).ToList());
            info.AddRange(decks.Select(o => o.ToString()).ToList());

            return Json(info, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("GetDeck/{deckId:int}")]
        public JsonResult GetDeck(int deckId)
        {
            var response = new AjaxResponse();

            try
            {
                response.Data = spawnerService.GetDeck(deckId);
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }

            var jsonResult = new JsonResult
            {
                Data = JsonConvert.SerializeObject(response, jsonSerializerSettings),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

            return jsonResult;
        }

    }
}