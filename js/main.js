'use strict';

{
    $(function () {
        const timer = document.getElementById('timer');
        const start = document.getElementById('start');
        const stop = document.getElementById('stop');
        const reset = document.getElementById('reset');

        let startTime;
        let timeoutId;
        let elapsedTime = 0;

        function counntUp() {
            const d = new Date(Date.now() - startTime + elapsedTime);
            const m = String(d.getMinutes()).padStart(2, '0');
            const s = String(d.getSeconds()).padStart(2, '0');
            const ms = String(d.getMilliseconds()).padStart(3, '0');
            timer.textContent = `${m}:${s}.${ms}`;

            timeoutId = setTimeout(() => {
                counntUp();
            }, 10);
        }

        function setButtonStateInitial() {
            start.classList.remove('inactive');
            stop.classList.add('inactive');
            reset.classList.add('inactive');
        }

        function setButtonStateRunning() {
            start.classList.add('inactive');
            stop.classList.remove('inactive');
            reset.classList.add('inactive');
        }

        function setButtonStateStopped() {
            start.classList.remove('inactive');
            stop.classList.add('inactive');
            reset.classList.remove('inactive');
        }

        setButtonStateInitial();

        $(start).on('click', function () {
            if (start.classList.contains('inactive') === true) {
                return;
            }
            setButtonStateRunning();
            startTime = Date.now();
            counntUp();
        });

        $(stop).on('click', function () {
            if (stop.classList.contains('inactive') === true) {
                return;
            }
            setButtonStateStopped();
            clearTimeout(timeoutId);
            elapsedTime += Date.now() - startTime;
        });

        $(reset).on('click', function () {
            if (reset.classList.contains('inactive') === true) {
                return;
            }
            setButtonStateInitial();
            timer.textContent = '00:00.000';
            elapsedTime = 0;
        });
    });
}