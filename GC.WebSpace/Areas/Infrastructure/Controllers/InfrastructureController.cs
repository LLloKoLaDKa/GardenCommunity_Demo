using Microsoft.AspNetCore.Mvc;

namespace GC.WebSpace.Areas.Infrastructure.Controllers
{
    public class InfrastructureController : BaseController
    {
        [Route("Error/{statuscode}")]
        public ActionResult Infrastructure() => ReactApp("infrastructure", "Ошибка");
    }
}
