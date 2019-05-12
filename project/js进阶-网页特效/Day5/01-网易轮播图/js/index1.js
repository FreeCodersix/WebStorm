window.onload = function () {
	var slider = $("slider");
	var slider_main = $("slider_main");
	var slider_main_img = slider_main.children;
	var slider_ctl = slider.children[1];

	var iNow = 0;

	for (var i = 0; i < slider_main_img.length; i++) {
		var span = document.createElement("span");
		span.className = "slider-ctl-icon";
		slider_ctl.insertBefore(span,slider_ctl.children[1]);
	}
	slider_ctl.children[1].className = "slider-ctl-icon current";
}