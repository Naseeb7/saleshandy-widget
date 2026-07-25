(function () {
  var script = document.currentScript;
  var scriptUrl = script && script.src ? new URL(script.src, document.baseURI) : null;
  var widgetOrigin = scriptUrl ? scriptUrl.origin : window.location.origin;
  var containers = document.querySelectorAll(
    "[data-testimonial-widget], #testimonial-widget",
  );

  containers.forEach(function (container) {
    if (container.getAttribute("data-testimonial-widget-loaded") === "true") {
      return;
    }

    var iframe = document.createElement("iframe");
    iframe.src = widgetOrigin + "/widget";
    iframe.title = "Customer testimonials";
    iframe.loading = "lazy";
    iframe.width = "100%";
    iframe.height = "480";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "auto");
    iframe.style.display = "block";
    iframe.style.width = "100%";
    iframe.style.minHeight = "320px";
    iframe.style.border = "0";

    container.appendChild(iframe);
    container.setAttribute("data-testimonial-widget-loaded", "true");
  });
})();
