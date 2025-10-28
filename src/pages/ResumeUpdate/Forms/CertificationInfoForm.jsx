import React from "react";

const CertificationInfoForm = ({ certifications, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div>
      {certifications.map((cert, index) => (
        <div key={index} className="flex flex-col gap-3 py-2 px-2 rounded bg-purple-100 my-2">
          <label className="font-semibold flex items-center gap-2">
            Certificate Title
            <input
              type="text"
              className="input input-sm rounded-lg"
              value={cert.title || ""}
              onChange={(e) => updateArrayItem({ index, key: "title", value: e.target.value })}
              placeholder="Certificate Title"
            />
          </label>
          <label className="font-semibold flex items-center gap-2">
            Issuer
            <input
              type="text"
              className="input input-sm rounded-lg"
              value={cert.issuer || ""}
              onChange={(e) => updateArrayItem({ index, key: "issuer", value: e.target.value })}
              placeholder="Issuer"
            />
          </label>
          <label className="font-semibold flex items-center gap-2">
            Year
            <input
              type="text"
              className="input input-sm rounded-lg"
              value={cert.year || ""}
              onChange={(e) => updateArrayItem({ index, key: "year", value: e.target.value })}
              placeholder="Year"
            />
          </label>
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
          addArrayItem({ title: "", issuer: "", year: "" })
        }
      >
        + Add Certification
      </button>
    </div>
  );
};

export default CertificationInfoForm;