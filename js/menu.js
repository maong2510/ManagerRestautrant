// Dữ liệu thực đơn. Thay "img" bằng ảnh thật của nhà hàng (VD: "images/lau-ech-mang-cay.jpg")
// khi có. Ảnh hiện tại là ảnh minh họa miễn phí bản quyền từ Pexels (chủ đề Việt Nam).
// category: "lau" | "an-kem"
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
      img: pexels(19237181, 1400)
    },
    {
      category: "lau",
      name: "Lẩu ếch om chuối đậu",
      desc: "Chuối xanh bùi, đậu rán béo, thơm mẻ và nghệ – chuẩn vị Bắc.",
      img: pexels(6426069, 1200)
    },
    {
      category: "an-kem",
      name: "Nem rán giòn",
      desc: "Vàng ruộm, giòn rụm – món “khai vị” quen thuộc của mâm lẩu Việt.",
      tag: "Phải thử",
      featured: true,
      img: pexels(31577037, 1400)
    },
    {
      category: "an-kem",
      name: "Rau sống & bún tươi",
      desc: "Rau thơm, rau nhúng tươi xanh cùng bún tươi ăn kèm nồi lẩu.",
      img: pexels(2318966)
    },
    {
      category: "an-kem",
      name: "Xiên nướng",
      desc: "Thơm lừng mùi than hoa, nhâm nhi trong lúc chờ lẩu sôi.",
      img: pexels(3024593)
    }
  ];
})();
