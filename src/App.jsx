import { useState } from "react";
import Swal from "sweetalert2";
import firebaseConfigApp from "./lib/firebase-config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfigApp);

const App = () => {
  const employeeModel = {
    employeeName: "",
    salary: "",
    joiningDate: "",
  };
  const [employees, setEmployees] = useState(employeeModel);

  const handleChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setEmployees({ ...employees, [name]: value });
  };

  const createEmployee = async (e) => {
    try {
      e.preventDefault();

      //addDoc takes two parameters, first collection function and another the data that we want to store in db
      //collection also takes two parameters, first db ad then collection name
      //and since this is server task so it will take time hence we will make async function and await it
      await addDoc(collection(db, "employeesData"), employees);

      new Swal({
        icon: "success",
        title: "Employee created !!",
      });
    } catch (err) {
      new Swal({
        icon: "error",
        title: "Failed",
        text: err.message,
      });
    } finally {
      //clear fields after employee creation
      setEmployees(employeeModel);
    }
  };

  return (
    <div className="flex flex-col items-center gap-16">
      <h1 className="text-5xl font-bold">
        Firebase <span className="text-indigo-600">CRUD</span>
      </h1>
      <div className="grid grid-cols-2 w-8/12 gap-16">
        <div>
          <form className="space-y-6" onSubmit={createEmployee}>
            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2">
                Employee Name
              </label>
              <input
                onChange={handleChange}
                value={employees.employeeName}
                type="text"
                required
                name="employeeName"
                className="p-3 rounded border border-gray-300"
                placeholder="Employee Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2">Salary</label>
              <input
                onChange={handleChange}
                value={employees.salary}
                type="number"
                required
                name="salary"
                className="p-3 rounded border border-gray-300"
                placeholder="Salary"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2">Joining Date</label>
              <input
                onChange={handleChange}
                value={employees.joiningDate}
                type="date"
                required
                name="joiningDate"
                className="p-3 rounded border border-gray-300"
              />
            </div>

            <button className="bg-green-500 px-6 py-3 rounded font-semibold text-white">
              CREATE
            </button>
          </form>
        </div>
        <div>
          <h1>testing</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
