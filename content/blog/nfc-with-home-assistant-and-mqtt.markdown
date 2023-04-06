---
title: NFC With Home Assistant and MQTT
date: 2023-04-06
tags:
  - mqtt
  - homeassistant
---

I have been experimenting with various habit tracking and home automation prototypes for quite a while.
While I like the idea of having smart buttons around my house, they are a bit expensive for what I want to do with them, and I have not yet had luck getting an IKEA Tradfri button working.
A few weeks ago, I recalled the [NFC tag](https://www.home-assistant.io/integrations/tag/) support in Home Assistant and wondered if I could use that.

Having already configured [MQTT in Home Assistant](https://www.home-assistant.io/integrations/mqtt/) I just needed to create an [automation](https://my.home-assistant.io/redirect/automations/).

My initial test required me to create a custom automation for each NFC tag I registered however this would get annoying the more tags I add.
Since I handle a lot of my automation in some existing MQTT scripts, I wanted to send _all_ NFC events to MQTT and then filter then out in my existing server code.
After a bit of searching, I was able to come up with this snippet that would send all `tag_scanned` events to a MQTT topic based on the tag name which would send the NFC payload.

```yaml
alias: NFC to MQTT
description: Send NFC Scan events to MQTT
trigger:
  - platform: event
    event_type: tag_scanned
action:
  - service: mqtt.publish
    data:
      topic: nfc/{{ trigger.event.data.tag_id }}
      payload: "{{ trigger.event.data }}"
mode: single
```
