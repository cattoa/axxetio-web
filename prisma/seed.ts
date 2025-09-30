import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data to keep the seed idempotent during development
  await prisma.asset_action.deleteMany();
  await prisma.asset_action_type.deleteMany();
  await prisma.asset_photos.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.asset_model.deleteMany();
  await prisma.asset_make.deleteMany();
  await prisma.asset_type.deleteMany();
  await prisma.device.deleteMany();
  await prisma.outlet.deleteMany();
  await prisma.marketchannel.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.institute.deleteMany();
  await prisma.city.deleteMany();
  await prisma.country.deleteMany();

  const southAfrica = await prisma.country.create({
    data: {
      name: "South Africa",
      active: 1,
      time_zone: "Africa/Johannesburg",
      outlet: {
        create: [],
      },
    },
  });

  const capeTown = await prisma.city.create({
    data: {
      name: "Cape Town",
      active: 1,
    },
  });

  const institute = await prisma.institute.create({
    data: {
      name: "Axxetio Institute",
      contactemail: "ops@axxetio.local",
      active: 1,
    },
  });

  const [kegType, fridgeType] = await Promise.all([
    prisma.asset_type.create({
      data: {
        name: "Keg Cooler",
        description: "Refrigerated beverage asset",
        institute: { connect: { id: institute.id } },
      },
    }),
    prisma.asset_type.create({
      data: {
        name: "Retail Fridge",
        description: "Front-of-house fridge",
        institute: { connect: { id: institute.id } },
      },
    }),
  ]);

  const [coolBrewMake, fridgifyMake] = await Promise.all([
    prisma.asset_make.create({
      data: {
        name: "CoolBrew",
        description: "CoolBrew equipment",
        fktypeid: kegType.id,
        institute: { connect: { id: institute.id } },
      },
    }),
    prisma.asset_make.create({
      data: {
        name: "Fridgify",
        description: "Fridgify appliances",
        fktypeid: fridgeType.id,
        institute: { connect: { id: institute.id } },
      },
    }),
  ]);

  const channel = await prisma.marketchannel.create({
    data: {
      name: "On-premise hospitality",
      description: "Premium hospitality venues",
      active: 1,
      institute: { connect: { id: institute.id } },
    },
  });

  const assetModels = await Promise.all(
    [
      {
        name: "CoolBrew Pro 60L",
        description: "60 litre keg system",
        fkmakeid: coolBrewMake.id,
        fkinstituteid: institute.id,
      },
      {
        name: "CoolBrew Compact",
        description: "Compact keg cooler",
        fkmakeid: coolBrewMake.id,
        fkinstituteid: institute.id,
      },
      {
        name: "Fridgify Display 400",
        description: "Glass door fridge",
        fkmakeid: fridgifyMake.id,
        fkinstituteid: institute.id,
      },
    ].map((model) =>
      prisma.asset_model.create({
        data: model,
      })
    )
  );

  const customer = await prisma.customer.create({
    data: {
      name: "Sunset Hospitality",
      active: 1,
      contact_name: "Thandi Jacobs",
      contact_email: "thandi.jacobs@example.com",
      contact_phone: "+27 82 555 0101",
      institute: { connect: { id: institute.id } },
    },
  });

  const outlet = await prisma.outlet.create({
    data: {
      name: "Sunset Rooftop Bar",
      outlet_company_name: "Sunset Hospitality Group",
      outletidentifier: "SUN-ROOF-001",
      contactname: "Sipho Nkosi",
      contactemail: "sipho.nkosi@example.com",
      contactmob: "+27 82 555 0199",
      timezone: "+02:00",
      address: "12 Bree Street, Cape Town",
      latitude: new Prisma.Decimal("-33.918861"),
      longitude: new Prisma.Decimal("18.423300"),
      customer: { connect: { id: customer.id } },
      country: { connect: { id: southAfrica.id } },
      city: { connect: { id: capeTown.id } },
      marketchannel: { connect: { id: channel.id } },
    },
  });

  const asset1 = await prisma.asset.create({
    data: {
      name: "Main bar keg system",
      description: "Primary keg cooler",
      assetnumber: "AS-0001",
      qrcode: "QR-0001",
      serialnumber: "SN-COOL-0001",
      active: 1,
      ownership: "lease",
      installdate: new Date("2024-10-01"),
      nolines: 3,
      institute: { connect: { id: institute.id } },
      outlet: { connect: { id: outlet.id } },
      asset_type: { connect: { id: kegType.id } },
      asset_make: { connect: { id: coolBrewMake.id } },
      asset_model: { connect: { id: assetModels[0].id } },
    },
  });

  const asset2 = await prisma.asset.create({
    data: {
      name: "Outdoor beverage fridge",
      description: "Glass display fridge",
      assetnumber: "AS-0002",
      qrcode: "QR-0002",
      serialnumber: "SN-FRIDGE-0002",
      ownership: "institute",
      installdate: new Date("2025-01-12"),
      institute: { connect: { id: institute.id } },
      outlet: { connect: { id: outlet.id } },
      asset_type: { connect: { id: fridgeType.id } },
      asset_make: { connect: { id: fridgifyMake.id } },
      asset_model: { connect: { id: assetModels[2].id } },
    },
  });

  const [installationType, maintenanceType, relocationType] = await Promise.all(
    [
      prisma.asset_action_type.create({
        data: { name: "Installation", fkinstituteid: institute.id },
      }),
      prisma.asset_action_type.create({
        data: { name: "Maintenance", fkinstituteid: institute.id },
      }),
      prisma.asset_action_type.create({
        data: { name: "Relocation", fkinstituteid: institute.id },
      }),
    ]
  );

  const actionPayload: Prisma.asset_actionCreateManyInput[] = [
    {
      fkassetid: asset1.id,
      fkoutletid: outlet.id,
      fkasset_action_typeid: installationType.id,
      actiondate: new Date("2024-10-02T10:00:00Z"),
      latitude: new Prisma.Decimal("-33.918861"),
      longitude: new Prisma.Decimal("18.423300"),
    },
    {
      fkassetid: asset2.id,
      fkoutletid: outlet.id,
      fkasset_action_typeid: installationType.id,
      actiondate: new Date("2025-01-13T14:30:00Z"),
      latitude: new Prisma.Decimal("-33.918700"),
      longitude: new Prisma.Decimal("18.423100"),
    },
    {
      fkassetid: asset1.id,
      fkoutletid: outlet.id,
      fkasset_action_typeid: maintenanceType.id,
      actiondate: new Date("2024-12-05T08:15:00Z"),
      latitude: new Prisma.Decimal("-33.918900"),
      longitude: new Prisma.Decimal("18.423250"),
    },
    {
      fkassetid: asset2.id,
      fkoutletid: outlet.id,
      fkasset_action_typeid: maintenanceType.id,
      actiondate: new Date("2025-02-18T16:45:00Z"),
    },
    {
      fkassetid: asset1.id,
      fkoutletid: outlet.id,
      fkasset_action_typeid: relocationType.id,
      actiondate: new Date("2025-03-22T11:00:00Z"),
      latitude: new Prisma.Decimal("-33.919200"),
      longitude: new Prisma.Decimal("18.422950"),
    },
  ];

  await prisma.asset_action.createMany({
    data: actionPayload,
  });

  await prisma.device.create({
    data: {
      name: "CoolBrew Sensor",
      uid: "DEVICE-0001",
      fkoutletid: outlet.id,
      fkpostypeid: null,
      sim: "8901120200000000000",
      timezone: 2,
      latlng: "-33.918861, 18.423300",
      latitude: new Prisma.Decimal("-33.918861"),
      longitude: new Prisma.Decimal("18.423300"),
      signalstrength: "-68 dBm",
    },
  });

  console.log("✅ Seed data inserted successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
