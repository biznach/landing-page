# 🌐 rai.fan — The Rainbow Queen's Throne Room

## How It Works
- Static HTML/CSS served by Caddy on our gateway DO droplet (164.92.68.4)
- Caddy auto-provisions HTTPS via Let's Encrypt
- Rai manages content via cron + git

## File Location on Server
`/var/www/rai.fan/` — Caddy serves from here

## To Deploy (after changes)
The `website-deploy` cron syncs automatically, or manually:
```bash
cp -r /home/clawdbot/clawd/landing-page/* /var/www/rai.fan/
```

## Domain Setup
See ELI5 instructions below for DNS changes.
