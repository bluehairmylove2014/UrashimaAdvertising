using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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
        private readonly IMapper _mapper;

        public LocationsController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet("geo-code")]
        public async Task<IActionResult> GetRevGeoCodeInfo(
            [FromQuery] double latitude = 10.7627917,
            [FromQuery] double longitude = 106.6813989
        )
        {
            GeoCodeResult? rawResult = null;
            GeoCodeResultDto? result = null;
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
                    RequestUri = new Uri($"https://geocode.maps.co/reverse?lat={latitude}&lon={longitude}"),
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
                    rawResult = JsonConvert.DeserializeObject<GeoCodeResult>(apiResponse);
                    result = _mapper.Map<GeoCodeResultDto>(rawResult?.Address);
                    result.Display_name = rawResult?.Display_name;
                    result.Latt = rawResult?.Lat;
                    result.Longt = rawResult?.Lon;
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
