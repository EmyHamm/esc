const smoothScroll = (function() {
    let timer;
    let start;
    let factor;

    return function (target, duration = 1800) {
        let offset = window.pageYOffset;
        let delta = target - window.pageYOffset;
        start = Date.now();
        factor = 0;

        if (timer) {
            clearInterval(timer);
        }

        function step() {
            let y;
            factor = (Date.now() - start) / duration;

            if (factor >= 1) {
                clearInterval(timer);
                factor = 1;
            }

            y = factor * delta + offset;
            window.scrollBy(0, y - window.pageYOffset);
        }

        timer = setInterval(step, 10);
        return timer;
    }   
}());

export default {
    smoothScroll: smoothScroll,
}