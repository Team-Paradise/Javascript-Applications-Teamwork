import 'lib/kendo.all.min.js';

export default function calendarController() {
    $(function(){
        $("#scheduler").kendoScheduler({
            height: 600,
        });
    });
}