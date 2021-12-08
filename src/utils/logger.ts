import winston, { format } from "winston";

const { combine, printf } = format;

const formatOptions = {
  format: combine(
    process.env.NODE_ENV !== "production" ? format.simple() : format.json(),

    printf((info) => {
      const today = new Date();
      const timestamp = `${
        today.toISOString().split("T")[0]
      } ${today.toLocaleTimeString()}`;
      return `${timestamp} ${info.level}: ${info.message}`;
    })
  ),
};

const options = {
  error: {
    level: "error",
    filename: `${process.cwd()}/logs/error.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  combined: {
    level: "info",
    filename: `${process.cwd()}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const winstonLogger = winston.createLogger({
  ...formatOptions,
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.File(options.combined),
    new winston.transports.Console(options.console),
  ],
});

process.env.NODE_ENV !== "production" &&
  winstonLogger.add(
    new winston.transports.Console({
      ...formatOptions,
      level: "error",
    })
  );

export const logger = winstonLogger;
