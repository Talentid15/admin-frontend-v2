import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

function Verification() {
  const checks = [
    {
      id: "ID",
      vehicle: "RC Book",
      BankAccount: "Bank Account",
      CourtRecord: "CCR",
      LocalAddress: "Local Add",
      Address: "Local Add PV",
      PermanentAddress: "Permanent Add PV",
      EducationRecord: "Ed Record",
      EmploymentRecord: "Employment Record",
      EmploymentHistory: "Employment History",
      Compensation: "COMPV",
      eLockr: "EREF",
      AddressVideo: "LADV/PADV",
      CriminalRecord: "CVLF",
      PoliceLaw: "Police Verification LF",
      PoliceState: "Police Verification SD",
      GlobalDatabase: "Global Database",
      NationalOffender: "NSOC",
      ForeignControl: "OFSCAC",
      InspectorGeneral: "OIGES",
      AwardManagement: "SAMC",
      SocialMedia: "Social Media",
      CVV: "CVV",
      CreditHistory: "Credit History",
      DrugTest: "Drug Test",
    },
  ];

  const colorMapping = {
    id: { bg: "bg-[#FEF0D6]", text: "text-[#F1A92B]" },
    vehicle: { bg: "bg-[#C5EBD4]", text: "text-[#4E7D61]" },
    BankAccount: { bg: "bg-[#FED3DA]", text: "text-[#854953]" },
    CourtRecord: { bg: "bg-[#D1CCEC]", text: "text-[#534F6A]" },
    LocalAddress: { bg: "bg-[#CEF4F7]", text: "text-[#4E777A]" },
    PermanentAddress: { bg: "bg-[#FEF0D6]", text: "text-[#855807]" },
    Address: { bg: "bg-[#EBC9ED]", text: "text-[#891390]" },
    EducationRecord: { bg: "bg-[#C5EBD4]", text: "text-[#4E777A]" },
    EmploymentRecord: { bg: "bg-[#EBC9ED]", text: "text-[#891390]" },
    EmploymentHistory: { bg: "bg-[#D1CCEC]", text: "text-[#534F6A]" },
    Compensation: { bg: "bg-[#652D96]", text: "text-[#FFFFFF]" },
    eLockr: { bg: "bg-[#C5EBD4]", text: "text-[#4E777A]" },
    AddressVideo: { bg: "bg-[#FEF0D6]", text: "text-[#855807]" },
    CriminalRecord: { bg: "bg-[#EBC9ED]", text: "text-[#891390]" },
    PoliceLaw: { bg: "bg-[#C5EBD4]", text: "text-[#4E777A]" },
    PoliceState: { bg: "bg-emerald-100", text: "text-emerald-800" },
    GlobalDatabase: { bg: "bg-[#D1CCEC]", text: "text-[#534F6A]" },
    NationalOffender: { bg: "bg-[#FEF0D6]", text: "text-[#855807]" },
    ForeignControl: { bg: "bg-[#FEF0D6]", text: "text-[#855807]" },
    InspectorGeneral: { bg: "bg-[#D1CCEC]", text: "text-[#534F6A]" },
    AwardManagement: { bg: "bg-[#C5EBD4]", text: "text-[#4E777A]" },
    SocialMedia: { bg: "bg-[#652D96]", text: "text-[#FFFFFF]" },
    CVV: { bg: "bg-[#D1CCEC]", text: "text-[#534F6A]" },
    CreditHistory: { bg: "bg-[#EBC9ED]", text: "text-[#891390]" },
    DrugTest: { bg: "bg-[#FEF0D6]", text: "text-[#855807]" },
  };

  const [showMore, setShowMore] = useState(false);

  const entries = Object.entries(checks[0]);
  const firstFive = entries.slice(0, 5);
  const remaining = entries.slice(5);

  return (
    <div className="p-6 rounded-xl max-w-xl mx-auto relative font-medium">
      {/* First five items layout */}
      <div className="flex flex-col items-start gap-1">
        {/* First row: Two items */}
        <div className="flex gap-1">
          {firstFive.slice(0, 2).map(([key, value]) => {
            const { bg, text } = colorMapping[key] || {
              bg: "bg-gray-100",
              text: "text-gray-800",
            };
            return (
              <div
                key={key}
                className={`flex items-center p-1 border border-gray-300 rounded-full shadow-sm ${bg} ${text}`}
                style={{ width: "fit-content" }}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-1 ${text}`}
                  style={{ backgroundColor: "currentColor" }}
                ></div>
                <span className="text-sm">{value}</span>
              </div>
            );
          })}
        </div>

        {/* Second row: Single centered item */}
        <div className="flex justify-center w-full">
          {firstFive.slice(2, 3).map(([key, value]) => {
            const { bg, text } = colorMapping[key] || {
              bg: "bg-gray-100",
              text: "text-gray-800",
            };
            return (
              <div
                key={key}
                className={`flex items-center p-1 border border-gray-300 rounded-full shadow-sm ${bg} ${text}`}
                style={{ width: "fit-content" }}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-1 ${text}`}
                  style={{ backgroundColor: "currentColor" }}
                ></div>
                <span className="text-sm">{value}</span>
              </div>
            );
          })}
        </div>

        {/* Third row: Two items */}
        {/* Third row: Two items with View More Button */}
        <div className="flex justify-between items-center gap-1">
          <div className="flex gap-1">
            {firstFive.slice(3, 5).map(([key, value]) => {
              const { bg, text } = colorMapping[key] || {
                bg: "bg-gray-100",
                text: "text-gray-800",
              };
              return (
                <div
                  key={key}
                  className={`flex items-center p-1 border border-gray-300 rounded-full shadow-sm ${bg} ${text}`}
                  style={{ width: "fit-content" }}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-1 ${text}`}
                    style={{ backgroundColor: "currentColor" }}
                  ></div>
                  <span className="text-sm">{value}</span>
                </div>
              );
            })}
          </div>

          {/* View More Button */}
          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="flex items-center gap-1 text-blue-500"
            >
              <MdArrowDropDown className="h-[20px] w-[20px] text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Remaining Items Popup */}
      {/* Remaining Items Popup */}
      {showMore && (
        <div className="absolute top-0 left-1/2 mt-20 ml-0 w-[370px] p-4 border rounded-xl bg-white shadow-lg z-10">
          <div className="p-1">
            {/* Popup Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="text-lg font-bold">More Verifications</div>
              <button
                onClick={() => setShowMore(false)}
                className="text-red-500 underline text-sm"
              >
                Close
              </button>
            </div>

            {/* Grid Layout for Checks */}
            <div
              className="flex flex-wrap gap-1"
              style={{
                maxHeight: "400px", // Set desired height of the box
              }}
            >
              {remaining.map(([key, value]) => {
                const { bg, text } = colorMapping[key] || {
                  bg: "bg-gray-100",
                  text: "text-gray-800",
                };
                return (
                  <div
                    key={key}
                    className={`flex items-center p-1 border border-gray-300 rounded-full shadow-sm ${bg} ${text}`}
                    style={{ width: "fit-content" }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-1`}
                      style={{ backgroundColor: "currentColor" }}
                    ></div>
                    <span className="text-sm">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Verification;
