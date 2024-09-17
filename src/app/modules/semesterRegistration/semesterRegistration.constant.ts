export const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];

export const RegistrationStatus = {
  UPCOMING: "UPCOMING",
  Ongoing: "ONGOING",
  ENDED: "ENDED",
} as const;

// now we can not do any write operations into this object
