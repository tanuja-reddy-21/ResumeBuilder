import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const EducationDetailsForm = ({
  educationInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Education</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {educationInfo.map((education, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="">
              <Input
                label="Degree"
                placeholder="B.Tech in Computer Science"
                type="text"
                value={education.degree || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "degree", target.value)
                }
              />
              <Input
                label="Institution"
                placeholder="XYZ University"
                type="text"
                value={education.institution || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "institution", target.value)
                }
              />
              <Input
                label="Year"
                placeholder="2022"
                type="text"
                value={education.year || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "year", target.value)
                }
              />
            </div>
            {educationInfo.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-red-600 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addArrayItem}
        className="flex items-center gap-2 py-2 px-4 rounded bg-purple-500 text-white font-semibold"
      >
        <LuPlus />
        Add Education
      </button>
    </div>
  );
};

export default EducationDetailsForm;