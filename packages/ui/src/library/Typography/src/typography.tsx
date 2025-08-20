import { useTypography, TypographyProps } from "./use-typography";

const Typography: React.FC<TypographyProps> = (props) => {
  const { Component, children, getTypographyProps } = useTypography(props);

  return <Component {...getTypographyProps()}>{children}</Component>;
};

export { Typography };
