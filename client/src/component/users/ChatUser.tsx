import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ChatResponse } from "../../constants/chat";

interface ChatUserProps{
  chatResponse?:ChatResponse
}
export const ChatUser = ({chatResponse}:ChatUserProps) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={chatResponse?.profilePictureUrl}
        alt="Caffe Latte"
      />
      <Stack className="flex-1">
        <CardBody className="flex flex-col gap-2">
          <Heading size="md">{chatResponse?.nickname}</Heading>
          <Button colorScheme={"red"} size={"sm"}>
          {chatResponse?.followInfo?.followStatus===0?"Don't follow host":1?"Follower":"Friends"}
          </Button>
          <div className="follow-details flex gap-3">
            <div className="followers flex">
              <span className="font-medium">Followers:</span>
              <span className="count font-bold">{chatResponse?.followInfo?.followerCount}</span>
            </div>
            <div className="following flex">
              <span className="font-medium">Following:</span>
              <span className="count font-bold">{chatResponse?.followInfo?.followingCount}</span>
            </div>
          </div>
        </CardBody>
        <CardFooter className="font-primary italic text-lg font-medium">
          {chatResponse?.comment}
        </CardFooter>
      </Stack>
    </Card>
  );
};
