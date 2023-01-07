import { CommonLayout } from "../layouts/CommonLayout";
import { Form, Formik } from "formik";
import { tikokLiveSchema } from "../schema/tiktokSchema";
import { Button } from "@chakra-ui/react";
import { InputGroup } from "../component/common/InputGroup";
import { CheckBoxGroup } from "../component/common/CheckBoxGroup";
import { CiStreamOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { useSocketStore } from "../store/store";
import { useEffect } from "react";
export const TiktokLiveChat = () => {
  const { socket } = useSocketStore((state) => state);
  useEffect(() => {
    socket?.on("tiktokDisconnected",(msg)=>{
      toast.error(msg)
    })
    socket?.on("tiktokConnected", (msg) => {
      toast.success(msg)

    });
  }, [socket])
  
  return (
    <CommonLayout pageName="tiktokLive">
      <div className="container py-3">
        <Formik
          initialValues={{
            tiktokUsername: "",
            options: ["like", "comment", "share", "live", "gift"],
          }}
          validationSchema={tikokLiveSchema}
          onSubmit={(values) => {
            // handle form submission
            //console.log(values);
            //toast.success("Successfully connected to server")
            socket?.emit("setUniqueId", values.tiktokUsername);
         
  
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
                className="mt-3 flex items-center"
              >
                Start Live
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </CommonLayout>
  );
};
