<?php
if ($_GET['randomId'] != "TU_bKsQuBxVPqiT7v2xGfX_S152SBM5DD2HtyfMy9itvpkU96dPPyH8O2UbHnxJGM797AT_L2UwRKa7IeY5ByI1iUnPte20zsRYrz5VNpRJAPwYg6DVggLu388Cmcm4ZYMYDGm1LyfWI30ubKFJrPFTdmHBZd7ELUCYMnyG5HxnArYGymi5fJL4iog4_EI3cUdsGFD83u4w7AkwEg8MZmdKupo2B9W0pwXA_YiPxGzeP6d1Gf2sNvbcpIkuEtO_9") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
