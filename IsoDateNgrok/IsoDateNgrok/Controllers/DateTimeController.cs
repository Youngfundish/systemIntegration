using Microsoft.AspNetCore.Mvc;

namespace IsoDateNgrok.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DateTimeController : ControllerBase
    {
        public DateTimeController()
        {
        }

        [HttpGet(Name = "DateIso")]
        public ActionResult<DateTime> Get()
        {
            var date = DateTime.Now;
            return date;
        }
    }
}