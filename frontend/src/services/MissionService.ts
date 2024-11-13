import { Mission } from "../types/Mission";

export class MissionService {
  static async getUpcomingMissions(): Promise<Mission[]> {
    const missions: Mission[] = [
      {
        id: "83ba001e-9bca-48ac-84cb-ccea96bfe9c1",
        name: "Starship | Integrated Flight Test 5",
        net: new Date("2024-11-14T12:25:00Z"),
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
          id: 3,
          name: "Launch Successful",
          description:
            "The launch vehicle successfully inserted its payload(s) into the target orbit(s).",
        },
        links: {
          live: "https://www.youtube.com/watch?v=qfuxxqc5yaI",
        },
        agency: {
          id: 121,
          name: "SpaceX",
        },
        site: {
          id: 188,
          name: "Orbital Launch Mount A",
          country: "United States of America",
          latitude: 25.997116,
          longitude: -97.1550309985665,
        },
      },
    ];

    return await new Promise((res) => {
      setTimeout(() => {
        return res(missions);
      }, 1000);
    });
  }
}
