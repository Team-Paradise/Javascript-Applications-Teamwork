import 'lib/jquery/dist/jquery.js';
import 'lib/kendo.all.min.js';

export default function calendarController() {
    $(function () {
        $(document).ready(function () {
            var startTime = '3/9/2015 08:00';
            var title = "Meeting";
            var meeting = {
                date: kendo.parseDate(startTime, "dd/MM/yyyy HH:mm"),
                about: title
            };

            var endTime = new Date(meeting.date.getTime());
            var endMeetingTime = new Date(endTime.setTime(endTime.getTime() + 120 * 60 * 1000));

            //get data from the request and use it in the calendar
            var meetingsFromDb = {};

            /* $.get('/groups/meetings', function(data) {
             console.log(data);
             });*/

            $.ajax({
                url: '/groups/meetings',
                contentType: 'application/json',
                data: {name: JSON.parse(localStorage.getItem('current-group'))},
                headers: {
                    'x-authkey': JSON.parse(localStorage.getItem('access-token'))
                },
                success: function (data) {
                    console.log(data.meetings[0]);
                }
            });

            console.log('----');
            console.log(meetingsFromDb);

            $("#scheduler").kendoScheduler({
                allDaySlot: false,
                height: 600,
                editable: false,
                isAllDay: true,
                format: "dd/MM/yyyy HH:mm",
                dataSource: [{
                    start: meeting.date,
                    end: endMeetingTime,
                    title: meeting.about
                }]
            });
        });
    });
}