import { Link, LinkProps } from "expo-router";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends LinkProps {
  children: string;
}
const ThemedLink = ({ style, ...rest }: Props) => {
  const primary = useThemeColor({}, "primary");
  return <Link {...rest} style={[{ color: primary }, style]} />;
};

export default ThemedLink;
