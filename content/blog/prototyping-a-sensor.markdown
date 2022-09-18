---
title: Prototyping a Room Sensor
date: "2022-09-17"
tags:
  - mqtt
  - iot
---

Quite a while back I picked up a [M5StickC Plus] but had not done anything with it. I have a [Smart Citizen Kit] that I've been using to track data in my office and at home, but had been wanting some kind of smaller sensor that I could place in multiple rooms of my apartment. A few days ago I decided to pick up a [ENV III Hat] and [TVOC/eCO2] to pair with it for a quick prototype.

![m5stack-sensor-prototype](/images/blog/m5stack-sensor-prototype.jpg)

For my first draft, I decided to use their flow environment, but initially using their burner application was not working. Seems like there were some mismatched assumptions about the underlying OS, because I was getting some Python errors when trying to run the flash tool. Eventually I copied some of the flags from the console and then ran the esptool directly to get the M5Stick connected to their flow environment.

```shell
python3 esptool.py --chip esp32 --port /dev/tty.usbserial-4DD212ACAB --baud 750000 \
    --before default_reset write_flash -z --flash_mode dio --flash_freq 80m \
    --flash_size detect 0x3ff000 \
    /Applications/M5Burner.app/Contents/Resources/packages/fw/other/wifi.bin 0x1000 \
    /Applications/M5Burner.app/Contents/Resources/packages/fw/stickc/UIFlow_StickC_Plus-v1.9.8-plus.bin
```

Once I had the device flashed, it was much easier to test their [example] code. After verifying that the sample code was working, it was then very easy to put together my own prototype.

At this point I could delete most of their code, and put together my own. I added a mqtt block to connect to my server, and then experimented with the various read values until I had my own json data being posted back.

I think my next attempt will be to take the same thing and use C just to make it smaller. A longer term goal would be to do something similar but that could more easily run on a battery. Also curious about their [atom] controller.

[m5stickc plus]: https://docs.m5stack.com/en/core/m5stickc_plus
[env iii hat]: https://docs.m5stack.com/en/hat/hat_envIII
[tvoc/eco2]: https://docs.m5stack.com/en/unit/tvoc
[smart citizen kit]: https://docs.smartcitizen.me/Smart%20Citizen%20Kit/
[example]: https://flow.m5stack.com/?examples=stickc_plus_env_demo
[atom]: https://docs.m5stack.com/en/core/atom_lite
