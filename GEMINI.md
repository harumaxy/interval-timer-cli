# Interval timer cli

Typescript + Node.js + Ink (React でCLIツールを作成するライブラリ)
を組みわせて、インターバルトレーニングタイマーを作成します

要件
- 運動秒数カウントダウン -> 休憩秒数カウントダウン -> ... を指定のセット数だけループする
- `npm run interval {運動秒数} {休憩秒数} {セット数}` の位置引数で起動
- または、 `npm run interval --move={秒} --rest={秒} --set={回数}` のオプション引数も可能
- 運動/休憩のタイムリミット 3,2,1 秒前 + タイムアウト時 にシステム音声で通知する
  - (macOSのシステム環境で実行されることを想定)
  - 3,2,1 秒前には `/System/Library/Sounds/Ping.aiff` を鳴らす
  - タイムアウト時には `/System/Library/Sounds/Sosumi.aiff` を鳴らす
- 実行中、ターミナルには大きな数字のアスキーアートで残り秒数が表示される
  - カウントダウン事に秒数を更新する