import { getDeviceType } from "@/lib/device-detection";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const deviceType = await getDeviceType();
  redirect(`/${deviceType}`);
}