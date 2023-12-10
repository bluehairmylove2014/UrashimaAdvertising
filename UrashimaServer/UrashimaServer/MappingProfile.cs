using AutoMapper;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Map order
            // Ex: CreateMap<OrderItemDto, Order>().ReverseMap();
            CreateMap<AdsBoard, GetAdsBoardDto>().ReverseMap();
            CreateMap<GetAdsPointDto, AdsPoint>().ReverseMap();

            // Map Ads_Point
            CreateMap<UserAdsPointBasicDto, AdsPoint>().ReverseMap();
            CreateMap<PointImageDto, AdsPointImage>().ReverseMap();
            CreateMap<GetPointAdsBoardDto, AdsBoard>().ReverseMap();
            CreateMap<UserAdsPointDetailDto, AdsPoint>().ReverseMap();

            // Map Ads_Board
            CreateMap<AdsBoardBasicDto, AdsBoard>().ReverseMap();

            // Map Report
            CreateMap<ReportAdsBoardDto, Report>().ReverseMap();
            CreateMap<ReportImageDto, ReportImage>().ReverseMap();
            CreateMap<ReportLocationDto, Report>().ReverseMap();
            CreateMap<LocationDto, Location>().ReverseMap();
            CreateMap<Report, GetReportDto>().ReverseMap();
            CreateMap<Report, PostReportDto>().ReverseMap();
            CreateMap<Report, PostReportLocationDto>().ReverseMap();
        }
    }
}
