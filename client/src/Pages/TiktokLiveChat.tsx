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
import { GiftResponse } from "../constants/gift";
import { GiftUser } from "../component/users/Gifter";
export const TiktokLiveChat = () => {
  const { socket } = useSocketStore((state) => state);
  const chatAnimationRef = useRef<any>(null);
  const giftAnimationRef = useRef<any>(null);

  const [waitMsg, setWaitMsg] = useState("");
  const [chatUser,setChatUser] = useState<ChatResponse[]>([])
  const [gifter,setGifterUser] = useState<GiftResponse[]>([])

  const scrollDelay=(ms:number)=>{
    return new Promise(res => setTimeout(res, ms));
}

  useEffect(() => {
    if (chatAnimationRef.current) {
      chatAnimationRef.current.addEventListener('DOMNodeInserted', async (event:any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth'});
      });
    }
    if (giftAnimationRef.current) {
      giftAnimationRef.current.addEventListener('DOMNodeInserted', async (event:any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth'});
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
          
          setChatUser((prevMessages) => [...prevMessages, chatResponse]);
      }
      generateDummyMessage();
    });
    socket?.on("gift", (giftResponse:GiftResponse) => {
      setWaitMsg("");
      const generateGifter = () => {
          setGifterUser((prevMessages) => [...prevMessages, giftResponse]);
      }
      generateGifter();
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
      <div className="chat-user w-full h-[40rem] flex" >
        <div className="chats flex-1  overflow-y-scroll overflow-x-hidden" ref={chatAnimationRef}>
        {chatUser.map((res,index)=>{
          return(<ChatUser key={index} chatResponse={res}/>)
        })}
        </div>
        <div className="gifters flex-1  overflow-y-scroll overflow-x-hidden" ref={giftAnimationRef}>
        {gifter.map((res,index)=>{
          return(<GiftUser key={index} giftRespose={res}/>)
        })}
        </div>
      </div>
    </CommonLayout>
  );
};
