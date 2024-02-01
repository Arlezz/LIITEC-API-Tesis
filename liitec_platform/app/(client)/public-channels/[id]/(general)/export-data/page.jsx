import ExportChannelDataButton from "@/components/ExportChannelDataButton";

export default function ChannelExportPage({ params }) {
  const channelId = params.id;

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div className="px-4 mb-10 sm:px-0">
            <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
              Export Channel Data
            </h2>
            <p className="mt-1 max-w-2xl leading-6 text-gray-500">
              In this section you can export the historical channel data for
              each existing sensor in{" "}
              <span className="font-bold">&quot;CSV format&quot;</span>.
            </p>
          </div>
          <ExportChannelDataButton channelId={channelId} />
        </div>
      </section>
    </>
  );
}
