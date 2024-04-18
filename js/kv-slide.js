document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image-gallery .image-item");
  const totalImages = images.length;
  const container = document.querySelector(".image-gallery .container");
  let currentIndex = 0;

  function slideImages() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = -currentIndex * 100; // 100vwずつ左に移動
    container.style.transform = `translateX(${offset}vw)`;
  }

  setInterval(slideImages, 3000); // 3秒ごとに画像をスライドさせる
});
