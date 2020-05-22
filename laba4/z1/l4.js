function f1() {
var w = parseInt(document.getElementById('w').value);
var h = parseInt(document.getElementById('h').value);
var tl = parseInt(document.getElementById('tl').value);
var co = document.getElementById('co').value;
var al = document.getElementById('al').value;
var im = document.getElementById('im');
im.alt = 'text';
im.setAttribute('alt', 'new alt');
if (isNaN(w)){
	alert("Введите число");
}
else 
{
	im.height = w;
}

if (isNaN(h)){
	alert("Введите число");
}
else 
{
	im.width = h;
}

if (isNaN(tl)){
	alert("Введите число");
}
else 
{
	im.border = tl;
}
im.style.borderColor = co;
im.alt = al;

}