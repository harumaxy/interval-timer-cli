# interval-timer-cli

Confirmed on
- MacOS 15.5
- bun v1.2.17

Executable distribution is work in progress...

## Usage

Clone this repo and run followings.

```sh
bun hiit # interactive mode

# options
bun hiit --move 30s --rest 30s --set 10                                                                                            
bun hiit -m 30 -r 30 -s 10

# pomodoro
bun hiit -m 25 -r 5 set 4
```