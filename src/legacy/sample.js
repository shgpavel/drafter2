app.get('/plot-splines', (req, res) => {
  const calculatorScript =
      functionsList
          .map(latex => {
            const formattedLatex = `\\left\\{${latex}\\right\\}`;
            const escapedLatex = formattedLatex.replace(/\\/g, '\\\\')
                                     .replace(/"/g, '\\"')
                                     .replace(/'/g, '\\\'');
            const result =
                `calculator.setExpression({latex: "${escapedLatex}"});`;
            return result;
          })
          .join('\n');

  const responseHtml = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
</head>
<body>
  <div id="calculator" style="width: 100vw; height: 100vh;"></div>
  <script>
    var elt = document.getElementById('calculator');
    var calculator = Desmos.GraphingCalculator(elt);
    ${calculatorScript}
  </script>
</body>
</html>
`;
  res.send(responseHtml);
});

app.get('/plot', (req, res) => {
  const calculatorScript =
      functionsList
          .map(
              latex => `calculator.setExpression({latex: '${
                  latex.replace(/'/g, '\\\'')}'});`)
          .join('\n');

  const responseHtml = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
</head>
<body>
  <div id="calculator" style="width: 100vw; height: 100vh;"></div>
  <script>
    var elt = document.getElementById('calculator');
    var calculator = Desmos.GraphingCalculator(elt);
    ${calculatorScript}
  </script>
</body>
</html>
    `;
  res.send(responseHtml);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
