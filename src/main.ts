// main.ts = TypeScript
// ウェブサイトの「動き」を作るためのもの

///////////////////////////////////// ここからが他ファイルとの関係 ////////////////////////////////////////////////////////////

import "./style.css";
import { members, getImageUrl, type Member, type Work, type ProfileItem } from "./data";

const SITE_TITLE = "28卒 ゲーム作品ポートフォリオ";


///////////////////////////////////// 画面の入れ物 ////////////////////////////////////////////////////////////

const app = document.querySelector<HTMLDivElement>("#app")!;
const schoolName = document.querySelector<HTMLSpanElement>(".school-name")!;
const backButton = document.querySelector<HTMLAnchorElement>("#back-button")!;


///////////////////////////////////// 共通の部品 ////////////////////////////////////////////////////////////

// 写真の HTML を作る（URL があれば画像、なければグレーの仮置き）
function photoHtml(url: string | undefined, alt: string, className: string): string {
    return url
        ? `<img class="${className}" src="${url}" alt="${alt}" loading="lazy" />`
        : `<div class="${className} photo-placeholder"></div>`;
}

// 希望職種のタグを作る
function jobTagsHtml(member: Member): string {
    return member.jobs.map((job) => `<span class="tag">${job}</span>`).join("");
}


///////////////////////////////////// 一覧ページ ////////////////////////////////////////////////////////////

// メンバーカード1枚を作る（クリックでその人のページへ移動するリンク）
function memberCardHtml(member: Member): string {
    return `
    <a class="member-card" href="#/members/${member.id}">
        ${photoHtml(getImageUrl(member.id, member.photo), `${member.name}の顔写真`, "member-photo")}
        <div class="member-body">
            <span class="member-name">${member.name}</span>
            <span class="member-romaji">${member.nameRomaji}</span>
            <span class="label">希望職種</span>
            <div class="tag-list">${jobTagsHtml(member)}</div>
        </div>
    </a>`;
}

// 一覧ページを表示する
function renderListPage() {
    document.title = SITE_TITLE;   // ブラウザのタブに出る名前
    schoolName.hidden = false;     // ヘッダー右：学校名を出す
    backButton.hidden = true;      //            戻るボタンは隠す

    const listHtml = members.length > 0
        ? members.map(memberCardHtml).join("")
        : `<p class="empty-message">まだ誰も登録されていません</p>`;

    app.innerHTML = `
        <h1 class="page-title">28卒 メンバー一覧</h1>
        <p class="page-lead">気になるメンバーをクリックすると、プロフィールと作品一覧が見られます。</p>
        <div class="member-list">${listHtml}</div>
    `;
}


///////////////////////////////////// 自己紹介ページ ////////////////////////////////////////////////////////////

// 趣味・特技のカードを作る
function hobbyCardHtml(member: Member, label: string, item: ProfileItem): string {
    return `
    <div class="hobby-card card">
        ${photoHtml(getImageUrl(member.id, item.photo), `${label}の写真`, "hobby-photo")}
        <div>
            <span class="label">${label}</span>
            <p class="hobby-text">${item.text}</p>
        </div>
    </div>`;
}

// 「チーム4人／担当：〇〇」または「個人制作」の文を作る
function teamText(work: Work): string {
    if (work.teamSize <= 1) return "個人制作";
    return work.role
        ? `チーム${work.teamSize}人／担当：${work.role}`
        : `チーム${work.teamSize}人`;
}

// プラットフォームのタグを作る（「自作エンジン」だけ is-engine を付けて目立たせる）
function platformTagsHtml(work: Work): string {
    return work.platforms.map((platform) =>
        `<span class="platform-tag${platform === "自作エンジン" ? " is-engine" : ""}">${platform}</span>`
    )
    .join("");
}

