// On each page, find the active nav bar link and set it to active
$('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active');