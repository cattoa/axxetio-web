import prisma from "@/lib/prisma";

export interface InstitutesData {
  connected: boolean;
  institutes: Array<{
    id: number;
    name: string;
    assetCount: number;
    outletCount: number;
    active: boolean;
  }>;
}

const fallbackInstitutes: InstitutesData = {
  connected: false,
  institutes: [],
};

export async function loadInstitutes(): Promise<InstitutesData> {
  if (!process.env.DATABASE_URL) {
    return fallbackInstitutes;
  }

  try {
    const baseInstitutes = await prisma.institute.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        active: true,
      },
    });

    const institutesWithCounts = await Promise.all(
      baseInstitutes.map(async (institute) => {
        const [assetCount, outletCount] = await Promise.all([
          prisma.asset.count({ where: { fkinstituteid: institute.id } }),
          prisma.outlet.count({
            where: { customer: { fkinstituteid: institute.id } },
          }),
        ]);

        return {
          id: institute.id,
          name: institute.name ?? "Unnamed institute",
          active: institute.active !== 0,
          assetCount,
          outletCount,
        };
      })
    );

    return {
      connected: true,
      institutes: institutesWithCounts,
    };
  } catch (error) {
    console.error("Failed to load institutes", error);
    return fallbackInstitutes;
  }
}
