using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    [Route("api/test-automapper")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        readonly IMapper _mapper;

        public ValuesController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<AccountDto?> TestMapping()
        {
            var acc = new Account()
            {
                Id = 1,
                Email = "Test automapper",
                PasswordHash = "Test automapper",
                PasswordSalt = "Test automapper",
                RefreshToken = "Test automapper",
                Role = "Test automapper",
                AreaManaged = "Test automapper",
            };

            var accDto = _mapper.Map<AccountDto>(acc);

            return Ok(accDto);
        }
    }
}
