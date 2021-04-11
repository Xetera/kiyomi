import cls from "classnames";

export default function Hr(props: React.HTMLProps<HTMLHRElement>) {
  const { className, ...rest } = props;
  const c = cls("border-theme-subtle", "border-dashed", className);
  return <hr className={c} {...rest} />;
}
