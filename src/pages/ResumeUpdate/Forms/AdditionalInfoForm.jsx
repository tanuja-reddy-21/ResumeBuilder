import React from "react";

const AdditionalInfoForm = ({
  languages, 
  interests, 
  updateField, 
  removeFromArray, 
  addToArray
}) => (
  <div>
    <h2 className="font-semibold text-xl mb-2 block">Additional Info</h2>
    
    {/* Languages */}
    <div className="mb-6">
      <h4 className="text-gray-600 font-semibold mb-4">Languages</h4>
      {languages.map((lang, index) => (
        <div key={index} className="flex items-center gap-4 mb-3">
          <input
            type="text"
            placeholder="e.g. English"
            value={lang.name}
            onChange={e => updateField("languages", index, "name", e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <div>
            <label>Proficiency</label>
            <select
              value={lang.proficiency}
              onChange={e => updateField("languages", index, "proficiency", e.target.value)}
              className="ml-2"
            >
              <option value={1}>★☆☆☆☆</option>
              <option value={2}>★★☆☆☆</option>
              <option value={3}>★★★☆☆</option>
              <option value={4}>★★★★☆</option>
              <option value={5}>★★★★★</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => removeFromArray("languages", index)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addToArray("languages")}
        className="mt-2 px-3 py-1 rounded bg-purple-100 text-purple-600 font-semibold"
      >
        + Add Language
      </button>
    </div>
    
    {/* Interests */}
    <div className="mb-6">
      <h4 className="text-gray-600 font-semibold mb-4">Interests</h4>
      {interests.map((interest, index) => (
        <div key={index} className="flex items-center gap-4 mb-3">
          <input
            type="text"
            placeholder="e.g. Reading"
            value={interest.name}
            onChange={e => updateField("interests", index, "name", e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            type="button"
            onClick={() => removeFromArray("interests", index)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addToArray("interests")}
        className="mt-2 px-3 py-1 rounded bg-purple-100 text-purple-600 font-semibold"
      >
        + Add Interest
      </button>
    </div>
    
    {/* Save/Next Controls */}
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-gray-200 rounded">Back</button>
      <button className="px-4 py-2 bg-purple-500 text-white rounded">Save &amp; Exit</button>
    </div>
  </div>
);

export default AdditionalInfoForm;