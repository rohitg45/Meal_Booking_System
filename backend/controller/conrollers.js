import { Department } from "../models/department.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getNextSequenceValue } from "../utils/functions.js";

const addDepartment = async (req, res) => {

    const { departmentName } = req.body

    if(!departmentName){
        return res.status(400).json(
            new ApiResponse(400, {}, "All fields are required")
        )
    }

    const DID= await getNextSequenceValue("deptId");
    const department = new Department({
        deptId: DID,
        deptName:departmentName
    })

    let deptAdded = await department.save();

    if (!deptAdded) {
        return res.status(500).json(
            new ApiResponse(500, {}, "Error! while adding department.")
        )
    }

    return res.status(201).json(
        new ApiResponse(201, deptAdded, "Department added Successfully")
    )

}

const getDepartments = async (req, res) => {
    try {
      const departments = await Department.find();
      return res.status(201).json(
        new ApiResponse(201, departments, "Department fetched Successfully")
      )
    } catch (err) {
        return res.status(500).json(
            new ApiResponse(500, {}, "Error! while fetching department.")
        )
    }
  };

export {addDepartment,getDepartments};