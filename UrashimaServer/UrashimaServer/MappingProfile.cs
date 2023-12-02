using AutoMapper;
using UrashimaServer.Models;

namespace UrashimaServer
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Map order
            // Ex: CreateMap<OrderItemDto, Order>().ReverseMap();
            CreateMap<Account, AccountDto>().ReverseMap();
            CreateMap<AdsBoard, GetAdsBoardDto>().ReverseMap();
            CreateMap<GetAdsPointDto, AdsPoint>().ReverseMap();
        }
    }
}
