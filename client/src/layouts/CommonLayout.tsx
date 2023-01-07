import { ReactNode } from "react";
import classNames from "classnames";
import { Box } from "@chakra-ui/react";
interface CommonLayoutProps {
  children: ReactNode;
  pageName: string;
}

export const CommonLayout = ({ children, pageName }: CommonLayoutProps) => {
  return (
    <div className={classNames("page w-full min-h-[90vh]", pageName)}>
      <Box className="px-[54px]">
      {children}
      </Box>
    </div>
  );
};
