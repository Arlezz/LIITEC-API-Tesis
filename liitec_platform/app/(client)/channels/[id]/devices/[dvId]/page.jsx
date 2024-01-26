import { getDevice } from "@/lib/general.actions";


export default async function DevicePage({ params }) {
    console.log("params", params);

    const device = await getDevice(params.id, params.dvId);

    console.log("device", device);
    
    return (
        <h1>Device Page</h1>
    );
}