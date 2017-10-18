<?php
if ($_GET['randomId'] != "bf9fDPmXp_X4YDTOG38DhZQRhItF7dtBgJ2rEiWgQeo1wA6ADBFbCnH1VK6lHD81EFVWFMbg1WRLdn5cFLnU9Brv3020b_C8Sup1I3kYx4GjiYMoDBps1eSlvGEey_j4Yaf5aWxlqU9vPRs8jPTIPtJdE0C7w2A4mb7vgoRMUgesGQgUSkQmi7OL8r3S5yHeRL9PLLoKbxe33iuwapoElRyRHEt9kde747eauQDlpDyLu79SyDp8zkXfwTiKcXeV") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
