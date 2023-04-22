process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection/Catch');
    console.log(reason, p);
    fs.writeFileSync(path.join(__dirname, "/errors/" + random(8) + ".txt"), "Error: Unhandled Rejection/Catch \n\n" + reason + " \n\n" + p);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('Uncaught Exception/Catch');
    console.log(err, origin);
    fs.writeFileSync(path.join(__dirname, "/errors/" + random(8) + ".txt"), "Error: Uncaught Exception/Catch \n\n" + err + " \n\n" + origin);
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('Uncaught Exception/Catch ');
    console.log(err, origin);
    fs.writeFileSync(path.join(__dirname, "/errors/" + random(8) + ".txt"), "Error: Uncaught Exception/Catch \n\n" + err + " \n\n" + origin);

  });
  process.on('multipleResolves', (type, promise, reason) => {
    fs.writeFileSync(path.join(__dirname, "/errors/" + random(8) + ".txt"), "Error: Uncaught Exception/Catch \n\n" + reason + " \n\n" + promise);
  });
