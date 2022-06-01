using Microsoft.AspNetCore.Mvc;

namespace GC.WebSpace.Areas.Infrastructure.Controllers
{
    public class HomeController : BaseAuthorizedController
    {
        [Route("IS")]
        public ViewResult Home() => ReactApp("home", "Главная");
    }
}
