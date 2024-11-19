import { Rocket } from "../types/Rocket";

export class RocketService {
  static async getRocketById(id: Rocket["id"]): Promise<Rocket | null> {
    const rocket: Rocket = {
      id: 464,
      name: "Starship",
      description: "Fully reusable two-stage super heavy-lift launch vehicle.",
      imageURL:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/starship_liftof_image_20240314160301.jpg",
      agency: {
        id: 121,
        name: "SpaceX",
        imageURL:
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
        launches_count: 5,
        successful_launches: 3,
        failed_launches: 2,
        pending_launches: 3,
      },
      landings: {
        attempted_landings: 4,
        successful_landings: 2,
        failed_landings: 2,
      },
    };

    return await new Promise((res) => {
      setTimeout(() => {
        res(rocket);
      }, 1000);
    });
  }
}
