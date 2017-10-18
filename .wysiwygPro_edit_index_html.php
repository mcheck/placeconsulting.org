<?php header("Content-type","text/html; charset=iso-8859-1"); ?>
<?php ob_start() ?>
<?php
if ($_GET['randomId'] != "IorkmPFQtF9cX7oB0f8V1fFcxx35kb9Tm6SthwCjcBOZg7tNBKW1wYYeGRy2HOH2pg7ansQ9AnIQnu2CeBwpEuldQIfL4ThhyWW9QV67Uhfz6zNbVP2weIe1OC_VTy1SBq_TXf57lVyDzVJXc6vTJ38ocrr0_hXOdMEEwHEpOJPS79yVYa7sbAVOgpgVMs34i0l2KbFFiTdgP0KpSq2ddYVDPn6KKTfBu_PQrAVptFLs1ppKj4bW6cbTOGDvjO1_") {
    echo "Access Denied";
    exit();
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Editing index.html</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<style type="text/css">body {background-color:threedface; border: 0px 0px; padding: 0px 0px; margin: 0px 0px}</style>
</head>
<body>
<div align="center">
<script language="javascript">
<!--//
// this function updates the code in the textarea and then closes this window
function do_save() {
	var code =  htmlCode.getCode();
	document.open();
	document.write('<html><form METHOD="POST" name=mform action="https://login.roland.lunarservers.com:2083/frontend/lp/files/savehtmlfile.html"><input type="hidden" name="udir" value="/home/place10/public_html"><input type="hidden" name="ufile" value="index.html"><input type="hidden" name="dir" value="%2fhome%2fplace10%2fpublic_html"><input type="hidden" name="file" value="index.html"><input type="hidden" name="doubledecode" value="1">Saving&nbsp;....<br /><br ><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><textarea name=page rows=1 cols=1></textarea></form></html>');
	document.close();
	document.mform.page.value = code;
	document.mform.submit();
}
function do_abort() {
	var code =  htmlCode.getCode();
	document.open();
	document.write('<html><form METHOD="POST" name="mform" action="https://login.roland.lunarservers.com:2083/frontend/lp/files/aborthtmlfile.html"><input type="hidden" name="dir" value="/home/place10/public_html"><input type="hidden" name="file" value="index.html">Aborting Edit&nbsp;....</form></html>');
	document.close();
	document.mform.submit();
}
//-->
</script>
<?php
// make sure these includes point correctly:
include_once ('/usr/local/cpanel/base/3rdparty/WysiwygPro/editor_files/config.php');
include_once ('/usr/local/cpanel/base/3rdparty/WysiwygPro/editor_files/editor_class.php');

// create a new instance of the wysiwygPro class:
$editor = new wysiwygPro();

// add a custom save button:
$editor->addbutton('Save', 'before:print', 'do_save();', WP_WEB_DIRECTORY.'images/save.gif', 22, 22, 'undo');

// add a custom cancel button:
$editor->addbutton('Cancel', 'before:print', 'do_abort();', WP_WEB_DIRECTORY.'images/cancel.gif', 22, 22, 'undo');

$body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><!-- InstanceBegin template="/Templates/index.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
<meta name="description" content="Fostering neighborhood business district revitalization" />
<meta name="keywords" content="PLACE Consulting, place, consultants, commercial revitalization, retail, Chicago, chicago" />
<meta name="author" content="PLACE Consulting" />
<link rel="stylesheet" type="text/css" href="andreas02.css" media="screen,projection" title="PLACE Consulting(screen)" />
<link rel="stylesheet" type="text/css" href="print.css" media="print" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>PLACE Consulting</title>
<!-- InstanceEndEditable --> <!-- InstanceBeginEditable name="head" --><!-- InstanceEndEditable -->
</head>

<body>
<div id="toptabs"></div>
<div id="container">
<div id="logo">
    <h1><a href="place/index.html">PLACE 
      Consulting</a></h1>
</div>

<div id="navitabs">
<h2 class="hide">Site menu:</h2>
    <!-- InstanceBeginEditable name="NavBar" --><a class="activenavitab" href="index.html">Home</a><span class="hide"> 
    </span><span class="hide"> | </span> <a class="navitab" href="philosophy.html">Philosophy</a><span class="hide"> 
    | </span> <a class="navitab" href="consultants.html">Consultants</a><span class="hide"> 
    | </span> <a class="navitab" href="projects.html">Projects</a><span class="hide"> 
    | </span> <a class="navitab" href="contact.html">Contact</a><span class="hide"> 
    | </span> <a class="navitab" href="#">Just in case</a><span class="hide"> 
    |</span><!-- InstanceEndEditable --></div>
	
  <div id="desc"> <!-- InstanceBeginEditable name="EditRegion3" --> 
    <p>&nbsp;</p>
    <p><font size="4"><strong><font color="#FFFFFF">Fostering Neighborhood </font></strong></font></p>
    <p><font color="#FFFFFF" size="4"><strong>Business District Revitalization</strong></font> 
    </p>
    <p><font size="2">People, Livability, Accessibility, Community and Economic 
      Development</font></p>
    <h2>&nbsp;</h2>
    <p class="right">&nbsp;</p>
    <!-- InstanceEndEditable --></div>

  <!-- InstanceBeginEditable name="MainText" -->
  <div id="main"> 
    <h2><strong><font color="#008000">P</font></strong>eople,<strong> <font color="#0080C0">L</font></strong>ivability, 
      <strong><font color="#FF80C0">A</font></strong>ccessibility, <strong><font color="#9B8924">C</font></strong>ommunity 
      and <strong><font color="#FF8000">E</font></strong>conomic Development</h2>
    <p>&nbsp;</p>
    <p><font color="#FF0000" size="6">Under Construction</font></p>
    <p class="block"><strong>Please note:</strong> More to come soon!</p>
    </div>
  <!-- InstanceEndEditable -->
  <div id="sidebar"> <!-- InstanceBeginEditable name="RightColumn" -->
    <h3>More information:</h3>
    <p>View some of our work samples below: (COMING SOON)</p>
    <p> <a class="sidelink" href="http://www.placeconsulting.net">Coming Soon</a><span class="hide"> 
      |</span></p>
    <!-- InstanceEndEditable --></div>
    
<div id="footer">
    <p>Copyright &copy; 2007 PLACE Consulting &middot; 1557 W Howard Street &middot; 
      Design by <a href="http://andreasviklund.com/">Andreas Viklund</a></p>
</div>

</div>
</body>
<!-- InstanceEnd --></html>';

$editor->set_code($body);

// add a spacer:
$editor->addspacer('', 'after:cancel');

$editor->set_charset('iso-8859-1');

// print the editor to the browser:
$editor->print_editor('100%','450');

?>
</div>
</body>
</html>
<?php ob_end_flush() ?>
