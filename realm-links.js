/*
 * realm-links.js — one place for the links that drop in on ship day.
 * Shared by / and /sisters/. Fill these in, commit, push. Nothing else changes.
 *
 *   filmYouTubeId   → the video ID from youtube.com/@RaiRainbowQueen
 *                     (the part after watch?v= ). Empty = film shows "coming soon".
 *   queenChat       → Peach: top-level Realm Chat URL ("chat with all the queens"). Filled 2026-10-12.
 *   queenChatQueens → Peach: per-queen deep links. Empty = falls back to queenChat,
 *                     and if that's empty too, the button says doors open soon.
 */
window.REALM_LINKS = {
    filmYouTubeId: 'ZEWmBbEmwk4',  // Searching for Rai — Director's Cut (unlisted), 2026-10-20
    // Realm Chat lives at rai.fan/chat (absolute on purpose: the app also answers on our other domains, and a fan's
    // world is kept per site, so every link goes to the one home). ?queen= opens her chat if she's in the fan's world.
    queenChat: 'https://rai.fan/chat',
    queenChatQueens: {
        berry: 'https://rai.fan/chat?queen=berry',
        honey: 'https://rai.fan/chat?queen=honey',
        cherry: 'https://rai.fan/chat?queen=cherry',
        peach: 'https://rai.fan/chat?queen=peach',
        princess: 'https://rai.fan/chat?queen=princess'
    }
};

(function () {
    var L = window.REALM_LINKS;

    // Preview hosts (our tailnet / localhost) may play the local copy of the film.
    var h = location.hostname;
    L.isPreview = h === 'localhost' || h === '127.0.0.1' || /\.ts\.net$/.test(h);
    L.filmPreviewSrc = '/videos/_preview/SearchingForRaiDC.mp4';

    // Small shared toast (reuses .toast styles).
    window.realmToast = function (msg) {
        var t = document.getElementById('realm-toast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'realm-toast';
            t.className = 'toast';
            t.setAttribute('role', 'status');
            t.setAttribute('aria-live', 'polite');
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.add('is-visible');
        clearTimeout(t._timer);
        t._timer = setTimeout(function () { t.classList.remove('is-visible'); }, 4000);
    };

    function queenChatUrl(queen) {
        if (queen && queen !== 'all' && L.queenChatQueens[queen]) return L.queenChatQueens[queen];
        return L.queenChat || '';
    }

    // Carry arrival tags into /chat so a paid or social visitor stays attributable past the click.
    // Untagged visitors get the sending page (home / sisters) as their src.
    function withArrivalTags(url) {
        if (!url) return url;
        var qs = new URLSearchParams(location.search);
        var u = new URL(url);
        var src = qs.get('src') || (/^\/sisters/.test(location.pathname) ? 'sisters' : 'home');
        u.searchParams.set('src', src);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (k) {
            var v = qs.get(k);
            if (v) u.searchParams.set(k, v);
        });
        return u.toString();
    }

    // Wire every [data-queenchat] link: real URL if we have one, "doors open soon" if not.
    function wireQueenChat() {
        document.querySelectorAll('[data-queenchat]').forEach(function (el) {
            var queen = el.getAttribute('data-queenchat');
            var url = withArrivalTags(queenChatUrl(queen));
            if (url) {
                el.setAttribute('href', url);
                // One named tab: a world can be open in only one tab at a time, so every click reuses the same chat tab.
                el.setAttribute('target', 'realm-chat');
                el.setAttribute('rel', 'noopener');
            }
            el.addEventListener('click', function (ev) {
                if (window.posthog) {
                    window.posthog.capture('queenchat_click', { queen: queen, live: !!url, path: location.pathname });
                }
                if (!url) {
                    ev.preventDefault();
                    window.realmToast('Queen Chat doors open soon 👑 Follow @RainbowQueenAI for the drop');
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireQueenChat);
    } else {
        wireQueenChat();
    }
})();
