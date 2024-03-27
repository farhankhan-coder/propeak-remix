// // import fs from 'fs';
// import path from 'path';

// // Define log directory path
// const logDir = path.resolve(process.cwd(), "logs");

// // Create logs directory if it doesn't exist
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

// // Log info function
// const logInfo = (msg, moduleName) => {
//   try {
//     const logMessage = moduleName ? `[${moduleName}] ${msg}` : msg;
//     console.log(logMessage); // Log to console
//     fs.appendFileSync(path.resolve(logDir, "info.log"), `${logMessage}\n`); // Log to file
//   } catch (e) {
//     // Handle error
//     console.error("Error logging info:", e);
//   }
// };

// // Log error function
// const logError = (msg, moduleName) => {
//   try {
//     const logMessage = moduleName ? `[${moduleName}] ${msg}` : msg;
//     console.error(logMessage); // Log to console
//     fs.appendFileSync(path.resolve(logDir, "error.log"), `${logMessage}\n`); // Log to file
//   } catch (e) {
//     // Handle error
//     console.error("Error logging error:", e);
//   }
// };

// export { logInfo, logError };






// // // import winston from 'winston';
// // // import path from 'path';

// // // const LogLevel = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 };

// // // const currentPath = path.resolve(process.cwd(), "logs");

// // // const logger = winston.createLogger({
// // //   transports: [
// // //     new winston.transports.File({
// // //       name: 'info-file',
// // //       filename: path.resolve(currentPath, "info.log"),
// // //       level: 'info',
// // //       json: true,
// // //       maxsize: 5242880 //5MB
// // //     }),
// // //     new winston.transports.File({
// // //       name: 'error-file',
// // //       filename: path.resolve(currentPath, "error.log"),
// // //       level: 'error',
// // //       json: true,
// // //       maxsize: 5242880 //5MB
// // //     })
// // //   ],
// // //   exceptionHandlers: [
// // //     new winston.transports.File({
// // //       filename: path.resolve(currentPath, "exceptions.log"),
// // //       json: true,
// // //       maxsize: 5242880
// // //     })
// // //   ],
// // //   exitOnError: false
// // // });

// // // const logInfo = (msg, moduleName) => {
// // //   try {
// // //     if (moduleName) {
// // //       logger.info({ moduleName: moduleName, msg: msg });
// // //     } else {
// // //       logger.info(msg);
// // //     }
// // //   } catch (e) {
// // //   }
// // // };

// // // const logError = (msg, moduleName) => {
// // //   try {
// // //     if (moduleName) {
// // //       logger.error({ moduleName: moduleName, msg: msg });
// // //     } else {
// // //       logger.error(msg);
// // //     }
// // //   } catch (e) {
// // //     // console.log("LogError=",e);
// // //   }
// // // };

// // // export { logInfo, logError };




// // // import fs from 'fs';
// // // import path from 'path';

// // // // Define log directory path
// // // const logDir = path.resolve(process.cwd(), "logs");

// // // // Create logs directory if it doesn't exist
// // // if (!fs.existsSync(logDir)) {
// // //   fs.mkdirSync(logDir);
// // // }

// // // // Log info function
// // // const logInfo = (msg, moduleName) => {
// // //   try {
// // //     const logMessage = moduleName ? `[${moduleName}] ${msg}` : msg;
// // //     console.log(logMessage); // Log to console
// // //     fs.appendFileSync(path.resolve(logDir, "info.log"), `${logMessage}\n`); // Log to file
// // //   } catch (e) {
// // //     // Handle error
// // //     console.error("Error logging info:", e);
// // //   }
// // // };

// // // // Log error function
// // // const logError = (msg, moduleName) => {
// // //   try {
// // //     const logMessage = moduleName ? `[${moduleName}] ${msg}` : msg;
// // //     console.error(logMessage); // Log to console
// // //     fs.appendFileSync(path.resolve(logDir, "error.log"), `${logMessage}\n`); // Log to file
// // //   } catch (e) {
// // //     // Handle error
// // //     console.error("Error logging error:", e);
// // //   }
// // // };

// // // export { logInfo, logError };






// // // // import winston from 'winston';
// // // // import path from 'path';

// // // // const LogLevel = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 };

// // // // const currentPath = path.resolve(process.cwd(), "logs");

// // // // const logger = winston.createLogger({
// // // //   transports: [
// // // //     new winston.transports.File({
// // // //       name: 'info-file',
// // // //       filename: path.resolve(currentPath, "info.log"),
// // // //       level: 'info',
// // // //       json: true,
// // // //       maxsize: 5242880 //5MB
// // // //     }),
// // // //     new winston.transports.File({
// // // //       name: 'error-file',
// // // //       filename: path.resolve(currentPath, "error.log"),
// // // //       level: 'error',
// // // //       json: true,
// // // //       maxsize: 5242880 //5MB
// // // //     })
// // // //   ],
// // // //   exceptionHandlers: [
// // // //     new winston.transports.File({
// // // //       filename: path.resolve(currentPath, "exceptions.log"),
// // // //       json: true,
// // // //       maxsize: 5242880
// // // //     })
// // // //   ],
// // // //   exitOnError: false
// // // // });

// // // // const logInfo = (msg, moduleName) => {
// // // //   try {
// // // //     if (moduleName) {
// // // //       logger.info({ moduleName: moduleName, msg: msg });
// // // //     } else {
// // // //       logger.info(msg);
// // // //     }
// // // //   } catch (e) {
// // // //   }
// // // // };

// // // // const logError = (msg, moduleName) => {
// // // //   try {
// // // //     if (moduleName) {
// // // //       logger.error({ moduleName: moduleName, msg: msg });
// // // //     } else {
// // // //       logger.error(msg);
// // // //     }
// // // //   } catch (e) {
// // // //     // console.log("LogError=",e);
// // // //   }
// // // // };

// // // // export { logInfo, logError };
