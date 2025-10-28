import React from "react";

const ProjectsDetailForm = ({ projectInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div>
      {projectInfo.map((project, index) => (
        <div key={index} className="flex flex-col gap-3 py-2 px-2 rounded bg-purple-100 my-2">
          <label className="font-semibold flex items-center gap-2">
            Project Title
            <input
              type="text"
              className="input input-sm rounded-lg"
              value={project.title || ""}
              onChange={(e) => updateArrayItem({ index, key: "title", value: e.target.value })}
              placeholder="Project Title"
            />
          </label>
          <label className="font-semibold flex flex-col gap-2">
            Description
            <input
              type="text"
              className="input input-sm rounded-lg"
              value={project.description || ""}
              onChange={(e) => updateArrayItem({ index, key: "description", value: e.target.value })}
              placeholder="Short description about the project"
            />
          </label>
          <div className="flex gap-2">
            <label className="font-semibold flex-1">
              GitHub Link
              <input
                type="text"
                className="input input-sm rounded-lg"
                value={project.github || ""}
                onChange={(e) => updateArrayItem({ index, key: "github", value: e.target.value })}
                placeholder="https://github.com/yourrepo"
              />
            </label>
            <label className="font-semibold flex-1">
              Live Demo Link
              <input
                type="text"
                className="input input-sm rounded-lg"
                value={project.livedemo || ""}
                onChange={(e) => updateArrayItem({ index, key: "livedemo", value: e.target.value })}
                placeholder="https://yourproject.live"
              />
            </label>
          </div>
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
        className="btn flex items-center gap-2 px-4 py-2 rounded bg-purple-200 text-purple-900 font-medium text-sm mt-2"
        onClick={() =>
          addArrayItem({ title: "", description: "", github: "", livedemo: "" })
        }
      >
        + Add Project
      </button>
    </div>
  );
};

export default ProjectsDetailForm;