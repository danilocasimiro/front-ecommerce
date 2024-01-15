export const loadScripts = () => {
  const scriptUrls = [
    '../vendor/js/helpers.js',
    '/../js/config.js',
    '/vendor/libs/jquery/jquery.js',
    '/vendor/libs/popper/popper.js',
    '/vendor/js/bootstrap.js',
    '/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
    '/vendor/js/menu.js',
    '/vendor/libs/apex-charts/apexcharts.js',
    '/../js/main.js',
    '/../js/dashboards-analytics.js',
  ];

  scriptUrls.forEach((url) => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
  });

  return () => {
    scriptUrls.forEach((url) => {
      const scriptElement = document.querySelector(`script[src="${url}"]`);
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    });
  };
};