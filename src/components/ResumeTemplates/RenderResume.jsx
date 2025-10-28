import React from "react";

function RenderResume({ templateId, resumeData, colorPalette }) {
    switch (templateId) {
        case "templateA":
            return (
                <div>
                    <h2>{resumeData.title}</h2>
                    <div>{resumeData.profileInfo.fullName}</div>
                    <div>{resumeData.profileInfo.designation}</div>
                    <div>{resumeData.profileInfo.summary}</div>
                </div>
            );
        case "templateB":
            return (
                <div>
                    <h2>{resumeData.title}</h2>
                    <div>{resumeData.profileInfo.fullName}</div>
                    <div>{resumeData.profileInfo.designation}</div>
                    <div>{resumeData.profileInfo.summary}</div>
                </div>
            );
        default:
            return (
                <div>
                    <h2>{resumeData.title}</h2>
                    <div>{resumeData.profileInfo.fullName}</div>
                    <div>{resumeData.profileInfo.designation}</div>
                    <div>{resumeData.profileInfo.summary}</div>
                </div>
            );
    }
}

export default RenderResume;