"use client";

import { deleteChannel } from "@/lib/general.actions";
import MyModal from "@/components/MyModal";
import { Button, useDisclosure } from "@nextui-org/react";


export default function ChannelDeleteSection({ channelId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
    <>
      <MyModal
        title={"Confirmation"}
        content={`Are you sure to delete the channel?`}
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={deleteChannel}
        item={channelId}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 pb-8">
        <div>
          <h3 className="text-xl pb-6 md:text-2xl text-gray-700 font-medium">
            Danger Zone
          </h3>
          <div className="">
            <p>
              You are in the channel deletion area. Note that actions performed
              here cannot be undone. Proceed with caution.
            </p>
          </div>
          <div className="mt-6">
            <Button type="submit" onClick={onOpen} color="danger">
              Delete Channel
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
