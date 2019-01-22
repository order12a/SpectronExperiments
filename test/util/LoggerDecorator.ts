const winston = require('winston');

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  )
});

export default function log(target, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = (async function(...args: any[]) {
    const result = await originalMethod.apply(this, args);
    await console.log(`${propertyKey}(${args.map((a) => JSON.stringify(a)).join()}) => ${JSON.stringify(Promise.resolve(result))}`);
    return await result;
  });

  return descriptor;
}
