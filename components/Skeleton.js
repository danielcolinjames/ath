import classNames from "classnames";

const Skeleton = ({
  className,
  defaultSize = true,
  defaultBackground = true,
}) => {
  return (
    <div
      className={classNames(className, "animate-pulse rounded", {
        "h-4 w-20": defaultSize,
        "bg-gray-500": defaultBackground,
      })}
    ></div>
  );
};

export default Skeleton;
