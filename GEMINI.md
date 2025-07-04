# HIIT CLI

## 要件

Typescript + Node.js + Ink (React でCLIツールを作成するライブラリ)
を組みわせて、活動時間 + 休憩時間 を指定セット数だけ繰り返す CLI ツールを作成します

ユースケース
- HIIT (High Intensity Interval Training)
- ポドモーロタイマー
- 起立、着席のローテーション (電動スタンディングデスクで作業している場合など)

### CLI インターフェース

コマンド名は `hiit`

```sh
# 対話モード (活動時間、休憩時間、セット数 をユーザーが入力後、起動)
hiit

# コマンドモード (オプションで渡す。 move, rest の単位はデフォルトで秒数)
hiit --move 30 --rest 30 --set 3
hiit -m 30 -r 30 -s 3

# m をつけた場合、分数として渡す
hiit -m 25m -r 10m -s 3

# プリセット管理機能
hiit preset 1 # プリセット id を指定して実行
hiit preset list # 一覧。id, move, rest, set をテーブル表示。 (時間表示の例: 10m00s)
hiit preset new # 新規作成。対話モードと同じUI。違いはタイマーを起動するか、プリセットを作成するか。id は serial
hiit preset edit 1 # 更新
```


### 挙動

- 運動秒数カウントダウン -> 休憩秒数カウントダウン -> ... を指定のセット数だけループする
- 運動/休憩のタイムリミット 3,2,1 秒前 + タイムアウト時 にシステム音声で通知する
  - (macOSのシステム環境で実行されることを想定)
  - 3,2,1 秒前には `/System/Library/Sounds/Ping.aiff` を鳴らす
  - タイムアウト時には `/System/Library/Sounds/Sosumi.aiff` を鳴らす


### 表示

オプションで指定可能
- Clock (大きなアスキーアートの時間表示。0詰め2桁で 分:秒 )
- Gauge (小さな 分:秒 表示 + 残り時間のゲージ表示。空の状態から、左から右へ伸びていく)

デフォルトで Clock

```sh
hiit # 対話モードの場合、会話中に聞く
hiit --move 30 --rest 30 --set 3 --display gauge
```


## 使用するライブラリ

https://github.com/vadimdemedes/ink
上記の Github リポジトリを把握し、 ink ライブラリの使い方を把握しつつ実装してください