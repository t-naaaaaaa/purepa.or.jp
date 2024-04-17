document.getElementById("drawer_input").addEventListener("change", function () {
  const iconSpans = document.querySelectorAll(".drawer-icon span");
  if (this.checked) {
    iconSpans[1].style.background = "rgba(255, 255, 255, 0)"; // 真ん中の線を透明にする
    iconSpans[0].style.transform = "rotate(45deg)"; // 上の線を45度回転
    iconSpans[0].style.position = "absolute"; // 位置を絶対位置に設定
    iconSpans[0].style.bottom = "0"; // 下に配置
    iconSpans[2].style.transform = "rotate(-45deg)"; // 下の線を-45度回転
    iconSpans[2].style.position = "absolute"; // 位置を絶対位置に設定
    iconSpans[2].style.top = "0"; // 上に配置
  } else {
    iconSpans[1].style.background = ""; // 背景色を元に戻す
    iconSpans[0].style.transform = ""; // 回転を元に戻す
    iconSpans[0].style.position = ""; // 位置を元に戻す
    iconSpans[0].style.bottom = ""; // 位置を元に戻す
    iconSpans[2].style.transform = ""; // 回転を元に戻す
    iconSpans[2].style.position = ""; // 位置を元に戻す
    iconSpans[2].style.top = ""; // 位置を元に戻す
  }
});
