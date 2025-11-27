import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import firebaseConfigApp from "./lib/firebase-config";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import "remixicon/fonts/remixicon.css";

const db = getFirestore(firebaseConfigApp);

const App = () => {
  const employeeModel = {
    employeeName: "",
    salary: "",
    joiningDate: "",
  };
  const [employees, setEmployees] = useState(employeeModel);
  const [isEmpty, setIsEmpty] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const req = async () => {
      const allEmployeesData = await getDocs(collection(db, "employeesData"));
      setIsEmpty(allEmployeesData.empty);

      //read data that we received from db
      let tmp = [];
      allEmployeesData.forEach((doc) => {
        const document = doc.data();
        tmp.push(document);
      });
      setEmployeeData(tmp);
    };

    req();
  }, []);

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
      setIsEmpty(false);
      // setEmployeeData(...employeeData, employees);

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
      <div className="flex w-10/12 gap-16">
        <div className="w-[400px]">
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
        <div className=" flex-1">
          {isEmpty && (
            <div className="flex flex-col items-center">
              <i className="ri-u-disk-line text-3xl text-gray-600"></i>
              <h1 className="text-3xl text-gray-600 ">Empty</h1>
            </div>
          )}

          <h1 className="text-2xl font-semibold">Employees</h1>
          <table className="w-full mt-8">
            <thead>
              <tr className="bg-rose-600 text-white text-left">
                <th className="py-2 pl-2">S/No</th>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="pl-2 py-2">{index + 1}</td>
                  <td>{item.employeeName}</td>
                  <td>{item.salary}</td>
                  <td>{item.joiningDate}</td>
                  <td>
                    <div className="space-x-2">
                      <button className="w-8 h-8 bg-indigo-600 text-white rounded-full">
                        <i className="ri-file-edit-line"></i>
                      </button>

                      <button className="w-8 h-8 bg-pink-600 text-white rounded-full">
                        <i className="ri-delete-bin-6-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
