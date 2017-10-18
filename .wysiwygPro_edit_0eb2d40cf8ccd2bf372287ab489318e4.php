<?php ob_start() ?>
<?php
if ($_GET['randomId'] != "5_uQ_I2XadIhs_HulicgQRueAr0lSmaHo9IkTJO5jWKVawKWlnznYz0a0299SzJcxq2T_k1R0FO5Mm2jbC1TwHG2PvrN0ZiMJoVDJnTRyF05HODmb7GBKUvrHHlYQCSpcocKTk5aYUxwizoCzfoehaO560PdW_vFw7C26LXnXoYkHPFOWaRibIsnoYdoRmTAGOOr4yhmuXTPG7OHPLDKWPayyj1mOtsZ8jOcg2lTe9ueXX2buH4KleccH916upqk") {
    echo "Access Denied";
    exit();
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Editing Philosophy.html</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<style type="text/css">body {background-color:threedface; border: 0px 0px; padding: 0px 0px; margin: 0px 0px}</style>
</head>
<body>
<div align="center">

<div id="saveform" style="display:none;">
<form METHOD="POST" name=mform action="https://roland.lunarservers.com:2083/frontend/lp/files/savehtmlfile.html">
    <input type="hidden" name="charset" value="iso-8859-1">
    <input type="hidden" name="baseurl" value="http://www.placeconsulting.net/">
    <input type="hidden" name="basedir" value="/home/place10/public_html/">
    <input type="hidden" name="udir" value="/home/place10/public_html">
    <input type="hidden" name="ufile" value="Philosophy.html">
    <input type="hidden" name="dir" value="%2fhome%2fplace10%2fpublic_html">
    <input type="hidden" name="file" value="Philosophy.html">
    <input type="hidden" name="doubledecode" value="1">
<textarea name=page rows=1 cols=1></textarea></form>
</div>
<div id="abortform" style="display:none;">
<form METHOD="POST" name="abortform" action="https://roland.lunarservers.com:2083/frontend/lp/files/aborthtmlfile.html">
    <input type="hidden" name="charset" value="iso-8859-1">
    <input type="hidden" name="baseurl" value="http://www.placeconsulting.net/">
    <input type="hidden" name="basedir" value="/home/place10/public_html/">
    <input type="hidden" name="dir" value="%2fhome%2fplace10%2fpublic_html">
        <input type="hidden" name="file" value="Philosophy.html">
    <input type="hidden" name="udir" value="/home/place10/public_html">
    <input type="hidden" name="ufile" value="Philosophy.html">

        </form>
</div>
<script language="javascript">
<!--//

function setHtmlFilters(editor) {
// Design view filter
editor.addHTMLFilter('design', function (editor, html) {
        return html.replace(/\<meta\s+http\-equiv\="Content\-Type"[^\>]+\>/gi, '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />');
});

// Source view filter
editor.addHTMLFilter('source', function (editor, html) {
        return html.replace(/\<meta\s+http\-equiv\="Content\-Type"[^\>]+\>/gi, '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />');
});
}

// this function updates the code in the textarea and then closes this window
function do_save() {
    document.mform.page.value = WPro.editors[0].getValue();
	document.mform.submit();
}
function do_abort() {
	document.abortform.submit();
}
//-->
</script>
<?php
// make sure these includes point correctly:
include_once ('/usr/local/cpanel/base/3rdparty/wysiwygPro/wysiwygPro.class.php');

// create a new instance of the wysiwygPro class:
$editor = new wysiwygPro();

$editor->registerButton('save', 'Save',
        'do_save();', '##buttonURL##save.gif', 22, 22,
        'savehandler'); 
$editor->addRegisteredButton('save', 'before:print' );
$editor->addJSButtonStateHandler ('savehandler', 'function (EDITOR,srcElement,cid,inTable,inA,range){ 
        return "wproReady"; 
        }'); 


$editor->registerButton('cancel', 'Cancel',
        'do_abort();', '##buttonURL##close.gif', 22, 22,
        'cancelhandler'); 
$editor->addRegisteredButton('cancel', 'before:print' );
$editor->addJSButtonStateHandler ('cancelhandler', 'function (EDITOR,srcElement,cid,inTable,inA,range){ 
        return "wproReady"; 
        }'); 
$editor->theme = 'blue'; 
$editor->addJSEditorEvent('load', 'function(editor){editor.fullWindow();setHtmlFilters(editor);}');

$editor->baseURL = "http://www.placeconsulting.net/";

$editor->loadValueFromFile('/home/place10/public_html/Philosophy.html');

$editor->registerSeparator('savecan');

// add a spacer:
$editor->addRegisteredButton('savecan', 'after:cancel');

//$editor->set_charset('iso-8859-1');
$editor->mediaDir = '/home/place10/public_html/';
$editor->mediaURL = 'http://www.placeconsulting.net/';
$editor->imageDir = '/home/place10/public_html/';
$editor->imageURL = 'http://www.placeconsulting.net/';
$editor->documentDir = '/home/place10/public_html/';
$editor->documentURL = 'http://www.placeconsulting.net/';
$editor->emoticonDir = '/home/place10/public_html/.smileys/';
$editor->emoticonURL = 'http://www.placeconsulting.net/.smileys/';
$editor->loadPlugin('serverPreview'); 
$editor->plugins['serverPreview']->URL = 'http://www.placeconsulting.net/.wysiwygPro_preview_0eb2d40cf8ccd2bf372287ab489318e4.php?randomId=5_uQ_I2XadIhs_HulicgQRueAr0lSmaHo9IkTJO5jWKVawKWlnznYz0a0299SzJcxq2T_k1R0FO5Mm2jbC1TwHG2PvrN0ZiMJoVDJnTRyF05HODmb7GBKUvrHHlYQCSpcocKTk5aYUxwizoCzfoehaO560PdW_vFw7C26LXnXoYkHPFOWaRibIsnoYdoRmTAGOOr4yhmuXTPG7OHPLDKWPayyj1mOtsZ8jOcg2lTe9ueXX2buH4KleccH916upqk';
// print the editor to the browser:
$editor->htmlCharset = 'iso-8859-1';
$editor->display('100%','450');

?>
</div>
<script>

</script>

</body>
</html>
<?php ob_end_flush() ?>
