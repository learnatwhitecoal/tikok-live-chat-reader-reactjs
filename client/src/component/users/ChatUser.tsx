import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Image,
} from "@chakra-ui/react";
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
        objectFit="contain"
        maxW={{ base: "100%", sm: "200px" }}
        src={chatResponse?.profilePictureUrl}
        className="flex-1"
        alt="Caffe Latte"
      />

      <Stack className="flex-1">
        <CardBody className="flex flex-col gap-2">
          <Heading size="md">{chatResponse?.nickname}</Heading>
          <a className="bg-red-500 min-w-max text-white font-bold text-center p-2 rounded-md" href={`https://tiktok.com/@${chatResponse?.uniqueId}`}>
          {chatResponse?.followInfo?.followStatus===0?"Don't follow host":chatResponse?.followInfo?.followStatus===1?"Follower of the Host":"Friends of the host"}
          </a>
          <div className="follow-details flex gap-3">
            <div className="followers flex text-lg">
              <span className="font-medium">Followers:</span>
              <span className="count font-bold">{chatResponse?.followInfo?.followerCount}</span>
            </div>
            <div className="following flex">
              <span className="font-medium">Following:</span>
              <span className="count font-bold">{chatResponse?.followInfo?.followingCount}</span>
            </div>
          </div>
        </CardBody>
        <CardFooter className="font-primary italic font-medium text-xl">
          {chatResponse?.comment}
        </CardFooter>
      </Stack>
    </Card>
  );
};