// 作品カード1枚を作る
function workCardHtml(member: Member, work: Work): string {
    const linkHtml = work.pageUrl
        ? `<a class="work-link" href="${work.pageUrl}" target="_blank" rel="noopener noreferrer">ポートフォリオサイトへ ↗</a>`
        : `<span class="work-link is-disabled">ポートフォリオサイト準備中</span>`;

    return `
    <article class="work-card card">
        ${photoHtml(getImageUrl(member.id, work.thumbnail), `${work.title}のサムネイル`, "work-thumbnail")}
        <div class="work-body">
            <h3 class="work-title">${work.title}</h3>
            <p class="work-genre">${work.genre}</p>
            <div class="platform-list">${platformTagsHtml(work)}</div>
            <p class="work-meta">${teamText(work)}</p>
            <p class="work-meta">制作期間：${work.period}</p>
            ${linkHtml}
        </div>
    </article>`;
}

// 自己紹介ページを表示する
function renderMemberPage(member: Member) {
    document.title = `${member.name} | ${SITE_TITLE}`;
    schoolName.hidden = true;      // ヘッダー右：学校名は隠す
    backButton.hidden = false;     //            戻るボタンを出す

    const githubHtml = member.githubUrl
        ? `<a class="btn btn-primary" href="${member.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub を見る ↗</a>`
        : "";

    app.innerHTML = `
        <section class="profile-card card">
            ${photoHtml(getImageUrl(member.id, member.photo), `${member.name}の顔写真`, "profile-photo")}
            <div>
                <p class="profile-romaji">${member.nameRomaji}</p>
                <h1 class="profile-name">${member.name}</h1>
                <span class="label">希望職種</span>
                <div class="tag-list">${jobTagsHtml(member)}</div>
                <p class="profile-comment">「${member.comment}」</p>
                <div class="profile-actions">
                    ${githubHtml}
                    <button class="btn btn-outline" id="to-works">作品を見る ↓</button>
                </div>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">趣味・特技</h2>
            <div class="hobby-list">
                ${hobbyCardHtml(member, "趣味", member.hobby)}
                ${hobbyCardHtml(member, "特技", member.talent)}
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">Q&amp;A</h2>
            <div class="qa-card card">
                <p class="qa-row"><span class="qa-mark">Q.</span><span class="qa-question">${member.qa.question}</span></p>
                <p class="qa-row"><span class="qa-mark">A.</span><span>${member.qa.answer}</span></p>
            </div>
        </section>

        <section class="section" id="works">
            <h2 class="section-title">ゲーム作品一覧</h2>
            <div class="work-list">
                ${member.works.map((work) => workCardHtml(member, work)).join("")}
            </div>
        </section>
    `;
}


///////////////////////////////////// ページの切り替え（ルーター） ////////////////////////////////////////////////////////////

// URL の # 以降から、メンバーの id を取り出す
// 例："#/members/test1" → "/" で切ると ["#", "members", "test1"] → "test1"
function getMemberIdFromHash(): string | undefined {
    const parts = location.hash.split("/");
    return parts[1] === "members" ? parts[2] : undefined;
}

// 今の URL に合わせて、どちらかのページを表示する
function render() {
    const id = getMemberIdFromHash();
    const member = members.find((m) => m.id === id);

    if (member) {
        renderMemberPage(member);   // 該当する人がいれば自己紹介ページ
    } else {
        renderListPage();           // それ以外（一覧の URL、存在しない id など）は一覧ページ
    }
}


///////////////////////////////////// クリック処理 ////////////////////////////////////////////////////////////

// 「作品を見る ↓」が押されたとき：作品一覧までなめらかにスクロール
app.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("#to-works")) {
        document.querySelector("#works")?.scrollIntoView({ behavior: "smooth" });
    }
});

// URL の # 以降が変わったとき（カードのクリック、戻るボタン、ブラウザの「戻る」）
window.addEventListener("hashchange", () => {
    render();
    window.scrollTo(0, 0);   // ページの一番上から見せる
});


///////////////////////////////////// 最初の表示 ////////////////////////////////////////////////////////////

render();