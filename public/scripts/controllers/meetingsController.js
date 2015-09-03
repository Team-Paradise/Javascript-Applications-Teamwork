import 'lib/kendo.all.min.js';
import toastr from 'lib/toastr/toastr.js';

export default function meetingsController() {
    $(document).ready(function () {
        $("#datetimepicker").kendoDateTimePicker({
            timeFormat: "HH:mm",
            format: "dd/MM/yyyy HH:mm"
        });
        
        // create DateTimePicker from input HTML element
        var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
        var meetingInformation = {};
        
        datetimepicker.bind("change", function() {
            meetingInformation.date = this.value();
            meetingInformation.date = kendo.toString(meetingInformation.date, "dd/MM/yyyy HH:mm");
        });
        
        $('#btn-meeting-submit').on('click', function() {
            var about = $('#meeting-information').val();
            meetingInformation.about = about;
            meetingInformation.group = JSON.parse(localStorage.getItem('current-group'));

            console.log(meetingInformation);
            $.ajax({
                url: '/groups/meetings',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(meetingInformation),
                success: function (data) {
                    toastr.options = {"positionClass": "toast-top-center"};
                    toastr.success('You successfully arranged meeting on ' + data.meeting.date);
                },
                error: function (data) {
                    console.log('--------------ERROR--------MEETING');
                    console.log(data);
                    toastr.options = {"positionClass": "toast-top-center"};
                    toastr.error('Invalid meetings data!');
                }
            });
        });
    });
};