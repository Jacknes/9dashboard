(function(document) {
    const metas = document.getElementsByTagName('meta');

    let sitecore_id = undefined;

    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('property') == 'ninemsn:id') {
            sitecore_id = metas[i].getAttribute('content');
        }
    }

    let host = 'press.nine.com.au';

    if (window.location.host.indexOf('uat') !== -1) {
        host = 'press.uat.nine.com.au';
    }

    if (window.location.host.indexOf('stag') !== -1) {
        host = 'press.staging.nine.com.au';
    }

    if (sitecore_id != undefined) {
        window.location.href = `https://${host}/item/` + sitecore_id;
    }
})(document);
