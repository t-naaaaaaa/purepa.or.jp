const initializeAccordion = (element, duration, easing) => {
  if (!element) return;

  const button = element.querySelector(".button");
  const panel = element.querySelector(".panel");
  if (!button || !panel) return;

  const panelId = panel.getAttribute("id");
  button.setAttribute("aria-expanded", "false");
  panelId && button.setAttribute("aria-controls", panelId);

  let isTransitioning = false; // 連打防止フラグ

  panel.style.transition = `block-size ${duration}ms ${easing}`;
  panel.style.contain = "content";

  // 縦書きモードかどうかを取得
  const getIsVerticalWritingMode = () => {
    const writingMode = window.getComputedStyle(element).writingMode;
    return writingMode.includes("vertical");
  };

  const isOpened = () => button.getAttribute("aria-expanded") === "true";

  // アコーディオンを開く
  const onOpen = () => {
    if (isOpened() || isTransitioning) return;
    isTransitioning = true;
    panel.style.blockSize = "0";
    panel.removeAttribute("hidden");
    button.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.blockSize = `${
          getIsVerticalWritingMode() ? panel.scrollWidth : panel.scrollHeight
        }px`;
      });
    });
    panel.addEventListener(
      "transitionend",
      () => {
        panel.style.blockSize = "";
        isTransitioning = false;
      },
      {
        once: true,
      }
    );
  };

  // アコーディオンを閉じる
  const onClose = () => {
    if (!isOpened() || isTransitioning) return;
    isTransitioning = true;
    panel.style.blockSize = `${
      getIsVerticalWritingMode() ? panel.scrollWidth : panel.scrollHeight
    }px`;
    button.setAttribute("aria-expanded", "false");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.blockSize = "0";
      });
    });
    panel.addEventListener(
      "transitionend",
      () => {
        panel.style.blockSize = "";
        panel.setAttribute("hidden", "until-found");
        isTransitioning = false;
      },
      {
        once: true,
      }
    );
  };

  // クリックを管理する関数
  const handleClick = (event) => {
    event.preventDefault();
    isOpened() ? onClose() : onOpen();
  };

  // スペースの挙動をbutton要素と合わせる
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      handleClick(event);
    }
  };

  // マッチ前の処理を管理する関数
  const handleBeforeMatch = () => {
    button.setAttribute("aria-expanded", "true");
  };

  // イベントリスナーを追加
  button.addEventListener("click", handleClick);
  button.addEventListener("keydown", handleKeyDown);
  panel.addEventListener("beforematch", handleBeforeMatch);

  // クリーンアップ関数を返す
  return () => {
    button.removeEventListener("click", handleClick);
    button.removeEventListener("keydown", handleKeyDown);
    panel.removeEventListener("beforematch", handleBeforeMatch);
  };
};

const accordion = document.getElementById("accordion");

document.querySelectorAll(".accordion").forEach((accordion) => {
  if (accordion) initializeAccordion(accordion, 300, "ease-in-out");
});
