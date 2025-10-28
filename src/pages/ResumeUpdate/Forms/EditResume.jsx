import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import TitleInput from "../../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import StepProgress from "../../../components/StepProgress";
import ProfileInfoForm from "./ProfileInfoForm";
import ContactInfoForm from "./ContactInfoForm";
import WorkExperienceForm from "./WorkExperienceForm";
import EducationDetailsForm from "./EducationDetailsForm";
import SkillsInfoForm from "./SkillsInfoForm";
import ProjectsDetailForm from "./ProjectsDetailForm";
import CertificationInfoForm from "./CertificationInfoForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import Modal from "../../../components/Modal";
import RenderResume from "../../../components/ResumeTemplates/RenderResume";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef(null);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [baseWidth, setBaseWidth] = useState(800);
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState("profile-info");

  const pages = [
    "profile-info",
    "contact-info",
    "work-experience",
    "education-info",
    "skills",
    "projects",
    "certifications",
    "additionalInfo",
  ];

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: { theme: "", colorPalette: "" },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      { company: "", role: "", startDate: "", endDate: "", description: "" },
    ],
    education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
    skills: [{ name: "", progress: 0 }],
    projects: [{ title: "", description: "", github: "", liveDemo: "" }],
    certifications: [{ title: "", issuer: "", year: "" }],
    languages: [{ name: "", proficiency: 0 }],
    interests: [{ name: "" }],
  });

  const reactToPrintFn = useReactToPrint({
    content: () => previewRef.current,
  });

  // Fetch resume details
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );
      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;
        setResumeData((prev) => ({
          ...prev,
          ...resumeInfo,
        }));
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Failed to load resume details.");
    }
  };

  const uploadResumeImages = async () => {};
  const updateResumeDetails = async () => {};
  const handleDeleteResume = async () => {};

  const validateAndNext = () => {
    const errors = [];
    const { profileInfo, contactInfo } = resumeData;

    if (currentPage === "profile-info") {
      if (!profileInfo.fullName.trim()) errors.push("Full Name is required");
      if (!profileInfo.designation.trim())
        errors.push("Designation is required");
      if (!profileInfo.summary.trim()) errors.push("Summary is required");
    }

    if (currentPage === "contact-info") {
      if (!contactInfo.email.trim() || !/^.+@.+\..+$/.test(contactInfo.email))
        errors.push("Valid email is required.");
      if (!contactInfo.phone.trim() || !/^\d{10}$/.test(contactInfo.phone))
        errors.push("Valid 10-digit phone number is required");
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    setErrorMsg("");
    goToNextStep();
  };

  const goToNextStep = () => {
    if (currentPage === "additionalInfo") {
      setOpenPreviewModal(true);
      return;
    }

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);
      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
    }
  };

  const goBack = () => {
    const currentIndex = pages.indexOf(currentPage);
    if (currentPage === "profile-info") return navigate("/dashboard");
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);
      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
    }
  };

  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    if (resumeId) fetchResumeDetailsById();
  }, [resumeId]);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        {/* ===== Top Bar ===== */}
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prev) => ({ ...prev, title: value }))
            }
          />
          <div className="flex items-center gap-4">
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-[16px]" />
              <span className="hidden md:block">Change Theme</span>
            </button>
            <button className="btn-small-light" onClick={handleDeleteResume}>
              <LuTrash2 className="text-[16px]" />
              <span className="hidden md:block">Delete</span>
            </button>
            <button
              className="btn-small"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">Preview & Download</span>
            </button>
          </div>
        </div>

        {/* ===== Form & Resume Area ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
            <StepProgress progress={progress} />

            {/* ===================== FORMS ===================== */}
            {currentPage === "profile-info" && (
              <ProfileInfoForm
                profileData={resumeData.profileInfo}
                updateSection={(key, value) =>
                  updateSection("profileInfo", key, value)
                }
                onNext={validateAndNext}
              />
            )}

            {currentPage === "contact-info" && (
              <ContactInfoForm
                contactInfo={resumeData.contactInfo}
                updateSection={(key, value) =>
                  updateSection("contactInfo", key, value)
                }
              />
            )}

            {currentPage === "work-experience" && (
              <WorkExperienceForm
                workExperience={resumeData.workExperience}
                updateArrayItem={({ index, key, value }) => {
                  const updated = [...resumeData.workExperience];
                  updated[index][key] = value;
                  setResumeData({ ...resumeData, workExperience: updated });
                }}
                addArrayItem={(item) =>
                  setResumeData({
                    ...resumeData,
                    workExperience: [
                      ...resumeData.workExperience,
                      item || {
                        company: "",
                        role: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      },
                    ],
                  })
                }
                removeArrayItem={(index) =>
                  setResumeData({
                    ...resumeData,
                    workExperience: resumeData.workExperience.filter(
                      (_, i) => i !== index
                    ),
                  })
                }
              />
            )}

            {currentPage === "education-info" && (
              <EducationDetailsForm
                educationInfo={resumeData.education}
                updateArrayItem={({ index, key, value }) => {
                  const updated = [...resumeData.education];
                  updated[index][key] = value;
                  setResumeData({ ...resumeData, education: updated });
                }}
                addArrayItem={(item) =>
                  setResumeData({
                    ...resumeData,
                    education: [
                      ...resumeData.education,
                      item || {
                        degree: "",
                        institution: "",
                        startDate: "",
                        endDate: "",
                      },
                    ],
                  })
                }
                removeArrayItem={(index) =>
                  setResumeData({
                    ...resumeData,
                    education: resumeData.education.filter(
                      (_, i) => i !== index
                    ),
                  })
                }
              />
            )}

            {currentPage === "skills" && (
              <SkillsInfoForm
                skillsInfo={resumeData.skills}
                updateArrayItem={({ index, key, value }) => {
                  const updated = [...resumeData.skills];
                  updated[index][key] = value;
                  setResumeData({ ...resumeData, skills: updated });
                }}
                addArrayItem={(item) =>
                  setResumeData({
                    ...resumeData,
                    skills: [
                      ...resumeData.skills,
                      item || { name: "", progress: 0 },
                    ],
                  })
                }
                removeArrayItem={(index) =>
                  setResumeData({
                    ...resumeData,
                    skills: resumeData.skills.filter((_, i) => i !== index),
                  })
                }
              />
            )}

            {currentPage === "projects" && (
              <ProjectsDetailForm
                projectInfo={resumeData.projects}
                updateArrayItem={({ index, key, value }) => {
                  const updated = [...resumeData.projects];
                  updated[index][key] = value;
                  setResumeData({ ...resumeData, projects: updated });
                }}
                addArrayItem={(item) =>
                  setResumeData({
                    ...resumeData,
                    projects: [
                      ...resumeData.projects,
                      item || {
                        title: "",
                        description: "",
                        github: "",
                        liveDemo: "",
                      },
                    ],
                  })
                }
                removeArrayItem={(index) =>
                  setResumeData({
                    ...resumeData,
                    projects: resumeData.projects.filter((_, i) => i !== index),
                  })
                }
              />
            )}

            {currentPage === "certifications" && (
              <CertificationInfoForm
                certifications={resumeData.certifications}
                updateArrayItem={({ index, key, value }) => {
                  const updated = [...resumeData.certifications];
                  updated[index][key] = value;
                  setResumeData({ ...resumeData, certifications: updated });
                }}
                addArrayItem={(item) =>
                  setResumeData({
                    ...resumeData,
                    certifications: [
                      ...resumeData.certifications,
                      item || { title: "", issuer: "", year: "" },
                    ],
                  })
                }
                removeArrayItem={(index) =>
                  setResumeData({
                    ...resumeData,
                    certifications: resumeData.certifications.filter(
                      (_, i) => i !== index
                    ),
                  })
                }
              />
            )}

            {currentPage === "additionalInfo" && (
              <AdditionalInfoForm
                languages={resumeData.languages}
                interests={resumeData.interests}
                updateField={(section, index, key, value) => {
                  const updated = [...resumeData[section]];
                  updated[index][key] = value;
                  setResumeData({ ...resumeData, [section]: updated });
                }}
                addToArray={(section) =>
                  setResumeData({
                    ...resumeData,
                    [section]: [
                      ...resumeData[section],
                      section === "languages"
                        ? { name: "", proficiency: 0 }
                        : { name: "" },
                    ],
                  })
                }
                removeFromArray={(section, index) =>
                  setResumeData({
                    ...resumeData,
                    [section]: resumeData[section].filter(
                      (_, i) => i !== index
                    ),
                  })
                }
              />
            )}

            {/* ============ Buttons ============ */}
            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}
              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button
                  className="btn-small-light"
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className="text-[16px]" />
                  Back
                </button>
                <button
                  className="btn-small-light"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className="text-[16px]" />
                  {isLoading ? "Updating..." : "Save & Exit"}
                </button>
                <button
                  className="btn-small"
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" ? (
                    <>
                      <LuDownload className="text-[16px]" /> Preview & Download
                    </>
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Preview Modal ===== */}
      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText="Download"
        actionBtnIcon={<LuDownload className="text-[16px]" />}
        onActionClick={reactToPrintFn}
      >
        <div
          ref={previewRef}
          className="w-[98vw] h-[90vh] overflow-auto bg-white"
        >
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
            containerWidth={baseWidth}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default EditResume;
