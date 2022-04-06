import path from "path";
import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.join(__dirname, "employee.proto");

let packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

main();
function main() {
  // @ts-ignore
  let client = new employee_proto.Employee("localhost:4500", grpc.credentials.createInsecure());
  let employeeId;
  if (process.argv.length >= 3) {
    employeeId = process.argv[2];
  } else {
    employeeId = 1;
  }
  client.getDetails({ id: employeeId }, function (err, response) {
    console.log("Employee Details for Employee Id:", employeeId, "\n", response.message);
  });
}
