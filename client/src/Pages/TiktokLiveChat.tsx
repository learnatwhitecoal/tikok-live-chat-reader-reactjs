import { CommonLayout } from "../layouts/CommonLayout";
import { Form, Formik } from "formik";
import { tikokLiveSchema } from "../schema/tiktokSchema";
import { Button } from "@chakra-ui/react";
import { InputGroup } from "../component/common/InputGroup";
import { CheckBoxGroup } from "../component/common/CheckBoxGroup";
import { CiStreamOn } from "react-icons/ci";
export const TiktokLiveChat = () => {
  return (
    <CommonLayout pageName="tiktokLive">
      <Formik
        initialValues={{
          tiktokUsername: "",
          options: ["like", "comment", "share", "live", "gift"],
        }}
        validationSchema={tikokLiveSchema}
        onSubmit={(values) => {
          // handle form submission
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="app-form">
            <InputGroup label="Enter Tiktok Usename" name="tiktokUsername" />
            <CheckBoxGroup
              options={["like", "comment", "share", "live", "gift"]}
              label="Options"
              name="options"
            />
            <Button
              rightIcon={<CiStreamOn size={25} />}
              colorScheme={"red"}
              type="submit"
              className="mt-2 flex items-center"
            >
              Start Live
            </Button>
          </Form>
        )}
      </Formik>
    </CommonLayout>
  );
};
