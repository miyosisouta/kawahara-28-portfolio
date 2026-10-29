# 03. GitHub での操作

フォルダを作ってから、サイトに投稿するまでの手順です。**このページを横に開きながら**進めてください。

- [手順1：自分のフォルダを作る](#手順1自分のフォルダを作る)
- [手順2：profile.json を書く](#手順2profilejson-を書く)
- [手順3：自分用のコピー（フォーク）を作る](#手順3自分用のコピーフォークを作る最初の1回だけ)
- [手順4：members フォルダにアップロードする](#手順4members-フォルダにアップロードする)
- [手順5：プルリクを出す](#手順5プルリクを出す)
- [投稿したあとに直したいとき](#投稿したあとに直したいとき)

---

## 手順1：自分のフォルダを作る

1. パソコンの**デスクトップ**に、**`名字-名前`** のフォルダを作る（例：`yamada-taro`）
   - 場所はどこでも大丈夫ですが、迷ったらデスクトップにしてください（アップロードのときに見つけやすいため）
2. その中に、[02_準備するもの.md](02_準備するもの.md) で用意した写真を入れる

<img src="../docs/images/step2-folder.png" alt="デスクトップに demo-taro フォルダを作った例" width="320">

**フォルダ名のルール**（ページの URL になるので大事です）

- **半角の英小文字とハイフン `-` だけ**。日本語・スペース・大文字は使わない
- **`_` で始めない**（`_` で始まるフォルダはサイトに表示されません）

---

## 手順2：profile.json を書く

1. VS Code で、手順1のフォルダの中に新しいファイル **`profile.json`** を作る
2. [記入用ひな形（members/_sample/profile.json）](https://github.com/miyosisouta/kawahara-28-portfolio/blob/main/members/_sample/profile.json) を開き、中身を**まるごとコピー**して貼り付ける
   - 開いた画面の右上にある **「Copy raw file」ボタン**（四角が2つ重なったアイコン）を押すと、中身を全部コピーできます

   <img src="../docs/images/step3-copy-sample.png" alt="左：GitHub の _sample/profile.json、右：VS Code の profile.json に貼り付けたところ" width="800">

   左が GitHub で開いたひな形、右が自分の `profile.json` に貼り付けたところです。

3. `""` や `[]` の中に、用意した内容を書き込む（各項目に何を書くかは → [注意点/JSONの書き方.md](注意点/JSONの書き方.md)）
   - 完成形は [完成見本（members/_example/profile.json）](https://github.com/miyosisouta/kawahara-28-portfolio/blob/main/members/_example/profile.json) を参考に
   - 作品が2つ以上 → `{ }` を `,` で区切って並べる（`_example` 参照）
4. **赤い波線が出ていないか確認**（出ていたら → [注意点/JSONの書き方.md](注意点/JSONの書き方.md)）

完成したフォルダの中身はこうなります。

```
yamada-taro/
  profile.json
  profile.jpg
  hobby.jpg
  talent.jpg
  work-a.jpg
```

---

## 手順3：自分用のコピー（フォーク）を作る（最初の1回だけ）

元のリポジトリには直接アップロードできない（「アップロードは無効になっています」と出る）ので、**GitHub 上に自分用のコピーを作り、そこにアップロードしてから、プルリクで届けます。**

1. [このリポジトリ](https://github.com/miyosisouta/kawahara-28-portfolio) を開く
2. 右上の **「Fork」** ボタンを押す
3. 次の画面で、そのまま緑の **「Create fork」** を押す
4. `あなたのユーザー名/kawahara-28-portfolio` というページが開けば成功です（左上の名前が自分になっています）

> **※ この「Fork」ボタンは GitHub のサイトの機能です。Fork（アプリ）やクローンは使いません。**

---

## 手順4：members フォルダにアップロードする

> ## ⚠ アップロードは必ず「members」フォルダの中で！
> **トップページのまま「Add file」を押すと、`members` の外に置かれてしまい、サイトに表示されません。**
> **多いと予想されるミスです。** アップロードの前に、次の2つを必ず確認してください。
>
> 1. **左上が `miyosisouta/…` ではなく、自分のユーザー名になっている**（自分のコピーを開いている）
> 2. **画面上の場所の表示が `kawahara-28-portfolio / members /` になっている**（members の中に入っている）

<img src="../docs/images/step4-upload.png" alt="members フォルダの中で Add file から Upload files を選び、フォルダをドラッグして、緑のボタンを押す流れ" width="900">

画像の赤枠の順に進めます（右上の「Add file」→ フォルダをドラッグ → 下の緑のボタン）。

1. 手順3で開いた**自分のコピー**で、ファイル一覧の中の **`members` フォルダをクリックして、中に入る**
2. 場所の表示が **`kawahara-28-portfolio / members /`** になっているのを確認する
3. **「Add file」→「Upload files」** を押す
4. 手順1で作った**フォルダごと**、画面にドラッグ＆ドロップする
   - **中のファイルだけをドラッグしない**（`members` の直下にバラバラに置かれてしまいます）
   - **「choose your files」から選ばない**（フォルダを選べないため、同じことになります）
5. 画面下の「Commit changes」の欄は **「Commit directly to the main branch」** のままで、緑の **「Commit changes」** を押す
   - 自分のコピーなので、直接入れて大丈夫です（元のサイトにはまだ反映されません）
6. `members` フォルダの中に、**自分のフォルダができているか**確認する

---

## 手順5：プルリクを出す

1. 自分のコピーのトップページに戻り、上の方にある **「Contribute」→「Open pull request」** を押す
2. タイトルを `作品追加：山田 太郎` のようにして、緑の **「Create pull request」** を押す
3. できたプルリクの **「Files changed」** タブを開き、ファイルの場所を確認する
   - ○ `members/yamada-taro/profile.json`
   - ✕ `yamada-taro/profile.json`（members の外）
   - ✕ `members/profile.json`（フォルダがない）
   - ✕ の場合は → [注意点/よくあるミスと直し方.md](注意点/よくあるミスと直し方.md)

あとは三好がチェックしてマージすると、**数分**でサイトに反映されます。
反映されないときは、**Ctrl + Shift + R**（Mac は Command + Shift + R）で再読み込みしてください。

---

## 投稿したあとに直したいとき

内容を直したい・写真を差し替えたい・作品を追加したいときは、次の順で行います。

1. 自分のコピー（フォーク）のトップページで **「Sync fork」→「Update branch」** を押す（他の人の投稿を取り込んで、最新にする）
2. 自分のコピーで直す
   - `profile.json`：ファイルを開いて、右上の**鉛筆マーク**で編集 →「Commit changes」
   - 写真：自分のフォルダの中に入ってから「Add file」→「Upload files」で、**同じファイル名**の写真をアップロード（上書きされます）
3. 手順5と同じように「Contribute」→「Open pull request」でプルリクを出す

| したいこと | 方法 |
|---|---|
| 一時的に非公開にしたい | `hidden` を `true` にしてプルリクを出す（わからなければ三好まで） |
| 完全に消したい | 三好まで |
