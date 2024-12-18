import { Rocket } from "@/types/Rocket";

export class RocketService {
  static async getRocketById(id: Rocket["id"]): Promise<Rocket | null> {
    const rockets: Rocket[] = [
      {
        id: 464,
        name: "Starship",
        description:
          "Fully reusable two-stage super heavy-lift launch vehicle.",
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/starship_liftof_image_20240314160301.jpg",
        agency: {
          id: 121,
          name: "SpaceX",
          image_url:
            "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
        },
        dimensions: {
          diameter: 9,
          length: 120,
          stages: 2,
          mass: 5000,
          thrust: 72000,
        },
        capacity: {
          leo_capacity: 100000,
          gto_capacity: 21000,
          geo_capacity: null,
          sso_capacity: null,
        },
        launches: {
          cost: null,
          launches_count: 6,
          successful_launches: 4,
          failed_launches: 2,
          pending_launches: 2,
        },
        landings: {
          attempted_landings: 5,
          successful_landings: 2,
          failed_landings: 3,
        },
      },
      {
        id: 164,
        name: "Falcon 9",
        description:
          "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit. The Block 5 variant is the fifth major interval aimed at improving upon the ability for rapid reusability.",
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/falcon_9_image_20230807133459.jpeg",
        agency: {
          id: 5,
          name: "SpaceX",
          image_url:
            "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
        },
        dimensions: {
          diameter: 3.65,
          length: 70.0,
          stages: 2,
          mass: 549.0,
          thrust: 5000,
        },
        capacity: {
          leo_capacity: 22800.0,
          gto_capacity: 8300.0,
          geo_capacity: null,
          sso_capacity: null,
        },
        launches: {
          cost: 52000000,
          launches_count: 352,
          successful_launches: 351,
          failed_launches: 1,
          pending_launches: 0,
        },
        landings: {
          attempted_landings: 345,
          successful_landings: 340,
          failed_landings: 5,
        },
      },
      {
        id: 7955,
        name: "Electron",
        description:
          "Electron is a two-stage orbital expendable launch vehicle (with an optional third stage)...",
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/electron_image_20190705175640.jpeg",
        agency: {
          id: 147,
          name: "Rocket Lab",
          image_url:
            "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/rocket2520lab2520ltd_logo_20220218075411.png",
        },
        dimensions: {
          diameter: 1.2,
          length: 18.0,
          stages: 3,
          mass: 13.0,
          thrust: 162.0,
        },
        capacity: {
          leo_capacity: 300.0,
          gto_capacity: null,
          geo_capacity: null,
          sso_capacity: 225.0,
        },
        launches: {
          cost: 6000000,
          launches_count: 57,
          successful_launches: 53,
          failed_launches: 4,
          pending_launches: 28,
        },
        landings: {
          attempted_landings: 9,
          successful_landings: 7,
          failed_landings: 2,
        },
      },
      {
        id: 8445,
        name: "Ceres-1S",
        description:
          "Ceres-1S is the sea launched version of Ceres-1 from Galactic Energy.",
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/ceres-1s_image_20230905114324.jpeg",
        agency: {
          id: 1021,
          name: "Galactic Energy",
          image_url:
            "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/galactic2520energy_logo_20201106095229.png",
        },
        dimensions: {
          diameter: null,
          length: null,
          stages: 4,
          mass: null,
          thrust: 598.0,
        },
        capacity: {
          leo_capacity: 350.0,
          gto_capacity: null,
          geo_capacity: null,
          sso_capacity: 230.0,
        },
        launches: {
          cost: null,
          launches_count: 3,
          successful_launches: 3,
          failed_launches: 0,
          pending_launches: 1,
        },
        landings: {
          attempted_landings: 0,
          successful_landings: 0,
          failed_landings: 0,
        },
      },
    ];

    return await new Promise((res) => {
      setTimeout(() => {
        res(rockets.find((rocket) => rocket.id === id) || null);
      }, 1000);
    });
  }
}
