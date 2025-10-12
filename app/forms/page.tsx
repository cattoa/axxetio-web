import { getDeviceType } from "@/lib/device-detection";
import { redirect } from "next/navigation";

export default async function FormsRedirectPage() {
    const deviceType = await getDeviceType();
    redirect(`/forms/${deviceType}`);
}
