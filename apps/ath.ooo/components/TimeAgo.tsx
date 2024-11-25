import { formatDistanceToNow } from "date-fns";
import { memo } from "react";

// formatDistanceToNowStrict will show a specific number of seconds with no "almost" or "about"
// or "less than a minute ago", but when <30s it results in React hydration errors because the
// client says "13 seconds" but the server says "12 seconds" (e.g.) so we use formatDistanceToNow
interface TimeAgoProps {
  date: Date | string | number;
  addSuffix?: boolean;
}

const TimeAgo = ({ date, addSuffix = true }: TimeAgoProps): JSX.Element => (
  <span>{formatDistanceToNow(new Date(date), { addSuffix })}</span>
);

export default memo(TimeAgo);
