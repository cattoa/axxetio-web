import { headers } from "next/headers";

export type DeviceType = "mobile" | "tablet" | "desktop";

const MOBILE_USER_AGENT_REGEX =
  /android|iphone|ipod|blackberry|bb10|mobile|windows phone/i;
const TABLET_USER_AGENT_REGEX = /ipad|tablet|kindle|silk|playbook/i;

/**
 * Server-side device detection using user agent
 */
export async function getDeviceType(): Promise<DeviceType> {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") ?? "";

    if (TABLET_USER_AGENT_REGEX.test(userAgent)) {
      return "tablet";
    }

    if (MOBILE_USER_AGENT_REGEX.test(userAgent)) {
      return "mobile";
    }

    return "desktop";
  } catch (error) {
    console.error("Failed to detect device type:", error);
    return "desktop"; // Default fallback
  }
}

/**
 * Client-side device detection using user agent and screen size
 */
export function getClientDeviceType(): DeviceType {
  if (typeof window === "undefined") {
    return "desktop";
  }

  const userAgent = navigator.userAgent || "";
  const isTouch = "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
  const screenWidth = window.innerWidth;

  // Check for tablet first (usually larger screens but with touch)
  if (
    TABLET_USER_AGENT_REGEX.test(userAgent) ||
    (isTouch && screenWidth >= 768 && screenWidth <= 1024)
  ) {
    return "tablet";
  }

  // Check for mobile
  if (
    MOBILE_USER_AGENT_REGEX.test(userAgent) ||
    (isTouch && screenWidth < 768)
  ) {
    return "mobile";
  }

  return "desktop";
}

/**
 * Get the appropriate redirect path for device type
 */
export function getDeviceSpecificPath(
  basePath: string,
  deviceType: DeviceType
): string {
  if (basePath === "/") {
    return `/${deviceType}`;
  }

  // Remove leading slash and add device prefix
  const cleanPath = basePath.startsWith("/") ? basePath.slice(1) : basePath;
  return `/${deviceType}/${cleanPath}`;
}

/**
 * Extract the base path from a device-specific path
 */
export function getBasePathFromDevicePath(devicePath: string): string {
  const parts = devicePath.split("/");
  if (parts.length <= 2) return "/";

  // Remove the device type part
  return "/" + parts.slice(2).join("/");
}
