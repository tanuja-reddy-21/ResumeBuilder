import React from "react";

const SkillsInfoForm = ({ skillsInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div>
      {skillsInfo.map((skill, index) => (
        <div key={index} className="flex items-center gap-2 py-2 px-2 rounded bg-purple-100">
          <input
            type="text"
            className="input input-sm rounded-lg"
            value={skill.name}
            onChange={(e) => updateArrayItem({ index, key: "name", value: e.target.value })}
            placeholder="Skill name"
          />
          <input
            type="number"
            className="input input-sm rounded-lg"
            value={skill.progress}
            onChange={(e) => updateArrayItem({ index, key: "progress", value: e.target.value })}
            placeholder="Skill progress"
          />
          <button
            type="button"
            className="btn btn-sm btn-error text-white font-semibold rounded focus:outline-none hover:scale-105 cursor-pointer"
            onClick={() => removeArrayItem(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="btn flex items-center gap-2 px-4 py-2 rounded bg-purple-200 text-purple-900 font-medium text-sm"
        onClick={() =>
          addArrayItem({ name: "", progress: 0 })
        }
      >
        + Add Skill
      </button>
    </div>
  );
};

export default SkillsInfoForm;