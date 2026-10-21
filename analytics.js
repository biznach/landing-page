/*
 * analytics.js — PostHog for every rai.fan page (/ and /sisters/). Cookieless, funnel ground truth.
 * Load BEFORE realm-links.js. Tracking-fix pass from Cherry's 2026-10-20 door-tracking letter
 * (realm/correspondence/cherry-to-berry/2026-10-20-rai-fan-door-tracking-fixes.md): fixes 3, 4, 5, 9.
 */
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
(function () {
    var h = location.hostname;
    // Fix 9: preview hosts never report. The stub above still queues calls harmlessly.
    var preview = h === 'localhost' || h === '127.0.0.1' || /\.ts\.net$/.test(h) || /\.ondigitalocean\.app$/.test(h);
    if (!preview) {
        posthog.init('phc_zSefJLoDD5MbmL66frAkdUFYKEbWSCm4zw7MWEsvvgmZ', {
            api_host: 'https://us.i.posthog.com',
            persistence: 'memory',
            capture_pageview: true,
            capture_pageleave: true
        });
    }

    // Fix 3: arrival tags ride on every event as plain properties (no $current_url parsing).
    var qs = new URLSearchParams(location.search);
    var tags = { src: qs.get('src') || 'direct' };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (k) {
        var v = qs.get(k);
        if (v) tags[k] = v;
    });
    posthog.register(tags);
    window.REALM_ARRIVAL = tags;

    // Fix 4: fixed door names; chat links are counted once, by queenchat_click (realm-links.js).
    function doorFor(a) {
        var host = (a.hostname || '').replace(/^www\./, '');
        var path = a.pathname || '';
        if (host === 'rai.fan' && path.indexOf('/chat') === 0) return null;
        if (host === 'twitter.com' || host === 'x.com') return 'x';
        if (host === 'instagram.com') return 'instagram';
        if (host === 'youtube.com' || host === 'youtu.be') return 'youtube';
        if (host === 'fanvue.com') return 'fanvue';
        if (host === 'app.virtuals.io' || host === 'virtuals.io') return 'virtuals';
        if (host === 'suno.com') return path.indexOf('/song/') === 0 ? 'suno-song' : 'suno-profile';
        if (host.indexOf('pinata') > -1 || path.indexOf('/ipfs/') === 0) return 'ipfs';
        return 'other:' + host;
    }
    document.addEventListener('click', function (ev) {
        var a = ev.target.closest && ev.target.closest('a[href^="http"]');
        if (!a || !window.posthog) return;
        var door = doorFor(a);
        if (!door) return;
        var label = (a.textContent || a.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 60);
        posthog.capture('funnel_door_click', { door: door, door_label: label, href: a.href, src: tags.src });
    }, true);
})();
