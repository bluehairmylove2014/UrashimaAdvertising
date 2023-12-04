using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;
using System.Text.Json;
using System.Web;
using UrashimaServer.Database.Dtos;

namespace UrashimaServer.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        [HttpPost("geo-code")]
        public async Task<IActionResult> GetRevGeoCodeInfo(InputGeoCodeDto input)
        {
            object? result = null;
            var handler = new HttpClientHandler();

            handler.ServerCertificateCustomValidationCallback +=
                (sender, certificate, chain, errors) =>
                {
                    return true;
                };

            var builder = new UriBuilder($"https://geocode.xyz/{input.Latitude},{input.Longitude}")
            {
                Port = -1
            };

            var query = HttpUtility.ParseQueryString(builder.Query);
            //query["locate"] = $"{input.Latitude},{input.Longitude}";
            query["json"] = "1";
            query["auth"] = "11385978580054795929x126638";
            builder.Query = query.ToString();

            using (var httpClient = new HttpClient(handler))
            {
                var httpRequestMessage = new HttpRequestMessage
                {
                    RequestUri = builder.Uri,
                    Method = HttpMethod.Get,
                    Headers = {
                        { HttpRequestHeader.Accept.ToString(), "application/json" },
                    },
                    //Content = new StringContent(JsonConvert.SerializeObject(svm))
                };

                using var response = await httpClient.SendAsync(httpRequestMessage);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<GeoCodeResultDto>(apiResponse);        
                }
            }

            if (result is null) {
                return NotFound(new
                {
                    message = "Not Found"
                });
            }

            return Ok(result);
        }
    }
}
