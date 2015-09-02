export default function groupNavController() {
    var $groupContainer = $('#group-container'),
        $switchGroup = $('#switch-group-bar');

    $groupContainer.html('');

    $switchGroup.on('click', 'li', function(e){
        var $target = $(e.target);

        localStorage.setItem('current-group', $target.text());

    });

    console.log('group navigation loaded');
}