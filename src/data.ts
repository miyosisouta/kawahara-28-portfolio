// 希望職業の一覧
export type Job = 
  | "グラフィックス" 
  | "テクニカルアーティスト" 
  | "ゲームプレイ" 
  | "AI" 
  | "物理・当たり判定" 
  | "エンジン開発" 
  | "ツール・エディタ" 
  | "UI" 
  | "ネットワーク・サーバー" 
  | "企画・レベルデザイン";


////////// メンバーデータの定義 ///////////////////////
export interface ProfileItem {
  text: string;
  photo: string;
}

export interface QAndA {
  question: string;
  answer: string;
}

export interface Work { // 「ゲーム作品なら、必ずこの項目があるべき」という形のルールを決める
  title: string;            // タイトルは文字列
  genre: string;            // ジャンルは文字列
  thumbnail: string;        // 作品のサムネイル
  platforms: string[];      // 制作環境
  teamSize: number;         // 制作人数
  role: string;             // 役割
  period: string;           // 制作期間
  pageUrl: string;          // 作品ページのURL
}

// メンバーデータ（JSON に書いてある形）：後輩が profile.json に書くもの
export interface MemberJson {
  name: string;           // 名前(漢字)
  nameKana: string;       // 名前(ひらがな)
  nameRomaji: string;     // 名前(ローマ字)
  photo: string;          // プロフィール画像
  jobs: Job[];            // 希望職業
  comment: string;        // 一言コメント
  githubUrl: string;      // githubのURL
  hobby: ProfileItem;     // 趣味
  talent: ProfileItem;    // 特技
  qa: QAndA;              // 自由 : Q＆A
  works: Work[];          // 作品
  hidden: boolean;        // ウェブサイトに表示するか否か
}


// メンバーデータ（サイトで使う形）：JSON の中身 ＋ プログラムが付け足す id
export interface Member extends MemberJson {
  id: string; // ID
}

// members フォルダの中の各フォルダから profile.json を全部読み込む（_ で始まるお手本フォルダは除く）
const memberFiles = import.meta.glob<MemberJson>(         // Viteの機能 : フォルダの中のファイルをまとめて読み込む
  ["/members/*/profile.json", "!/members/_*/*.json"],     // 各フォルダの profile.json 全部。_ で始まるフォルダの中は除く
  { eager: true, import: "default" }                      // eager: 今すぐ読み込むか , import: "default" → ファイルの中身を頂戴
);


// 全メンバー : hiddenがfalseのものは写さないのでフィルターではじく
export const members: Member[] = Object.entries(memberFiles)    // パスと中身のペアを取り出す
.map(([path,member]) => ({                                      // ペアを一つずつ作って、左を path,右を member という名前で受け取る
  ...member,                                                    // 中身を全部(名前・写真・作品...etc)コピー
  id: path.split("/")[2],                                       // パスを/で切って、2番目のフォルダ名をIDとする
}))                                                               
.filter((member) => member.hidden !== true)                     // hiddenの人を除く
.sort((a, b) => (a.nameKana || a.name).localeCompare(b.nameKana || b.name, "ja")); // ふりがなのあいうえお順に並べる


// members フォルダの画像を全部読み込む（キー：画像のパス、値：サイトで使える画像のURL）
const imageFiles = import.meta.glob<string>(
  "/members/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}",
  { eager: true, query: "?url", import: "default" }
);

// メンバーの id と画像のファイル名から、画像のURLを取り出す（見つからなければ undefined）
export function getImageUrl(memberId: string, fileName: string): string | undefined {
  return imageFiles[`/members/${memberId}/${fileName}`];
}