import React, { useEffect, useState } from "react";

// If you're using Chakra UI components, import them. Otherwise, replace Box/Container accordingly.
import { Container, Box } from "@chakra-ui/react";

// Replace with your actual icon component import
import UserIcon from "./UserIcon";

// Helper function getImageSize must be defined or imported for image size detection
// import getImageSize from '...'   // Add if required

function ResumeBuilder({ resumeData, themeColor }) {
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (!size) {
      const fetchSize = async () => {
        const imgSize = await getImageSize({
          url: resumeData.profileUrl,
        });
        setSize(imgSize);
      };
      fetchSize();
    }
  }, [size, resumeData.profileUrl]);

  return (
    <Container minH="8.5in" px={8} py={6}>
      <Box>
        {/* Resume Title */}
        <div className="text-xl font-bold px-4 py-2">
          {resumeData.title}
        </div>

        {/* Profile Image/Card */}
        <Box className="flex flex-col items-center">
          <Box
            className="rounded-full bg-cyan-100"
            maxW={size ? size.width : 120}
            maxH={size ? size.height : 120}
            w="32" h="32" // Ensures the circle is consistent with fallback divs
          >
            {resumeData.profileUrl ? (
              <img
                src={resumeData.profileUrl}
                alt=""
                className="rounded-full w-full h-full"
                style={{ color: themeColor }}
              />
            ) : (
              <UserIcon className="w-16 h-16" />
            )}
          </Box>
        </Box>

        {/* Contact Section */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="text-base">{resumeData.contactInfo?.email}</div>
          <div className="text-base">{resumeData.contactInfo?.location}</div>
        </div>

        {/* Designation */}
        <div className="text-base font-semibold mt-8">
          {resumeData.particulars?.designation}
        </div>

        {/* Fallback or Loader */}
        <div className="flex items-center justify-center min-h-[120px]">
          <span>*</span>
        </div>
      </Box>
    </Container>
  );
}

export default ResumeBuilder;