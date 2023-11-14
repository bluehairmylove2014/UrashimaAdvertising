using ApiSecurity.Database.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace ApiSecurity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private readonly string mySecret = "6CBxzdYcEgNDrRhMbDpkBF7e4d4Kib46dwL9ZE5egiL0iL5Y3dzREUBSUYVUwUkN";
        // GET: api/Films
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Film>?>> GetFilmsFromServerB()
        {
            var result = new List<Film>() { };
            var handler = new HttpClientHandler();

            handler.ServerCertificateCustomValidationCallback +=
                (sender, certificate, chain, errors) =>
                {
                    return true;
                };

            using (var httpClient = new HttpClient(handler))
            {
                var httpRequestMessage = new HttpRequestMessage
                    {
                        RequestUri = new Uri("http://localhost:5041/api/Films"),
                        Method = HttpMethod.Get,
                        Headers = {
                        { "X-Version", "1" },
                        { "X-API-Key", mySecret },
                        { HttpRequestHeader.Accept.ToString(), "application/json" },
                    },
                    //Content = new StringContent(JsonConvert.SerializeObject(svm))
                };

                using var response = await httpClient.SendAsync(httpRequestMessage);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<List<Film>>(apiResponse);
                }
            }
            return result;
        }
    }
}
