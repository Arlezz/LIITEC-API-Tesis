import ChannelInviteForm from "@/components/Channels/ChannelInviteForm";

export default function CreateGuestPage({ searchParams, params }) {

    const channel = params.id;

  return (
    <>
      <section className="flex flex-col">
        <div className="pb-8">
          <h2 className="text-2xl pb-4 md:text-3xl text-gray-700 font-medium">
            Invite a Guest
          </h2>
          <span>Enter user id to invite to the channel</span>
        </div>
        <ChannelInviteForm channel={channel} />
      </section>
    </>
  );
}
