import { CommonLayout } from "../layouts/CommonLayout";
import { Form, Formik } from "formik";
import { tikokLiveSchema } from "../schema/tiktokSchema";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import { InputGroup } from "../component/common/InputGroup";
import { CheckBoxGroup } from "../component/common/CheckBoxGroup";
import { CiStreamOn } from "react-icons/ci";
import { useSocketStore } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { ChatResponse } from "../constants/chat";
import { ChatUser } from "../component/users/ChatUser";
export const TiktokLiveChat = () => {
  const { socket } = useSocketStore((state) => state);
  const messageEl = useRef<any>(null);
  const [waitMsg, setWaitMsg] = useState("");
  const [chatUser,setChatUser] = useState<ChatResponse[]>([])
  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.addEventListener('DOMNodeInserted', (event:any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])
  useEffect(() => {
    socket?.on("tiktokDisconnected", (msg) => {
      setWaitMsg(msg)
      //toast.error(msg);
    });
    //socket?.on("tiktokConnected", (msg) => {
    //  toast.success(msg);
    //});
    socket?.on("chat", (chatResponse:ChatResponse) => {
      setWaitMsg("");
      const generateDummyMessage = () => {
        setInterval(() => {
          setChatUser((prevMessages) => [...prevMessages, chatResponse]);
        }, 2000);
      }
      generateDummyMessage();
    });
    socket?.on("socketInfo", (msg) => {
      setWaitMsg(msg);
    });
  }, [socket]);

  return (
    <CommonLayout pageName="tiktokLive">
      {waitMsg && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
           {waitMsg}
          </AlertDescription>
        </Alert>
      )}
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
      <div className="chat-user w-full h-[40rem] overflow-y-scroll overflow-x-hidden flex" ref={messageEl}>
        <div className="chats flex-1">
        {chatUser.map((res,index)=>{
          return(<ChatUser key={index} chatResponse={res}/>)
        })}
        </div>
        <div className="gifters flex-1">
    
        </div>
      </div>
    </CommonLayout>
  );
};
