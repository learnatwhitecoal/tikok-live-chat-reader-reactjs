import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Image,
} from "@chakra-ui/react";
import { GiftResponse } from "../../constants/gift";

interface ChatUserProps {
  giftRespose?: GiftResponse;
}
export const GiftUser = ({ giftRespose }: ChatUserProps) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="contain"
        maxW={{ base: "100%", sm: "200px" }}
        src={giftRespose?.profilePictureUrl}
        className="flex-1"
        alt="Caffe Latte"
      />

      <Stack className="flex-1">
        <CardBody className="flex flex-col gap-2">
          <Heading size="md">{giftRespose?.nickname}</Heading>
          <a
            className="bg-red-500 min-w-max text-white font-bold text-center p-2 rounded-md"
            href={`https://tiktok.com/@${giftRespose?.uniqueId}`}
          >
            {giftRespose?.followInfo?.followStatus === 0
              ? "Don't follow host"
              : giftRespose?.followInfo?.followStatus === 1
              ? "Follower of the Host"
              : "Friends of the host"}
          </a>
          <div className="follow-details flex gap-3">
            <div className="followers flex text-lg">
              <span className="font-medium">Followers:</span>
              <span className="count font-bold">
                {giftRespose?.followInfo?.followerCount}
              </span>
            </div>
            <div className="following flex">
              <span className="font-medium">Following:</span>
              <span className="count font-bold">
                {giftRespose?.followInfo?.followingCount}
              </span>
            </div>
          </div>
        </CardBody>
        <CardFooter className="font-primary  font-medium text-xl">
         <div className="gift flex items-center">
         <Image
            objectFit="contain"
            src={giftRespose?.giftPictureUrl}
            className="flex-1 w-[50px] h-[50px]"
            alt="Caffe Latte"
          />
          <div className="right">
            *  {giftRespose?.diamondCount}
          </div>
         </div>
        </CardFooter>
      </Stack>
    </Card>
  );
};
