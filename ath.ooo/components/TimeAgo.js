import { formatDistanceToNowStrict } from "date-fns";

const TimeAgo = ({ date, addSuffix = true }) =>
  formatDistanceToNowStrict(date, { addSuffix });

export default TimeAgo;
