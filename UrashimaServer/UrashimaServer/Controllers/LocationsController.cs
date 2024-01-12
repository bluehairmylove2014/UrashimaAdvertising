using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.RegularExpressions;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;

namespace UrashimaServer.Controllers
{
    /// <summary>
    /// Controller xử lý địa điểm thực tế.
    /// </summary>
    [Route("api/location")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly string _apiKey = "658dac28274ce196615546rej6e920c";
        private readonly DataContext _context;

        public LocationsController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        private async Task<List<string>> GetWards()
        {
            return await _context.WardDistricts.Select(e => e.Ward).Distinct().ToListAsync();
        }

        private async Task<List<string>> GetDistricts()
        {
            return await _context.WardDistricts.Select(e => e.District).Distinct().ToListAsync();
        }

        private async Task<string> ToVieLocation(string input)
        {
            var arr = (await GetWards()).Concat(await GetDistricts()).ToList();
            arr.Add("Thành Phố Hồ Chí Minh");

            foreach (var item in arr)
            {
                var engName = Helper.ToEngPlace(item);
                input = Regex.Replace(input, engName, item);
            }

            return input;
        }

        /// <summary>
        /// API Guest Lấy thông tin địa điểm thực tế dựa vào kinh độ - vĩ độ (Reverse Geocoding).
        /// </summary>
        [HttpGet("geo-code")]
        public async Task<ActionResult<GeoCodeResultDto>> GetRevGeoCodeInfo(
            [FromQuery, Required] double latitude = 10.7627917,
            [FromQuery, Required] double longitude = 106.6813989
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
                    RequestUri = new Uri($"https://geocode.maps.co/reverse?lat={latitude}&lon={longitude}&api_key={_apiKey}"),
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
                    result.Display_name = await ToVieLocation(rawResult!.Display_name!);
                    result.Latt = latitude;
                    result.Longt = longitude;
                }
            }

            if (result is null) {
                return NotFound(new
                {
                    message = "Không tìm thấy vị trí dựa trên tọa độ đã cung cấp."
                });
            }

            return Ok(result);
        }
    }
}
