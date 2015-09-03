import 'lib/jquery/dist/jquery.js';
import 'lib/kendo.all.min.js';

export default function calendarController() {
    $(function(){
        $(document).ready(function () {
            var meetingsFromDb = [];
            
            $.ajax({
                url: '/groups/meetings',
                contentType: 'application/json',
                data: {name: JSON.parse(localStorage.getItem('current-group'))},
                success: function (data) {
                    data.meetings.map(function(item, index) {
                        item.date = kendo.parseDate(item.date, "dd/MM/yyyy HH:mm");
                        var endTime = new Date(item.date.getTime());
                        var endMeetingTime = new Date(endTime.setTime(endTime.getTime() + 120*60*1000));
                        
                        meetingsFromDb[index] = {
                            start: item.date,
                            end: endMeetingTime,
                            title: item.about
                        };
                    });
                    
                    $("#scheduler").kendoScheduler({
                        allDaySlot: false,
                        height: 600,
                        editable: false,
                        isAllDay: true,
                        format: "dd/MM/yyyy HH:mm",
                        dataSource: meetingsFromDb
                    });
                }
            });
        });
    });
}