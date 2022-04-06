import path from "path";
import { fileURLToPath } from "url";
import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import { employees } from "./employees.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.join(__dirname, "employee.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

main();
function main() {
  let server = new grpc.Server();
  // @ts-ignore
  server.addService(employee_proto.Employee.service, { getDetails: getDetails });
  server.bind("0.0.0.0:4500", grpc.ServerCredentials.createInsecure());
  server.start();
}

function getDetails(call, callback) {
  console.log("getDetails start");
  callback(null, {
    message: employees.find((e) => e.id === call.request.id),
  });
  console.log("getDetails end");
}
