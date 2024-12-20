import { Launch } from "@/types/Launch";

const launches: Launch[] = [
  {
    id: "83ba001e-9bca-48ac-84cb-ccea96bfe9c1",
    name: "Starship | Integrated Flight Test 7",
    description: "Fifth test flight of the two-stage Starship launch vehicle.",
    net: new Date("2025-01-11T12:25:00Z"),
    image:
      "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/superheavy_appr_image_20241013171532.jpeg",
    window: {
      start: new Date("2024-10-13T12:00:00Z"),
      end: new Date("2024-10-13T12:30:00Z"),
    },
    rocket: {
      id: 464,
      name: "Starship",
      image:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/starship_liftof_image_20240314160301.jpg",
    },
    status: {
      id: 10,
      name: "Launch Upcoming",
      description:
        "The launch vehicle successfully inserted its payload(s) into the target orbit(s).",
    },
    links: {
      live: "https://www.youtube.com/watch?v=qfuxxqc5yaI",
    },
    agency: {
      id: 121,
      name: "SpaceX",
      image_url:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
      country: "United States of America",
      website: "http://www.spacex.com/",
      description:
        "Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.",
    },
    site: {
      id: 188,
      name: "Orbital Launch Mount A",
      country: "United States of America",
      latitude: 25.997116,
      longitude: -97.1550309985665,
      image_map:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/map_images/pad_orbital_launch_mount_a_20210514061342.jpg",
    },
  },
  {
    id: "c0da2601-59db-4529-bb05-b3908e964890",
    name: "Starlink Group 11-2",
    description:
      "A batch of satellites for the Starlink mega-constellation - SpaceX's project for space-based Internet communication system.",
    net: new Date("2025-12-12T19:33:00Z"),
    image:
      "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/falcon2520925_image_20221009234147.png",
    window: {
      start: new Date("2024-10-13T12:00:00Z"),
      end: new Date("2024-10-13T12:30:00Z"),
    },
    rocket: {
      id: 164,
      name: "Falcon 9",
      image:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/falcon_9_image_20230807133459.jpeg",
    },
    status: {
      id: 10,
      name: "To Be Confirmed",
      description:
        "Awaiting official confirmation - current date is known with some certainty.",
    },
    links: {
      live: "https://www.youtube.com/watch?v=qfuxxqc5yaI",
    },
    agency: {
      id: 121,
      name: "SpaceX",
      image_url:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
      country: "United States of America",
      website: "http://www.spacex.com/",
      description:
        "Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.",
    },
    site: {
      id: 188,
      name: "Space Launch Complex 4E",
      country: "United States of America",
      latitude: 34.632,
      longitude: -120.611,
      image_map:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/map_images/pad_16_20200803143532.jpg",
    },
  },
  {
    id: "af1466bb-289b-40b3-b83c-102b3a7af047",
    name: "StriX Launch 6",
    description:
      "Synthetic aperture radar satellites for Japanese Earth imaging company Synspective.",
    net: new Date("2024-12-29T14:00:00Z"),
    image:
      "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/electron_image_20190705175640.jpeg",
    window: {
      start: new Date("2024-12-19T14:00:00Z"),
      end: new Date("2024-12-19T14:00:00Z"),
    },
    rocket: {
      id: 7955,
      name: "Electron",
      image:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/electron_image_20190705175640.jpeg",
    },
    status: {
      id: 10,
      name: "Go for Launch",
      description: "Current T-0 confirmed by official or reliable sources.",
    },
    links: {
      live: "https://www.rocketlabusa.com/assets/Uploads/Owl-The-Way-Up-Press-Kit.pdf",
    },
    agency: {
      id: 147,
      name: "Rocket Lab",
      image_url:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/rocket2520lab2520ltd_logo_20220218075411.png",
      country: "United States of America",
      website: "http://www.rocketlabusa.com/",
      description:
        "Rocket Lab is an American aerospace manufacturer with a wholly owned New Zealand subsidiary...",
    },
    site: {
      id: 185,
      name: "Rocket Lab Launch Complex 1B",
      country: "New Zealand",
      latitude: -39.262833,
      longitude: 177.864469,
      image_map:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/map_images/pad_185_20200803143540.jpg",
    },
  },
  {
    id: "b4777dca-7194-4f97-a6c2-addbb7bb4381",
    name: "Unknown Payload",
    description: "Probable Ceres-1S launch with Tianqi 33-36; Details TBD.",
    net: new Date("2024-12-25T10:20:00Z"),
    image:
      "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/ceres-1s_image_20230905114324.jpeg",
    window: {
      start: new Date("2024-12-19T10:20:00Z"),
      end: new Date("2024-12-19T10:20:00Z"),
    },
    rocket: {
      id: 8445,
      name: "Ceres-1S",
      image:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/ceres-1s_image_20230905114324.jpeg",
    },
    status: {
      id: 10,
      name: "Go for Launch",
      description: "Current T-0 confirmed by official or reliable sources.",
    },
    links: {
      live: null,
    },
    agency: {
      id: 1021,
      name: "Galactic Energy",
      image_url:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/galactic2520energy_logo_20201106095229.png",
      country: "China",
      website: "http://www.galactic-energy.cn/index.php/En",
      description:
        "Galactic Energy is a private aerospace company headquartered in Beijing, China. Established by senior engineers in 2018, Galactic Energy engages in low-cost commercial space launch business.",
    },
    site: {
      id: 221,
      name: "Oriental Spaceport mobile launch ship",
      country: "China",
      latitude: 35.391667,
      longitude: 119.598667,
      image_map:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/map_images/pad_oriental_spaceport_mobile_launch_ship_20240529085416.jpg",
    },
  },
];

export class LaunchService {
  static async getUpcomingLaunches(): Promise<Launch[]> {
    return await new Promise((res) => {
      setTimeout(() => {
        return res(launches.sort((a, b) => a.net.getTime() - b.net.getTime()));
      }, 1000);
    });
  }

  static async getLaunchById(id: Launch["id"]): Promise<Launch | null> {
    return await new Promise((res) => {
      setTimeout(() => {
        return res(launches.find((launch) => launch.id === id) || null);
      }, 1000);
    });
  }
}
