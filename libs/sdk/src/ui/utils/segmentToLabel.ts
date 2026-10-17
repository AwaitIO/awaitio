export type SegmentToLabelArgs = {
  segment: string;
};

// A folder slug as people read it: send_reminder → Send reminder.
export const segmentToLabel = ({ segment }: SegmentToLabelArgs) => {
  const words = segment.replace(/[_-]+/g, ' ').trim();

  return `${words.charAt(0).toUpperCase()}${words.slice(1)}`;
};
