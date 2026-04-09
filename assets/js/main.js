'use strict' ;

/*
===========================
ヘッダースクロールのコントロール
=========================== 

スクロール方向を判定して、ヘッダーを表示、非表示にする　→　is-hiddenクラスのつけ外しする
下スクロール　→　ヘッダーを非表示
上スクロール　→ ヘッダーを再表示

1 前回のスクロール位置を保存　→ lastScrollY
2 現在のスクロール位置を取得　→ currentScrollY
3 前回と現在を比較してスクロール方向を判定する
4 下スクロールなら　.is-hiddenをつける
5 上スクロールなら　.is-hiddenをとる

*/

//ヘッダーを取得
const Header = document.querySelector('.js-header');

//前回のスクロール位置
let lastScrollY = 0;

//スクロールイベント
window.addEventListener('scroll' , () => {

    //現在のスクロール位置
    const currentScrollY = window.scrollY;

    //下へスクロールした時かつ50以上スクロールした場合
    if (currentScrollY > lastScrollY && currentScrollY > 240) {

        //is-hiddenをつける(add)　→　ヘッダーを隠す
        Header.classList.add('is-hidden');

    } else {

        //is-hiddenを外す(remove)　→　ヘッダーを表示
        Header.classList.remove('is-hidden');
    }

    //今回のスクロール位置を保存する
    lastScrollY = currentScrollY;
});



/*
===========================
ドロワーメニュー開閉
=========================== 
*/

//JSで使う要素を取得
const siteHeaderOpenBtn = document.querySelector('.js-site-header-open-btn');
const siteNavCloseBtn = document.querySelector('.js-site-nav-close-btn');
const siteNav = document.querySelector('.js-site-nav');
const siteNavOverlay = document.querySelector('.js-site-nav-overlay');

//要素が全て存在する場合のみJS実行する
if (siteHeaderOpenBtn && siteNavCloseBtn && siteNav && siteNavOverlay) {

    //メニューを開く処理
    const openMenu = () => {
    
        //is-openをつける(add) → メニューを表示
        siteNav.classList.add('is-open');
        
        //背景のスクロールを止める
        document.body.style.overflow = 'hidden';
    };

    //メニューを閉じる処理を１つにまとめるための箱を作っている。
    const closeMenu = () => {
    
        //is-openを外す(remove) → メニューを非表示
        siteNav.classList.remove('is-open');
        
        //背景のスクロールできるように戻す
        document.body.style.overflow = 'auto';
    };

    //開くボタンを押したらメニューが開く siteHeaderOpenBtnをクリックしたら、上で定義した箱のopenMenuの処理が開始されるってこと
    siteHeaderOpenBtn.addEventListener('click', openMenu);

    //閉じるボタンを押したら閉じる
    siteNavCloseBtn.addEventListener('click' , closeMenu);

    //背景オーバーレイを押したら閉じる
    siteNavOverlay.addEventListener('click' , closeMenu);
}



/*
===========================
our-scents の　Splide
=========================== 
*/

const topSlider = document.querySelector('.js-top-slider');

if (topSlider) {

    new Splide(topSlider, {
    type: 'loop',

    perPage: 3,
    perMove: 1,

    focus: 'center',

    gap: '60px',

    speed: 800,
    
    arrows: true,
    pagination: false,

    breakpoints: {

        1024: {
            type: 'loop',
            perPage: 2,
            perMove: 1,
            gap: '40px',
            pagination: false,
            arrows: true,
        },

        768: {
            type: 'loop',
            focus: 'center',
            perPage: 1.5,
            perMove: 1,
            gap: '30px',
            pagination: false,
            arrows: true,
        },
    },
    
} ).mount();
}



/*
===========================
our-philosophy
=========================== 
*/

//JSで使う要素を取得 querySelectorAllで複数とる
const philosophyOpenBtns = document.querySelectorAll('.js-philosophy-open-btn');
const philosophyOverlays = document.querySelectorAll('.js-philosophy-overlay');
const philosophyCloseBtns = document.querySelectorAll('.js-philosophy-close');

//要素が存在するときに実行
if (
    philosophyOpenBtns.length > 0 &&
    philosophyOverlays.length > 0 &&
    philosophyCloseBtns.length > 0
) {

//開く

//  idは１つだけの名前やからそのidと繋がる同士で３組取得できる　なのでIDで指定してる
philosophyOpenBtns.forEach((btn) => {
    btn.addEventListener("click", () => {

        //上記のforEach((btn)で取得したそのボタンの　htmlのdata-modalの値（"philosophy-modal-01"）を取り出している　→ modalIdって箱に、philosophy-modal-01を入れている
        const modalId = btn.dataset.modal;

        //その取り出した値と同じidを持つモーダルを探す　targetModalって箱に、それを入れてる
        const targetModal = document.getElementById(modalId);

        //見つかったらそれに、is-openをつける
            if (targetModal) {
            targetModal.classList.add("is-open")

            ////背景のスクロールを止める
            document.body.style.overflow = "hidden";
        }
    });
});

//閉じる
philosophyCloseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        
        //このbtn(philosophyCloseBtns)各々から、一番近いjs-philosophy-modalクラス（htmlの）を取得して、modalという名前とします
        const modal = btn.closest(".js-philosophy-modal");

        modal.classList.remove("is-open");

        document.body.style.overflow = "auto";
    });
});

//オーバーレイ
philosophyOverlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {

        const modal = overlay.closest(".js-philosophy-modal");

        modal.classList.remove("is-open");

        document.body.style.overflow = "auto";
    });

});

}


