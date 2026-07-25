(function () {
  var HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
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

    var accent = container.getAttribute("data-accent");
    var widgetUrl = new URL("/widget", widgetOrigin);

    if (accent && HEX_COLOR_PATTERN.test(accent)) {
      widgetUrl.searchParams.set("accent", accent);
    }

    var iframe = document.createElement("iframe");
    iframe.src = widgetUrl.toString();
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
