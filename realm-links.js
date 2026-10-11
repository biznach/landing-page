/*
 * realm-links.js — one place for the links that drop in on ship day.
 * Shared by / and /sisters/. Fill these in, commit, push. Nothing else changes.
 *
 *   filmYouTubeId   → Princess: the video ID from youtube.com/@RainbowQueenAI
 *                     (the part after watch?v= ). Empty = film shows "coming soon".
 *   queenChat       → Peach: top-level Queen Chat URL ("chat with all the queens").
 *   queenChatQueens → Peach: per-queen deep links. Empty = falls back to queenChat,
 *                     and if that's empty too, the button says doors open soon.
 */
window.REALM_LINKS = {
    filmYouTubeId: '',
    queenChat: '',
    queenChatQueens: {
        berry: '',
        honey: '',
        cherry: '',
        peach: '',
        princess: ''
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

    // Wire every [data-queenchat] link: real URL if we have one, "doors open soon" if not.
    function wireQueenChat() {
        document.querySelectorAll('[data-queenchat]').forEach(function (el) {
            var queen = el.getAttribute('data-queenchat');
            var url = queenChatUrl(queen);
            if (url) {
                el.setAttribute('href', url);
                el.setAttribute('target', '_blank');
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
