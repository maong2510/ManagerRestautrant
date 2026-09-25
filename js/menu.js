// Dữ liệu thực đơn. Thay "img" bằng ảnh thật của nhà hàng (VD: "images/lau-ech-mang-cay.jpg")
// khi có. Ảnh hiện tại là ảnh minh họa miễn phí bản quyền từ Pexels.
// category: "lau" | "an-kem" | "do-uong"
(function () {
  function pexels(id, w) {
    return "https://images.pexels.com/photos/" + id + "/pexels-photo-" + id +
      ".jpeg?auto=compress&cs=tinysrgb&w=" + (w || 900);
  }

  window.PEXELS = pexels;

  window.MENU = [
    {
      category: "lau",
      name: "Lẩu ếch măng cay",
      desc: "Món “linh hồn” của Huyền Anh: ếch đồng om sả ớt, măng chua giòn, nước dùng cay nồng đậm đà.",
      tag: "Best seller",
      featured: true,
      img: pexels(13688385, 1400)
    },
    {
      category: "lau",
      name: "Lẩu ếch om chuối đậu",
      desc: "Chuối xanh bùi, đậu rán béo, thơm mẻ và nghệ – chuẩn vị Bắc.",
      img: pexels(12120312)
    },
    {
      category: "lau",
      name: "Lẩu ếch Tứ Xuyên",
      desc: "Nước lẩu đỏ au, tê cay đặc trưng cho team “ăn cay không sợ”.",
      tag: "Siêu cay",
      img: pexels(6752363)
    },
    {
      category: "lau",
      name: "Lẩu ếch nấm",
      desc: "Nước dùng thanh ngọt từ nấm tươi, hợp cả nhà và các bé.",
      img: pexels(16938315)
    },
    {
      category: "an-kem",
      name: "Ếch chiên giòn",
      desc: "Đùi ếch tẩm bột chiên vàng, giòn rụm bên ngoài, ngọt mềm bên trong.",
      tag: "Phải thử",
      featured: true,
      img: pexels(32067295, 1400)
    },
    {
      category: "an-kem",
      name: "Ếch rang muối ớt",
      desc: "Đậm đà, thơm tỏi phi và lá chanh – món nhắm “cháy” nhất.",
      img: pexels(6941026)
    },
    {
      category: "an-kem",
      name: "Rau & nấm nhúng lẩu",
      desc: "Rau muống, cải, hoa chuối, nấm kim châm… tươi xanh mỗi ngày.",
      img: pexels(4020559)
    },
    {
      category: "an-kem",
      name: "Bún, mì, đậu phụ",
      desc: "Ăn kèm nồi lẩu cho bữa ăn no nê, trọn vị.",
      img: pexels(23645813)
    },
    {
      category: "do-uong",
      name: "Bia lạnh",
      desc: "Mát lạnh – “cạ cứng” của nồi lẩu cay.",
      featured: true,
      img: pexels(7016490, 1400)
    },
    {
      category: "do-uong",
      name: "Trà chanh",
      desc: "Chua ngọt mát lạnh, giải nhiệt cực đã.",
      img: pexels(1382391)
    },
    {
      category: "do-uong",
      name: "Nước ngọt & nước suối",
      desc: "Các loại nước giải khát có ga, nước suối.",
      img: pexels(1194030)
    }
  ];
})();
