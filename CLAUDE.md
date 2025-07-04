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
```


### 挙動

- 運動秒数カウントダウン -> 休憩秒数カウントダウン -> ... を指定のセット数だけループする
- 運動/休憩のタイムリミット 3,2,1 秒前 + タイムアウト時 にシステム音声で通知する
  - (macOSのシステム環境で実行されることを想定)
  - 3,2,1 秒前には `/System/Library/Sounds/Ping.aiff` を鳴らす
  - タイムアウト時には `/System/Library/Sounds/Glass.aiff` を鳴らす


### 表示
現在の状態を表示 (Move / Rest)
大きなアスキーアートで、 mm:ss (minutes, seconds) を表示
残り時間が更新されるたびに、表示も更新する


## 使用するライブラリ

https://github.com/vadimdemedes/ink
上記の Github リポジトリを把握し、 ink ライブラリの使い方を把握しつつ実装してください