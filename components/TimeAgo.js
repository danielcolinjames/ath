import { formatDistanceToNowStrict } from "date-fns";
import { memo } from "react";

const TimeAgo = ({ date, addSuffix = true }) =>
  formatDistanceToNowStrict(date, { addSuffix });

export default memo(TimeAgo);
