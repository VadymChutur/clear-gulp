// test support webp, add class webp or no-webp for HTML
export function isWebp() {
  //test support webp
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('html').classList.add('webp');
    } else {
      document.querySelector('html').classList.add('no-webp');
    }
  });

  //not stabile ternar
  //     function testWebP(callback) { let webP = new Image(); webP.omload = webP.onerror = function () { callback(webP.height == 2); };
  // webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'; }
  // //add class _webp or _no-webp for HTML testWebP(function (support) { let className = support == true ? 'webp' : 'no-webp';
  // document.documentElement.classList.add(className); });
}
