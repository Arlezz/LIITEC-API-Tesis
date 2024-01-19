import GeneralService from "@/services/general.services";
import UserService from "@/services/user.services";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AuthService from "@/services/auth.service";
import ChannelTable from "@/components/ChannelTable";
import Link from "next/link";

import { Pagination, Button, ButtonGroup } from "@nextui-org/react";
import TablePagination from "@/components/TablePagination";

export default async function ChannelPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  const page = Number(searchParams.page) || 1;

  const channels = await GeneralService.getUserChannels(session.user._id, page);

  const pages = channels.totalPages || 1;


  return (
    <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
      <div className="w-full">
        <section className="flex flex-col pb-8">
          <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
            My Channels
          </h1>
        </section>
        <ChannelTable channels={channels.results} />
        <div className="py-8 px-2 flex justify-center items-center">
          <TablePagination
            page={page}
            totalPages={pages}
            hasNextPage={page < pages}
          />
        </div>
      </div>
    </div>
  );
}
