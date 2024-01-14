# Urashima Ads
[![Build and deploy ASP.Net Core app to Azure Web App - urashima-ads](https://github.com/bluehairmylove2014/UrashimaAdvertising/actions/workflows/main_urashima-ads.yml/badge.svg)](https://github.com/bluehairmylove2014/UrashimaAdvertising/actions/workflows/main_urashima-ads.yml)

[![React-NextJS](https://github.com/bluehairmylove2014/Sunrise-Continent/actions/workflows/fe-cicd.yml/badge.svg)](https://github.com/bluehairmylove2014/Sunrise-Continent/actions/workflows/fe-cicd.yml)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=CityDiscoverTourist_CityDiscoverTouristServer&metric=sqale_rating)](https://github.com/bluehairmylove2014/Sunrise-Continent)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
### Cài đặt và chạy Server Urashima Ads (ASP.NET APIs)
##### 1. Chạy bằng visual studio 2019/2022
1. Mở folder **UrashimaServer**
2. chạy file **UrashimaServer.sln**
3. click **F5** để chạy với chế độ debug 
##### 2. Chạy bằng visual studio code
1. Mở folder **UrashimaServer/UrashimaServer**
2. Chạy lệnh ``dotnet run``

**Lưu ý**: Với hướng dẫn trên server sẽ chạy ở database đã deploy của nhóm (đã có sẵn dữ liệu), Để chạy được database ở local cần thêm các bước sau
1. Thay đổi connection string trong file **appsettings.json** trỏ đến database local
2. Thay đổi tên chuỗi kết nối tại dòng số 69 file **Program.cs**
2. chạy lệnh `dotnet-ef database update -p UrashimaServer` trong folder **UrashimaServer&&
3. Chạy file **AdsData.sql** để có dữ liệu về bảng, điểm quảng cáo
