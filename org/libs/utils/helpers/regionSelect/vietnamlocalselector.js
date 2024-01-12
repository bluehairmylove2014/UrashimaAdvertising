(function () {
  this.LocalPicker = function () {
    'use strict';
    let {
      province = 'ls_province',
      district = 'ls_district',
      ward = 'ls_ward',
      getValueBy = 'id',
      provinceText = 'Chọn tỉnh / thành phố',
      districtText = 'Chọn quận / huyện',
      wardText = 'Chọn phường / xã',
      wardNoText = 'Địa phương này không có phường / xã',
      emptyValue = ' ',
      hideEmptyValueOption = true,
      hidePlaceHolderOption = true,
      provincePrefix = false,
      districtPrefix = true,
      levelAsAttribute = true,
      levelAttributeName = 'data-level',
    } = arguments[0] && typeof arguments[0] === 'object' ? arguments[0] : {};

    function init() {
      let data = [
          {
            i: 79,
            n: 'Hồ Chí Minh',
            t: 'Thành Phố',
            c: [
              {
                i: 760,
                n: '1',
                t: 'Quận',
                c: [
                  { i: 26740, n: 'Bến Nghé', t: 'Phường' },
                  { i: 26743, n: 'Bến Thành', t: 'Phường' },
                  { i: 26761, n: 'Cầu Kho', t: 'Phường' },
                  { i: 26752, n: 'Cầu Ông Lãnh', t: 'Phường' },
                  { i: 26755, n: 'Cô Giang', t: 'Phường' },
                  { i: 26737, n: 'Đa Kao', t: 'Phường' },
                  { i: 26758, n: 'Nguyễn Cư Trinh', t: 'Phường' },
                  { i: 26746, n: 'Nguyễn Thái Bình', t: 'Phường' },
                  { i: 26749, n: 'Phạm Ngũ Lão', t: 'Phường' },
                  { i: 26734, n: 'Tân Định', t: 'Phường' },
                ],
              },
              {
                i: 769,
                n: '2',
                t: 'Quận',
                c: [
                  { i: 27106, n: 'An Khánh', t: 'Phường' },
                  { i: 27115, n: 'An Lợi Đông', t: 'Phường' },
                  { i: 27091, n: 'An Phú', t: 'Phường' },
                  { i: 27094, n: 'Bình An', t: 'Phường' },
                  { i: 27103, n: 'Bình Khánh', t: 'Phường' },
                  { i: 27097, n: 'Bình Trưng Đông', t: 'Phường' },
                  { i: 27100, n: 'Bình Trưng Tây', t: 'Phường' },
                  { i: 27109, n: 'Cát Lái', t: 'Phường' },
                  { i: 27112, n: 'Thạnh Mỹ Lợi', t: 'Phường' },
                  { i: 27088, n: 'Thảo Điền', t: 'Phường' },
                  { i: 27118, n: 'Thủ Thiêm', t: 'Phường' },
                ],
              },
              {
                i: 770,
                n: '3',
                t: 'Quận',
                c: [
                  { i: 27160, n: '01', t: 'Phường' },
                  { i: 27157, n: '02', t: 'Phường' },
                  { i: 27154, n: '03', t: 'Phường' },
                  { i: 27148, n: '04', t: 'Phường' },
                  { i: 27151, n: '05', t: 'Phường' },
                  { i: 27139, n: '06', t: 'Phường' },
                  { i: 27124, n: '07', t: 'Phường' },
                  { i: 27121, n: '08', t: 'Phường' },
                  { i: 27142, n: '09', t: 'Phường' },
                  { i: 27145, n: '10', t: 'Phường' },
                  { i: 27133, n: '11', t: 'Phường' },
                  { i: 27130, n: '12', t: 'Phường' },
                  { i: 27136, n: '13', t: 'Phường' },
                  { i: 27127, n: '14', t: 'Phường' },
                ],
              },
              {
                i: 773,
                n: '4',
                t: 'Quận',
                c: [
                  { i: 27298, n: '01', t: 'Phường' },
                  { i: 27292, n: '02', t: 'Phường' },
                  { i: 27286, n: '03', t: 'Phường' },
                  { i: 27283, n: '04', t: 'Phường' },
                  { i: 27274, n: '05', t: 'Phường' },
                  { i: 27265, n: '06', t: 'Phường' },
                  { i: 27268, n: '08', t: 'Phường' },
                  { i: 27262, n: '09', t: 'Phường' },
                  { i: 27271, n: '10', t: 'Phường' },
                  { i: 27256, n: '12', t: 'Phường' },
                  { i: 27259, n: '13', t: 'Phường' },
                  { i: 27280, n: '14', t: 'Phường' },
                  { i: 27295, n: '15', t: 'Phường' },
                  { i: 27289, n: '16', t: 'Phường' },
                  { i: 27277, n: '18', t: 'Phường' },
                ],
              },
              {
                i: 774,
                n: '5',
                t: 'Quận',
                c: [
                  { i: 27325, n: '01', t: 'Phường' },
                  { i: 27313, n: '02', t: 'Phường' },
                  { i: 27307, n: '03', t: 'Phường' },
                  { i: 27301, n: '04', t: 'Phường' },
                  { i: 27334, n: '05', t: 'Phường' },
                  { i: 27337, n: '06', t: 'Phường' },
                  { i: 27322, n: '07', t: 'Phường' },
                  { i: 27316, n: '08', t: 'Phường' },
                  { i: 27304, n: '09', t: 'Phường' },
                  { i: 27340, n: '10', t: 'Phường' },
                  { i: 27328, n: '11', t: 'Phường' },
                  { i: 27310, n: '12', t: 'Phường' },
                  { i: 27343, n: '13', t: 'Phường' },
                  { i: 27331, n: '14', t: 'Phường' },
                  { i: 27319, n: '15', t: 'Phường' },
                ],
              },
              {
                i: 775,
                n: '6',
                t: 'Quận',
                c: [
                  { i: 27370, n: '01', t: 'Phường' },
                  { i: 27367, n: '02', t: 'Phường' },
                  { i: 27379, n: '03', t: 'Phường' },
                  { i: 27373, n: '04', t: 'Phường' },
                  { i: 27361, n: '05', t: 'Phường' },
                  { i: 27355, n: '06', t: 'Phường' },
                  { i: 27382, n: '07', t: 'Phường' },
                  { i: 27376, n: '08', t: 'Phường' },
                  { i: 27352, n: '09', t: 'Phường' },
                  { i: 27385, n: '10', t: 'Phường' },
                  { i: 27364, n: '11', t: 'Phường' },
                  { i: 27358, n: '12', t: 'Phường' },
                  { i: 27349, n: '13', t: 'Phường' },
                  { i: 27346, n: '14', t: 'Phường' },
                ],
              },
              {
                i: 778,
                n: '7',
                t: 'Quận',
                c: [
                  { i: 27478, n: 'Bình Thuận', t: 'Phường' },
                  { i: 27493, n: 'Phú Mỹ', t: 'Phường' },
                  { i: 27484, n: 'Phú Thuận', t: 'Phường' },
                  { i: 27475, n: 'Tân Hưng', t: 'Phường' },
                  { i: 27472, n: 'Tân Kiểng', t: 'Phường' },
                  { i: 27490, n: 'Tân Phong', t: 'Phường' },
                  { i: 27487, n: 'Tân Phú', t: 'Phường' },
                  { i: 27481, n: 'Tân Quy', t: 'Phường' },
                  { i: 27466, n: 'Tân Thuận Đông', t: 'Phường' },
                  { i: 27469, n: 'Tân Thuận Tây', t: 'Phường' },
                ],
              },
              {
                i: 776,
                n: '8',
                t: 'Quận',
                c: [
                  { i: 27394, n: '01', t: 'Phường' },
                  { i: 27391, n: '02', t: 'Phường' },
                  { i: 27397, n: '03', t: 'Phường' },
                  { i: 27409, n: '04', t: 'Phường' },
                  { i: 27418, n: '05', t: 'Phường' },
                  { i: 27424, n: '06', t: 'Phường' },
                  { i: 27433, n: '07', t: 'Phường' },
                  { i: 27388, n: '08', t: 'Phường' },
                  { i: 27403, n: '09', t: 'Phường' },
                  { i: 27406, n: '10', t: 'Phường' },
                  { i: 27400, n: '11', t: 'Phường' },
                  { i: 27415, n: '12', t: 'Phường' },
                  { i: 27412, n: '13', t: 'Phường' },
                  { i: 27421, n: '14', t: 'Phường' },
                  { i: 27427, n: '15', t: 'Phường' },
                  { i: 27430, n: '16', t: 'Phường' },
                ],
              },
              {
                i: 763,
                n: '9',
                t: 'Quận',
                c: [
                  { i: 26839, n: 'Hiệp Phú', t: 'Phường' },
                  { i: 26830, n: 'Long Bình', t: 'Phường' },
                  { i: 26857, n: 'Long Phước', t: 'Phường' },
                  { i: 26833, n: 'Long Thạnh Mỹ', t: 'Phường' },
                  { i: 26860, n: 'Long Trường', t: 'Phường' },
                  { i: 26866, n: 'Phú Hữu', t: 'Phường' },
                  { i: 26863, n: 'Phước Bình', t: 'Phường' },
                  { i: 26851, n: 'Phước Long A', t: 'Phường' },
                  { i: 26848, n: 'Phước Long B', t: 'Phường' },
                  { i: 26836, n: 'Tân Phú', t: 'Phường' },
                  { i: 26842, n: 'Tăng Nhơn Phú A', t: 'Phường' },
                  { i: 26845, n: 'Tăng Nhơn Phú B', t: 'Phường' },
                  { i: 26854, n: 'Trường Thạnh', t: 'Phường' },
                ],
              },
              {
                i: 771,
                n: '10',
                t: 'Quận',
                c: [
                  { i: 27184, n: '01', t: 'Phường' },
                  { i: 27190, n: '02', t: 'Phường' },
                  { i: 27205, n: '03', t: 'Phường' },
                  { i: 27193, n: '04', t: 'Phường' },
                  { i: 27199, n: '05', t: 'Phường' },
                  { i: 27202, n: '06', t: 'Phường' },
                  { i: 27196, n: '07', t: 'Phường' },
                  { i: 27187, n: '08', t: 'Phường' },
                  { i: 27181, n: '09', t: 'Phường' },
                  { i: 27178, n: '10', t: 'Phường' },
                  { i: 27175, n: '11', t: 'Phường' },
                  { i: 27172, n: '12', t: 'Phường' },
                  { i: 27166, n: '13', t: 'Phường' },
                  { i: 27169, n: '14', t: 'Phường' },
                  { i: 27163, n: '15', t: 'Phường' },
                ],
              },
              {
                i: 772,
                n: '11',
                t: 'Quận',
                c: [
                  { i: 27247, n: '01', t: 'Phường' },
                  { i: 27250, n: '02', t: 'Phường' },
                  { i: 27220, n: '03', t: 'Phường' },
                  { i: 27244, n: '04', t: 'Phường' },
                  { i: 27211, n: '05', t: 'Phường' },
                  { i: 27241, n: '06', t: 'Phường' },
                  { i: 27238, n: '07', t: 'Phường' },
                  { i: 27229, n: '08', t: 'Phường' },
                  { i: 27232, n: '09', t: 'Phường' },
                  { i: 27223, n: '10', t: 'Phường' },
                  { i: 27217, n: '11', t: 'Phường' },
                  { i: 27235, n: '12', t: 'Phường' },
                  { i: 27226, n: '13', t: 'Phường' },
                  { i: 27214, n: '14', t: 'Phường' },
                  { i: 27208, n: '15', t: 'Phường' },
                  { i: 27253, n: '16', t: 'Phường' },
                ],
              },
              {
                i: 761,
                n: '12',
                t: 'Quận',
                c: [
                  { i: 26779, n: 'An Phú Đông', t: 'Phường' },
                  { i: 26788, n: 'Đông Hưng Thuận', t: 'Phường' },
                  { i: 26770, n: 'Hiệp Thành', t: 'Phường' },
                  { i: 26776, n: 'Tân Chánh Hiệp', t: 'Phường' },
                  { i: 26787, n: 'Tân Hưng Thuận', t: 'Phường' },
                  { i: 26782, n: 'Tân Thới Hiệp', t: 'Phường' },
                  { i: 26791, n: 'Tân Thới Nhất', t: 'Phường' },
                  { i: 26767, n: 'Thạnh Lộc', t: 'Phường' },
                  { i: 26764, n: 'Thạnh Xuân', t: 'Phường' },
                  { i: 26773, n: 'Thới An', t: 'Phường' },
                  { i: 26785, n: 'Trung Mỹ Tây', t: 'Phường' },
                ],
              },
              {
                i: 785,
                n: 'Bình Chánh',
                t: 'Huyện',
                c: [
                  { i: 27625, n: 'An Phú Tây', t: 'Xã' },
                  { i: 27637, n: 'Bình Chánh', t: 'Xã' },
                  { i: 27619, n: 'Bình Hưng', t: 'Xã' },
                  { i: 27607, n: 'Bình Lợi', t: 'Xã' },
                  { i: 27631, n: 'Đa Phước', t: 'Xã' },
                  { i: 27628, n: 'Hưng Long', t: 'Xã' },
                  { i: 27610, n: 'Lê Minh Xuân', t: 'Xã' },
                  { i: 27598, n: 'Phạm Văn Hai', t: 'Xã' },
                  { i: 27622, n: 'Phong Phú', t: 'Xã' },
                  { i: 27640, n: 'Quy Đức', t: 'Xã' },
                  { i: 27616, n: 'Tân Kiên', t: 'Xã' },
                  { i: 27613, n: 'Tân Nhựt', t: 'Xã' },
                  { i: 27634, n: 'Tân Quý Tây', t: 'Xã' },
                  { i: 27595, n: 'Tân Túc', t: 'Thị Trấn' },
                  { i: 27601, n: 'Vĩnh Lộc A', t: 'Xã' },
                  { i: 27604, n: 'Vĩnh Lộc B', t: 'Xã' },
                ],
              },
              {
                i: 777,
                n: 'Bình Tân',
                t: 'Quận',
                c: [
                  { i: 27460, n: 'An Lạc', t: 'Phường' },
                  { i: 27463, n: 'An Lạc A', t: 'Phường' },
                  { i: 27436, n: 'Bình Hưng Hòa', t: 'Phường' },
                  { i: 27439, n: 'Binh Hưng Hoà A', t: 'Phường' },
                  { i: 27442, n: 'Binh Hưng Hoà B', t: 'Phường' },
                  { i: 27445, n: 'Bình Trị Đông', t: 'Phường' },
                  { i: 27448, n: 'Bình Trị Đông A', t: 'Phường' },
                  { i: 27451, n: 'Bình Trị Đông B', t: 'Phường' },
                  { i: 27454, n: 'Tân Tạo', t: 'Phường' },
                  { i: 27457, n: 'Tân Tạo A', t: 'Phường' },
                ],
              },
              {
                i: 765,
                n: 'Bình Thạnh',
                t: 'Quận',
                c: [
                  { i: 26944, n: '01', t: 'Phường' },
                  { i: 26941, n: '02', t: 'Phường' },
                  { i: 26947, n: '03', t: 'Phường' },
                  { i: 26923, n: '05', t: 'Phường' },
                  { i: 26932, n: '06', t: 'Phường' },
                  { i: 26926, n: '07', t: 'Phường' },
                  { i: 26908, n: '11', t: 'Phường' },
                  { i: 26917, n: '12', t: 'Phường' },
                  { i: 26905, n: '13', t: 'Phường' },
                  { i: 26935, n: '14', t: 'Phường' },
                  { i: 26938, n: '15', t: 'Phường' },
                  { i: 26950, n: '17', t: 'Phường' },
                  { i: 26959, n: '19', t: 'Phường' },
                  { i: 26953, n: '21', t: 'Phường' },
                  { i: 26956, n: '22', t: 'Phường' },
                  { i: 26929, n: '24', t: 'Phường' },
                  { i: 26920, n: '25', t: 'Phường' },
                  { i: 26914, n: '26', t: 'Phường' },
                  { i: 26911, n: '27', t: 'Phường' },
                  { i: 26962, n: '28', t: 'Phường' },
                ],
              },
              {
                i: 787,
                n: 'Cần Giờ',
                t: 'Huyện',
                c: [
                  { i: 27673, n: 'An Thới Đông', t: 'Xã' },
                  { i: 27667, n: 'Bình Khánh', t: 'Xã' },
                  { i: 27664, n: 'Cần Thạnh', t: 'Thị Trấn' },
                  { i: 27679, n: 'Long Hòa', t: 'Xã' },
                  { i: 27682, n: 'Lý Nhơn', t: 'Xã' },
                  { i: 27670, n: 'Tam Thôn Hiệp', t: 'Xã' },
                  { i: 27676, n: 'Thạnh An', t: 'Xã' },
                ],
              },
              {
                i: 783,
                n: 'Củ Chi',
                t: 'Huyện',
                c: [
                  { i: 27508, n: 'An Nhơn Tây', t: 'Xã' },
                  { i: 27502, n: 'An Phú', t: 'Xã' },
                  { i: 27550, n: 'Bình Mỹ', t: 'Xã' },
                  { i: 27496, n: 'Củ Chi', t: 'Thị Trấn' },
                  { i: 27544, n: 'Hòa Phú', t: 'Xã' },
                  { i: 27511, n: 'Nhuận Đức', t: 'Xã' },
                  { i: 27514, n: 'Phạm Văn Cội', t: 'Xã' },
                  { i: 27517, n: 'Phú Hòa Đông', t: 'Xã' },
                  { i: 27499, n: 'Phú Mỹ Hưng', t: 'Xã' },
                  { i: 27529, n: 'Phước Hiệp', t: 'Xã' },
                  { i: 27526, n: 'Phước Thạnh', t: 'Xã' },
                  { i: 27535, n: 'Phước Vĩnh An', t: 'Xã' },
                  { i: 27532, n: 'Tân An Hội', t: 'Xã' },
                  { i: 27553, n: 'Tân Phú Trung', t: 'Xã' },
                  { i: 27547, n: 'Tân Thạnh Đông', t: 'Xã' },
                  { i: 27541, n: 'Tân Thạnh Tây', t: 'Xã' },
                  { i: 27556, n: 'Tân Thông Hội', t: 'Xã' },
                  { i: 27538, n: 'Thái Mỹ', t: 'Xã' },
                  { i: 27523, n: 'Trung An', t: 'Xã' },
                  { i: 27520, n: 'Trung Lập Hạ', t: 'Xã' },
                  { i: 27505, n: 'Trung Lập Thượng', t: 'Xã' },
                ],
              },
              {
                i: 764,
                n: 'Gò Vấp',
                t: 'Quận',
                c: [
                  { i: 26896, n: '01', t: 'Phường' },
                  { i: 26902, n: '03', t: 'Phường' },
                  { i: 26893, n: '04', t: 'Phường' },
                  { i: 26887, n: '05', t: 'Phường' },
                  { i: 26890, n: '07', t: 'Phường' },
                  { i: 26884, n: '10', t: 'Phường' },
                  { i: 26899, n: '11', t: 'Phường' },
                  { i: 26881, n: '12', t: 'Phường' },
                  { i: 26872, n: '13', t: 'Phường' },
                  { i: 26882, n: '14', t: 'Phường' },
                  { i: 26869, n: '15', t: 'Phường' },
                  { i: 26878, n: '16', t: 'Phường' },
                  { i: 26875, n: '17', t: 'Phường' },
                  { i: 26876, n: '6', t: 'Phường' },
                  { i: 26898, n: '8', t: 'Phường' },
                  { i: 26897, n: '9', t: 'Phường' },
                ],
              },
              {
                i: 784,
                n: 'Hóc Môn',
                t: 'Huyện',
                c: [
                  { i: 27592, n: 'Bà Điểm', t: 'Xã' },
                  { i: 27568, n: 'Đông Thạnh', t: 'Xã' },
                  { i: 27559, n: 'Hóc Môn', t: 'Thị Trấn' },
                  { i: 27565, n: 'Nhị Bình', t: 'Xã' },
                  { i: 27562, n: 'Tân Hiệp', t: 'Xã' },
                  { i: 27571, n: 'Tân Thới Nhì', t: 'Xã' },
                  { i: 27580, n: 'Tân Xuân', t: 'Xã' },
                  { i: 27574, n: 'Thới Tam Thôn', t: 'Xã' },
                  { i: 27586, n: 'Trung Chánh', t: 'Xã' },
                  { i: 27583, n: 'Xuân Thới Đông', t: 'Xã' },
                  { i: 27577, n: 'Xuân Thới Sơn', t: 'Xã' },
                  { i: 27589, n: 'Xuân Thới Thượng', t: 'Xã' },
                ],
              },
              {
                i: 786,
                n: 'Nhà Bè',
                t: 'Huyện',
                c: [
                  { i: 27661, n: 'Hiệp Phước', t: 'Xã' },
                  { i: 27658, n: 'Long Thới', t: 'Xã' },
                  { i: 27643, n: 'Nhà Bè', t: 'Thị Trấn' },
                  { i: 27652, n: 'Nhơn Đức', t: 'Xã' },
                  { i: 27655, n: 'Phú Xuân', t: 'Xã' },
                  { i: 27646, n: 'Phước Kiển', t: 'Xã' },
                  { i: 27649, n: 'Phước Lộc', t: 'Xã' },
                ],
              },
              {
                i: 768,
                n: 'Phú Nhuận',
                t: 'Quận',
                c: [
                  { i: 27058, n: '01', t: 'Phường' },
                  { i: 27061, n: '02', t: 'Phường' },
                  { i: 27055, n: '03', t: 'Phường' },
                  { i: 27043, n: '04', t: 'Phường' },
                  { i: 27046, n: '05', t: 'Phường' },
                  { i: 27052, n: '07', t: 'Phường' },
                  { i: 27064, n: '08', t: 'Phường' },
                  { i: 27049, n: '09', t: 'Phường' },
                  { i: 27070, n: '10', t: 'Phường' },
                  { i: 27073, n: '11', t: 'Phường' },
                  { i: 27082, n: '12', t: 'Phường' },
                  { i: 27085, n: '13', t: 'Phường' },
                  { i: 27079, n: '14', t: 'Phường' },
                  { i: 27067, n: '15', t: 'Phường' },
                  { i: 27076, n: '17', t: 'Phường' },
                ],
              },
              {
                i: 766,
                n: 'Tân Bình',
                t: 'Quận',
                c: [
                  { i: 26977, n: '01', t: 'Phường' },
                  { i: 26965, n: '02', t: 'Phường' },
                  { i: 26980, n: '03', t: 'Phường' },
                  { i: 26968, n: '04', t: 'Phường' },
                  { i: 26989, n: '05', t: 'Phường' },
                  { i: 26995, n: '06', t: 'Phường' },
                  { i: 26986, n: '07', t: 'Phường' },
                  { i: 26998, n: '08', t: 'Phường' },
                  { i: 27001, n: '09', t: 'Phường' },
                  { i: 26992, n: '10', t: 'Phường' },
                  { i: 26983, n: '11', t: 'Phường' },
                  { i: 26971, n: '12', t: 'Phường' },
                  { i: 26974, n: '13', t: 'Phường' },
                  { i: 27004, n: '14', t: 'Phường' },
                  { i: 27007, n: '15', t: 'Phường' },
                ],
              },
              {
                i: 767,
                n: 'Tân Phú',
                t: 'Quận',
                c: [
                  { i: 27037, n: 'Hiệp Tân', t: 'Phường' },
                  { i: 27034, n: 'Hoà Thạnh', t: 'Phường' },
                  { i: 27028, n: 'Phú Thạnh', t: 'Phường' },
                  { i: 27025, n: 'Phú Thọ Hoà', t: 'Phường' },
                  { i: 27031, n: 'Phú Trung', t: 'Phường' },
                  { i: 27016, n: 'Sơn Kỳ', t: 'Phường' },
                  { i: 27019, n: 'Tân Quý', t: 'Phường' },
                  { i: 27010, n: 'Tân Sơn Nhì', t: 'Phường' },
                  { i: 27022, n: 'Tân Thành', t: 'Phường' },
                  { i: 27040, n: 'Tân Thới Hoà', t: 'Phường' },
                  { i: 27013, n: 'Tây Thạnh', t: 'Phường' },
                ],
              },
              {
                i: 762,
                n: 'Thủ Đức',
                t: 'Quận',
                c: [
                  { i: 26797, n: 'Bình Chiểu', t: 'Phường' },
                  { i: 26824, n: 'Bình Thọ', t: 'Phường' },
                  { i: 26812, n: 'Hiệp Bình Chánh', t: 'Phường' },
                  { i: 26809, n: 'Hiệp Bình Phước', t: 'Phường' },
                  { i: 26815, n: 'Linh Chiểu', t: 'Phường' },
                  { i: 26821, n: 'Linh Đông', t: 'Phường' },
                  { i: 26818, n: 'Linh Tây', t: 'Phường' },
                  { i: 26800, n: 'Linh Trung', t: 'Phường' },
                  { i: 26794, n: 'Linh Xuân', t: 'Phường' },
                  { i: 26803, n: 'Tam Bình', t: 'Phường' },
                  { i: 26806, n: 'Tam Phú', t: 'Phường' },
                  { i: 26827, n: 'Trường Thọ', t: 'Phường' },
                ],
              },
            ],
          },
        ],
        s,
        p,
        d,
        w,
        n;
      switch (getValueBy) {
        case 'name':
          s = 'n';
          break;
        default:
          s = 'i';
      }
      try {
        let es = (param) => param.replace(/^#|\.+/i, ''),
          ps = es(province),
          ds = es(district),
          ws = es(ward);
        p =
          document.querySelector(`select.${ps}`) ||
          document.querySelector(`select#${ps}`) ||
          document.querySelector(`select[name="${ps}"]`);
        d =
          document.querySelector(`select.${ds}`) ||
          document.querySelector(`select#${ds}`) ||
          document.querySelector(`select[name="${ds}"]`);
        w =
          document.querySelector(`select.${ws}`) ||
          document.querySelector(`select#${ws}`) ||
          document.querySelector(`select[name="${ws}"]`);
        if (p === null || d === null || w === null)
          return console.error(`One or more selectors cannot be found`);
      } catch (e) {
        return console.error(`One or more selectors cannot be found at ` + e);
      }
      let o = document.createElement('option');
      o.text = provinceText;
      o.value = '';
      o.disabled = hidePlaceHolderOption;
      o.selected = true;
      o.hidden = hidePlaceHolderOption;
      p.add(o);
      let od = document.createElement('option');
      od.text = districtText;
      od.value = '';
      od.disabled = hidePlaceHolderOption;
      od.selected = true;
      od.hidden = hidePlaceHolderOption;
      d.add(od);
      let ow = document.createElement('option');
      ow.text = wardText;
      ow.value = '';
      ow.disabled = hidePlaceHolderOption;
      ow.selected = true;
      ow.hidden = hidePlaceHolderOption;
      w.add(ow);
      for (let i = 0; i < data.length - 1; i++) {
        let o = document.createElement('option');
        o.text = (provincePrefix ? data[i].t + ' ' : '') + data[i].n;
        o.value = data[i][s];
        if (levelAsAttribute) o.setAttribute(levelAttributeName, data[i].t);
        p.add(o);
      }
      p.addEventListener('change', function () {
        d.innerHTML = '';
        w.innerHTML = '';
        let o = document.createElement('option');
        o.text = districtText;
        o.value = '';
        o.disabled = hidePlaceHolderOption;
        o.selected = true;
        o.hidden = hidePlaceHolderOption;
        d.add(o);
        let ow = document.createElement('option');
        ow.text = wardText;
        ow.value = '';
        ow.disabled = hidePlaceHolderOption;
        ow.selected = true;
        ow.hidden = hidePlaceHolderOption;
        w.add(ow);
        let l = p.selectedIndex - 1;
        n = l;
        for (let i = 0; i < data[l].c.length - 1; i++) {
          let o = document.createElement('option');
          o.text =
            (districtPrefix ? data[l].c[i].t + ' ' : '') + data[l].c[i].n;
          o.value = data[l].c[i][s];
          if (levelAsAttribute)
            o.setAttribute(levelAttributeName, data[l].c[i].t);
          d.add(o);
        }
      });
      d.addEventListener('change', function () {
        w.innerHTML = '';
        let l = d.selectedIndex - 1;
        if (data[n].c[l].c.length === 0) {
          let o = document.createElement('option');
          o.text = wardNoText;
          o.value = emptyValue;
          o.selected = true;
          o.hidden = hideEmptyValueOption;
          w.add(o);
        } else {
          let o = document.createElement('option');
          o.text = wardText;
          o.value = '';
          o.disabled = hidePlaceHolderOption;
          o.selected = true;
          o.hidden = hidePlaceHolderOption;
          w.add(o);
          for (let i = 0; i < data[n].c[l].c.length - 1; i++) {
            let o = document.createElement('option');
            o.text =
              (districtPrefix ? data[n].c[l].c[i].t + ' ' : '') +
              data[n].c[l].c[i].n;
            o.value = data[n].c[l].c[i][s];
            if (levelAsAttribute)
              o.setAttribute(levelAttributeName, data[n].c[l].c[i].t);
            w.add(o);
          }
        }
      });
    }
    window.addEventListener('load', init);
  };
})();
